import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projectsData, type Project } from "@/data/projects";

const MAIN = ["crater-rover", "bubbe-ai", "system-programming"];
const main = MAIN.map((s) => projectsData.find((p) => p.slug === s)!).filter(Boolean);
const more = projectsData.filter((p) => !MAIN.includes(p.slug) && p.slug !== "numcs-quest");

/** Projects with a write-up get their own page; the rest go straight to GitHub. */
const ProjectLink = ({ p, className, children }: { p: Project; className?: string; children: React.ReactNode }) =>
  p.content ? (
    <Link to={`/projects/${p.slug}`} className={className}>
      {children}
    </Link>
  ) : (
    <a href={p.link} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );

const Projects = () => (
  <section id="work" className="mx-auto max-w-5xl px-5 py-20 md:py-28">
    <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Selected work</h2>

    <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-3">
      {main.map((p) => (
        <ProjectLink key={p.slug} p={p} className="group flex flex-col border-t border-white/15 pt-5">
          <span className="text-sm text-muted-foreground">{p.category}</span>
          <h3 className="mt-2 font-display text-xl font-semibold leading-snug tracking-tight">
            {p.title.split(/ [–-] /)[0]}
            <ArrowUpRight
              className="ml-1 inline h-4 w-4 -translate-y-0.5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-0.5 group-hover:text-foreground"
              aria-hidden="true"
            />
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{p.description}</p>
          {p.award && <p className="mt-4 text-sm font-medium text-foreground/90">{p.award}</p>}
          <p className="mt-auto pt-5 text-xs text-muted-foreground/80">{p.tech.join(", ")}</p>
        </ProjectLink>
      ))}
    </div>

    <h3 className="mt-20 font-display text-lg font-semibold tracking-tight">More projects</h3>
    <ul className="mt-4 divide-y divide-white/[0.07] border-y border-white/[0.07]">
      {more.map((p) => (
        <li key={p.slug}>
          <ProjectLink
            p={p}
            className="group grid gap-1 py-4 sm:grid-cols-[13rem_1fr_auto] sm:items-baseline sm:gap-6"
          >
            <span className="font-medium text-foreground">{p.title.split(/ [–-] /)[0]}</span>
            <span className="text-[15px] text-muted-foreground">{p.description.split(". ")[0].replace(/\.$/, "")}.</span>
            <span className="hidden items-center gap-1 text-xs text-muted-foreground/70 transition-colors group-hover:text-foreground sm:inline-flex">
              {p.content ? "Details" : "GitHub"}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </ProjectLink>
        </li>
      ))}
    </ul>
  </section>
);

export default Projects;
