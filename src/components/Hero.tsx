import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [text, setText] = useState("");
  const [isSelecting, setIsSelecting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  // Shortened quotes, single line, no names
  const messages = [
    "The important thing is not to stop questioning",
    "We can only see a short distance ahead",
    "Somewhere, something incredible is waiting to be known",
    "The future belongs to those who believe in their dreams",
    "Imagination is more important than knowledge",
    "The computer was born to solve problems that did not exist",
    "Science is a way of thinking much more than a body of knowledge"
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleType = () => {
      const currentMessage = messages[loopNum % messages.length];

      if (isSelecting) {
        setIsSelecting(false);
        setText("");
        setLoopNum(loopNum + 1);
      } else {
        if (text.length < currentMessage.length) {
          setText(currentMessage.slice(0, text.length + 1));
        } else {
          timeout = setTimeout(() => {
            setIsSelecting(true);
          }, 2000);
        }
      }
    };

    let delay = 100;
    if (isSelecting) delay = 800;

    timeout = setTimeout(handleType, delay);
    return () => clearTimeout(timeout);
  }, [text, isSelecting, loopNum, messages]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grain">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Floating code snippets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-muted-foreground/10 font-mono text-xs md:text-sm"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            {["</>", "{}", "[]", "fn()", "=>", "&&", "||", "!="][i]}
          </motion.div>
        ))}
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <motion.div
        className="container mx-auto px-6 relative z-10"
        style={{ y, opacity }}
      >
        <div className="max-w-6xl mx-auto text-center">

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 flex justify-center" // Reduced margin
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/90">
                System Online
              </span>
            </div>
          </motion.div>

          {/* Main Heading - Clean, No Glitch */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 relative group inline-block" // Reduced margin
          >
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              <span className="block text-xl md:text-2xl font-normal text-muted-foreground mb-1 tracking-normal">Hi, I'm</span>
              <span className="block text-gradient relative z-10">Yacine Tadjine</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed" // Reduced margin
          >
            Building autonomous systems, exploring AI frontiers, and solving complex problems through code.
            Currently at <span className="text-foreground/90 font-semibold border-b border-white/20 pb-0.5">ETH Zürich</span>.
          </motion.p>

          {/* Typewriter Subtitle - Cleaned and Reduced Margin */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-10 min-h-[3.5rem] flex items-center justify-center"
          >
            <p className="text-base md:text-lg text-muted-foreground/90 max-w-2xl mx-auto font-mono flex items-center justify-center bg-white/5 py-1.5 px-4 rounded-lg border border-white/5 backdrop-blur-sm">
              <span className="text-emerald-500 mr-2 font-bold">&gt;</span>
              <span className="relative inline-flex items-center">
                <span className="relative inline-block">
                  {isSelecting && (
                    <motion.span
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute inset-0 bg-emerald-500/30 rounded-sm"
                    />
                  )}
                  <span className="relative z-10 px-1">{text || "\u00A0"}</span>
                </span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-[2px] h-4 bg-emerald-500 ml-1 flex-shrink-0"
                />
              </span>
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16"
          >
            <motion.a
              href="#projects"
              className="group relative px-8 py-3.5 bg-foreground text-background font-bold rounded-full overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                View Work
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </motion.a>

            <motion.a
              href="#about"
              className="group relative px-8 py-3.5 glass border border-white/10 text-foreground font-semibold rounded-full overflow-hidden hover:bg-white/5 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Learn More
                <svg
                  className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Hero Footer / HUD Elements - Positioned absolutely at bottom */}
      <div className="absolute bottom-10 left-0 right-0 px-6 md:px-12 flex justify-between items-end pointer-events-none z-20">

        {/* Bottom Left: Location Data */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="hidden md:flex flex-col gap-1 font-mono text-[10px] text-muted-foreground/60 uppercase tracking-widest"
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span>Loc: Zürich, CH</span>
          </div>
          <div className="text-muted-foreground/40">Lat: 47.3769° N</div>
          <div className="text-muted-foreground/40">Lng: 08.5417° E</div>
        </motion.div>

        {/* Bottom Center: Scroll Chevron */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-0"
        >
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 13L12 18L17 13M7 6L12 11L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/70" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Bottom Right: Version/Time */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="hidden md:flex flex-col gap-1 font-mono text-[10px] text-muted-foreground/60 uppercase tracking-widest text-right"
        >
          <div>System: Online</div>
          <div className="text-muted-foreground/40">Ver: 2.4.0-rc</div>
          <div className="flex items-center justify-end gap-2 text-emerald-500/80">
            <span>Syncing</span>
            <div className="flex gap-0.5">
              <motion.div animate={{ height: [2, 8, 2] }} transition={{ duration: 1, repeat: Infinity, delay: 0.0 }} className="w-0.5 bg-emerald-500/80" />
              <motion.div animate={{ height: [2, 8, 2] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-0.5 bg-emerald-500/80" />
              <motion.div animate={{ height: [2, 8, 2] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-0.5 bg-emerald-500/80" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
