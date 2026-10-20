import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "GitHub", href: "https://github.com/MrxYacinex" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/yacine-tadjine/" },
  { label: "X", href: "https://x.com/YacineTadjine4" },
];

const Contact = () => (
  <section id="contact" className="mx-auto max-w-5xl px-5 pb-24 pt-4 md:pb-32">
    <div className="border-t border-white/15 pt-10">
      <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Get in touch</h2>
      <p className="mt-4 max-w-[34rem] leading-relaxed text-muted-foreground">
        Questions about a project, an internship or the game? Email is the fastest way to reach me.
      </p>
      <a
        href="mailto:ytadjine@ethz.ch"
        className="mt-8 inline-block font-display text-2xl font-semibold tracking-tight underline decoration-white/25 decoration-2 underline-offset-[6px] transition-colors hover:decoration-white md:text-4xl"
      >
        ytadjine@ethz.ch
      </a>
      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Contact;
