import { Link } from "react-router-dom";
import { Play } from "lucide-react";

const facts = [
  "11 worlds that follow the lecture script, from rounding errors to quadrature",
  "366 quiz questions in the style of the Moodle exam",
  "73 coding tasks with real NumPy, SciPy and SymPy, graded by hidden tests",
];

const FeaturedGame = () => (
  <section id="play" className="border-y border-white/[0.06] bg-white/[0.015]">
    <div className="mx-auto grid max-w-5xl gap-10 px-5 py-16 md:py-20 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-14">
      <a
        href="/numcs-quest/"
        className="group relative block overflow-hidden rounded-lg border border-white/10 bg-[#141c38] shadow-[0_30px_80px_-30px_rgba(41,173,255,0.35)]"
        aria-label="Play NumCS Quest"
      >
        <img
          src="/numcs-quest/preview-960.webp"
          srcSet="/numcs-quest/preview-960.webp 960w, /numcs-quest/preview.webp 1920w"
          sizes="(min-width: 1024px) 560px, 100vw"
          width={960}
          height={600}
          alt="NumCS Quest home screen: pixel-art title, a continue card and the first chapter worlds"
          className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.015]"
          style={{ imageRendering: "auto" }}
        />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-black/80 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00E436]" aria-hidden="true" />
          Runs in your browser, no install
        </span>
      </a>

      <div>
        <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">NumCS Quest</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          A pixel-art study game for ETH's Numerical Methods for Computer Science course. Python runs right in the page
          through WebAssembly, so you write real code and get graded like on CodeExpert.
        </p>
        <ul className="mt-6 space-y-2.5 text-[15px] text-foreground/85">
          {facts.map((f) => (
            <li key={f} className="flex gap-3">
              <span className="mt-[0.6em] h-1 w-3 shrink-0 bg-[#FFEC27]" aria-hidden="true" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href="/numcs-quest/"
            className="inline-flex items-center gap-2.5 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            <Play className="h-4 w-4 fill-current" aria-hidden="true" />
            Play now
          </a>
          <Link
            to="/projects/numcs-quest"
            className="text-sm text-muted-foreground underline decoration-white/20 underline-offset-4 transition-colors hover:text-foreground hover:decoration-white"
          >
            How it's built
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default FeaturedGame;
