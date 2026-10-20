import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSectionLink } from "@/hooks/use-section-link";

const links = [
  { label: "Game", id: "play" },
  { label: "Work", id: "work" },
  { label: "Contact", id: "contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const go = useSectionLink();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-white/[0.06]" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5" aria-label="Main">
        <Link to="/" onClick={() => window.scrollTo({ top: 0 })} className="font-display text-[15px] font-semibold tracking-tight text-foreground">
          Yacine Tadjine
        </Link>
        <ul className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`/#${l.id}`}
                onClick={go(l.id)}
                className="rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
