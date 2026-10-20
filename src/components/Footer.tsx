const Footer = () => (
  <footer className="border-t border-white/[0.06]">
    <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-5 py-6 text-xs text-muted-foreground/70">
      <span>© {new Date().getFullYear()} Yacine Tadjine</span>
      <span>Zürich</span>
    </div>
  </footer>
);

export default Footer;
