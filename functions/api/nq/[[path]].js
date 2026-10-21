// NumCS Quest accounts: username + password, progress stored in Cloudflare D1.
// Needs a D1 binding named NQ_DB on the Pages project. Without it every route answers 503
// and the game simply hides its login button.
//
// Routes (all JSON):
//   GET    /api/nq/health
//   POST   /api/nq/register   { name, pass }        -> { name, token }
//   POST   /api/nq/login      { name, pass }        -> { name, token }
//   POST   /api/nq/logout                            (Bearer token)
//   GET    /api/nq/state                             (Bearer token) -> { data, updated }
//   PUT    /api/nq/state      { data }               (Bearer token) -> { updated }
//   POST   /api/nq/delete     { pass }               (Bearer token) deletes the account and its data

const SESSION_DAYS = 180;
const MAX_STATE = 1_000_000;          // bytes of JSON per user
const PBKDF2_ITER = 100_000;          // Workers' upper limit for PBKDF2
const NAME_RE = /^[a-z0-9_.-]{3,24}$/;

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS nq_users (name TEXT PRIMARY KEY, salt TEXT NOT NULL, hash TEXT NOT NULL, created INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS nq_sessions (token TEXT PRIMARY KEY, name TEXT NOT NULL, expires INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS nq_states (name TEXT PRIMARY KEY, data TEXT NOT NULL, updated INTEGER NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS nq_limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, until INTEGER NOT NULL)`,
];
let schemaReady = false;

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
});
const fail = (status, error) => json({ error }, status);

const enc = new TextEncoder();
const b64u = buf => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const hex = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
const sha256 = async s => hex(await crypto.subtle.digest('SHA-256', enc.encode(s)));
const randomB64 = n => b64u(crypto.getRandomValues(new Uint8Array(n)));

async function pbkdf2(pass, salt) {
  const key = await crypto.subtle.importKey('raw', enc.encode(pass), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: enc.encode(salt), iterations: PBKDF2_ITER }, key, 256);
  return b64u(bits);
}
function sameString(a, b) {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

// fixed-window limiter stored in D1: at most `max` hits per `windowS` seconds for `key`
async function limited(db, key, max, windowS) {
  const now = Date.now();
  const row = await db.prepare('SELECT count, until FROM nq_limits WHERE key = ?').bind(key).first();
  if (!row || row.until < now) {
    await db.prepare('INSERT OR REPLACE INTO nq_limits (key, count, until) VALUES (?, 1, ?)').bind(key, now + windowS * 1000).run();
    return false;
  }
  if (row.count >= max) return true;
  await db.prepare('UPDATE nq_limits SET count = count + 1 WHERE key = ?').bind(key).run();
  return false;
}

async function body(request) {
  try { return await request.json(); } catch { return null; }
}

async function newSession(db, name) {
  const token = randomB64(32);
  await db.prepare('INSERT INTO nq_sessions (token, name, expires) VALUES (?, ?, ?)')
    .bind(await sha256(token), name, Date.now() + SESSION_DAYS * 864e5).run();
  return token;
}

async function auth(db, request) {
  const m = (request.headers.get('authorization') || '').match(/^Bearer ([A-Za-z0-9_-]{20,})$/);
  if (!m) return null;
  const row = await db.prepare('SELECT name, expires FROM nq_sessions WHERE token = ?').bind(await sha256(m[1])).first();
  if (!row || row.expires < Date.now()) return null;
  return { name: row.name, tokenHash: await sha256(m[1]) };
}

function credentials(b) {
  if (!b || typeof b.name !== 'string' || typeof b.pass !== 'string') return null;
  const name = b.name.trim().toLowerCase();
  if (!NAME_RE.test(name) || b.pass.length < 8 || b.pass.length > 200) return null;
  return { name, pass: b.pass };
}

export async function onRequest({ request, env, params }) {
  const db = env.NQ_DB;
  const path = (params.path || []).join('/');
  const method = request.method;
  if (!db) return fail(503, 'not_configured');

  // same-origin JSON API: reject cross-site writes
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return fail(403, 'origin');

  if (!schemaReady) { await db.batch(SCHEMA.map(s => db.prepare(s))); schemaReady = true; }
  const ip = request.headers.get('cf-connecting-ip') || 'local';

  try {
    if (path === 'health' && method === 'GET') return json({ ok: true });

    if (path === 'register' && method === 'POST') {
      const c = credentials(await body(request));
      if (!c) return fail(400, 'invalid');
      if (await limited(db, 'reg:' + ip, 10, 3600)) return fail(429, 'rate');
      if (await db.prepare('SELECT 1 FROM nq_users WHERE name = ?').bind(c.name).first()) return fail(409, 'taken');
      const salt = randomB64(16);
      await db.prepare('INSERT INTO nq_users (name, salt, hash, created) VALUES (?, ?, ?, ?)')
        .bind(c.name, salt, await pbkdf2(c.pass, salt), Date.now()).run();
      return json({ name: c.name, token: await newSession(db, c.name) });
    }

    if (path === 'login' && method === 'POST') {
      const c = credentials(await body(request));
      if (!c) return fail(401, 'wrong');
      if (await limited(db, 'login:' + c.name, 10, 900) || await limited(db, 'loginip:' + ip, 50, 900)) return fail(429, 'rate');
      const u = await db.prepare('SELECT salt, hash FROM nq_users WHERE name = ?').bind(c.name).first();
      const h = await pbkdf2(c.pass, u ? u.salt : 'no-such-user');
      if (!u || !sameString(h, u.hash)) return fail(401, 'wrong');
      await db.prepare('DELETE FROM nq_sessions WHERE expires < ?').bind(Date.now()).run();
      return json({ name: c.name, token: await newSession(db, c.name) });
    }

    const who = await auth(db, request);
    if (!who) return fail(401, 'auth');

    if (path === 'logout' && method === 'POST') {
      await db.prepare('DELETE FROM nq_sessions WHERE token = ?').bind(who.tokenHash).run();
      return json({ ok: true });
    }

    if (path === 'state' && method === 'GET') {
      const row = await db.prepare('SELECT data, updated FROM nq_states WHERE name = ?').bind(who.name).first();
      return json({ name: who.name, data: row ? JSON.parse(row.data) : null, updated: row ? row.updated : 0 });
    }

    if (path === 'state' && method === 'PUT') {
      const text = await request.text();
      if (text.length > MAX_STATE) return fail(413, 'too_large');
      let b; try { b = JSON.parse(text); } catch { return fail(400, 'invalid'); }
      if (!b || typeof b.data !== 'object' || b.data === null || Array.isArray(b.data)) return fail(400, 'invalid');
      if (await limited(db, 'put:' + who.name, 120, 3600)) return fail(429, 'rate');
      const updated = Date.now();
      await db.prepare('INSERT OR REPLACE INTO nq_states (name, data, updated) VALUES (?, ?, ?)')
        .bind(who.name, JSON.stringify(b.data), updated).run();
      return json({ updated });
    }

    if (path === 'delete' && method === 'POST') {
      const b = await body(request);
      const u = await db.prepare('SELECT salt, hash FROM nq_users WHERE name = ?').bind(who.name).first();
      if (!b || typeof b.pass !== 'string' || !u || !sameString(await pbkdf2(b.pass, u.salt), u.hash)) return fail(401, 'wrong');
      await db.batch([
        db.prepare('DELETE FROM nq_states WHERE name = ?').bind(who.name),
        db.prepare('DELETE FROM nq_sessions WHERE name = ?').bind(who.name),
        db.prepare('DELETE FROM nq_users WHERE name = ?').bind(who.name),
      ]);
      return json({ ok: true });
    }

    return fail(404, 'not_found');
  } catch (e) {
    return fail(500, 'server');
  }
}
