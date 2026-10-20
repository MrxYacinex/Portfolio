import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail, Play } from "lucide-react";
import { useSectionLink } from "@/hooks/use-section-link";

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/MrxYacinex" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/yacine-tadjine/" },
];

const Hero = () => {
  const reduce = useReducedMotion();
  const go = useSectionLink();
  // One load sequence for the whole page; nothing else animates on scroll.
  const item = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="mx-auto max-w-5xl px-5 pb-20 pt-32 md:pb-28 md:pt-44">
      <motion.h1
        {...item(0)}
        className="font-display text-[2.75rem] font-bold leading-[1.02] tracking-[-0.03em] sm:text-6xl md:text-7xl"
      >
        Yacine Tadjine
      </motion.h1>

      <motion.p {...item(1)} className="mt-6 max-w-[38rem] text-lg leading-relaxed text-muted-foreground md:text-xl">
        I study computer science at{" "}
        <a href="https://ethz.ch" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-white/25 underline-offset-4 hover:decoration-white">
          ETH Zürich
        </a>{" "}
        and build software that has to hold up outside the editor: autonomy for a planetary rover, a multi-agent AI that
        won a hackathon, and a game that teaches numerical methods with real Python.
      </motion.p>

      <motion.div {...item(2)} className="mt-10 flex flex-wrap items-center gap-3">
        <a
          href="/numcs-quest/"
          className="inline-flex items-center gap-2.5 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
        >
          <Play className="h-4 w-4 fill-current" aria-hidden="true" />
          Play NumCS Quest
        </a>
        <a
          href="/#work"
          onClick={go("work")}
          className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-white/40"
        >
          See my projects
        </a>
        <span className="ml-1 flex items-center gap-1">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
            >
              <s.icon className="h-5 w-5" aria-hidden="true" />
            </a>
          ))}
          <a
            href="mailto:ytadjine@ethz.ch"
            aria-label="Email"
            className="grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
          </a>
        </span>
      </motion.div>
    </section>
  );
};

export default Hero;
