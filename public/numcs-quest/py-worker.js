// Python runtime for NumCS Quest: Pyodide + NumPy + matplotlib (+ SciPy, SymPy on demand) in a Web Worker.
// Artifacts only serve web file types, so archives are stored with an extra .wasm suffix.
const _fetch = self.fetch.bind(self);
self.fetch = (u, o) => {
  let s = typeof u === 'string' ? u : (u instanceof URL ? u.href : u.url);
  if (/\.(whl|zip)$/.test(s)) s += '.wasm';
  return _fetch(s, o);
};
importScripts('pyodide/pyodide.js');
const EN = new URL(self.location.href).searchParams.get('lang') === 'en';
const L = (de, en) => EN ? en : de;

let py = null;
const loaded = new Set();
const send = (type, data) => self.postMessage(Object.assign({ type }, data || {}));

const HARNESS_SRC = String.raw`
import sys, os, io, base64, traceback, tempfile, warnings
os.environ['MPLBACKEND'] = 'Agg'
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

_shown = []
def _fake_show(*a, **k):
    for num in plt.get_fignums():
        fig = plt.figure(num)
        buf = io.BytesIO()
        fig.savefig(buf, format='png', dpi=90, bbox_inches='tight')
        _shown.append(('plt.show()', base64.b64encode(buf.getvalue()).decode()))
    plt.close('all')
plt.show = _fake_show

def _fmt_exc(e, fname):
    tb = traceback.extract_tb(e.__traceback__)
    user = [f for f in tb if f.filename == fname]
    lines = []
    for f in user[-3:]:
        lines.append(f'  Zeile {f.lineno}: {f.line}')
    msg = f'{type(e).__name__}: {e}'
    if isinstance(e, SyntaxError):
        msg = f'SyntaxError in Zeile {e.lineno}: {e.msg}'
        if e.text: lines = ['  ' + e.text.rstrip()]
    return msg, '\n'.join(lines)

def _run(code, tests, pre):
    global _shown
    _shown = []
    plt.close('all')
    d = tempfile.mkdtemp()
    os.chdir(d)
    os.makedirs('cx_out', exist_ok=True)
    ns = {'__name__': '__main__'}
    res = {'ok': True, 'error': None, 'where': '', 'tests': [], 'images': []}
    try:
        if pre:
            exec(compile(pre, 'given.py', 'exec'), ns)
        with warnings.catch_warnings():
            warnings.simplefilter('default')
            exec(compile(code, 'main.py', 'exec'), ns)
    except BaseException as e:
        res['ok'] = False
        res['error'], res['where'] = _fmt_exc(e, 'main.py')
    sys.stdout.flush(); sys.stderr.flush()
    for name in sorted(os.listdir('cx_out')):
        p = os.path.join('cx_out', name)
        if name.lower().endswith('.png'):
            with open(p, 'rb') as fh:
                res['images'].append(('cx_out/' + name, base64.b64encode(fh.read()).decode()))
        else:
            res['images'].append(('cx_out/' + name, None))
    res['images'] += _shown
    if tests and res['ok']:
        for t in tests:
            ok, msg = True, ''
            try:
                exec(compile(t['code'], 'test.py', 'exec'), dict(ns, np=np, _SRC=code))
            except AssertionError as e:
                ok, msg = False, str(e) or 'Test fehlgeschlagen'
            except BaseException as e:
                ok, msg = False, f'{type(e).__name__}: {e}'
            res['tests'].append({'name': t['name'], 'ok': ok, 'msg': msg})
    plt.close('all')
    return res
`;
const HARNESS = EN ? HARNESS_SRC.replace(/Zeile/g, 'line').replace('Test fehlgeschlagen', 'Test failed') : HARNESS_SRC;

async function init() {
  const t0 = Date.now();
  send('status', { text: L('Python wird geladen …', 'Loading Python …') });
  py = await loadPyodide({
    indexURL: new URL('pyodide/', self.location).href,
    stdout: s => send('stdout', { text: s }),
    stderr: s => send('stderr', { text: s }),
  });
  send('status', { text: L('NumPy & matplotlib werden geladen …', 'Loading NumPy & matplotlib …') });
  await py.loadPackage(['numpy', 'matplotlib'], { messageCallback: () => {} , errorCallback: m => send('stderr', { text: m }) });
  await py.runPythonAsync(HARNESS);
  send('ready', { ms: Date.now() - t0 });
}

const initP = init().catch(e => send('fatal', { text: String(e && e.message || e) }));

let chain = Promise.resolve();
self.onmessage = ev => {
  const m = ev.data;
  if (m.type !== 'run') return;
  chain = chain.then(() => handle(m));
};
async function handle(m) {
  await initP;
  if (!py) return;
  try {
    const src = m.code + (m.pre || '') + JSON.stringify(m.tests || []);
    const want = [];
    if (/\bscipy\b/.test(src) && !loaded.has('scipy')) want.push('scipy');
    if (/\bsympy\b/.test(src) && !loaded.has('sympy')) want.push('sympy');
    if (want.length) {
      send('status', { text: (want.includes('scipy') ? 'SciPy' : '') + (want.length > 1 ? ' & ' : '') + (want.includes('sympy') ? 'SymPy' : '') + L(' wird geladen (einmalig) …', ' loading (one time) …') });
      try { await py.loadPackage(want, { messageCallback: () => {} }); want.forEach(p => loaded.add(p)); }
      finally { send('ready', { ms: 0 }); }
    }
    const run = py.globals.get('_run');
    const r = run(m.code, py.toPy(m.tests || []), m.pre || '');
    const res = r.toJs({ dict_converter: Object.fromEntries });
    r.destroy();
    send('result', { id: m.id, res });
  } catch (e) {
    send('result', { id: m.id, res: { ok: false, error: String(e && e.message || e).split('\n').slice(-3).join('\n'), where: '', tests: [], images: [] } });
  }
}
