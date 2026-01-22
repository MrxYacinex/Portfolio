import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-foreground">
      {/* 1. Cyberpunk Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundImage: `
                   linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
               `,
          backgroundSize: "40px 40px",
          maskImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 70%)`
        }}
      />

      {/* 2. HUD Corners */}
      <div className="absolute inset-0 pointer-events-none p-6 md:p-12 z-20 flex flex-col justify-between">
        <div className="flex justify-between">
          <div className="w-8 h-8 border-t-2 border-l-2 border-foreground/20" />
          <div className="w-8 h-8 border-t-2 border-r-2 border-foreground/20" />
        </div>
        <div className="flex justify-between">
          <div className="w-8 h-8 border-b-2 border-l-2 border-foreground/20" />
          <div className="w-8 h-8 border-b-2 border-r-2 border-foreground/20" />
        </div>
      </div>

      {/* 3. Floating Data Stream (Decor) */}
      <div className="absolute top-1/4 left-10 font-mono text-[10px] text-foreground/20 hidden md:block select-none">
        <div className="flex flex-col gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2 + i, repeat: Infinity }}
            >
              0x{Math.random().toString(16).slice(2, 8).toUpperCase()} :: MEM_ALLOC
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="container mx-auto px-6 relative z-10"
        style={{ y, opacity }}
      >
        <div className="max-w-5xl mx-auto text-center">

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-foreground/60 uppercase tracking-widest">
              System Online
            </span>
          </motion.div>

          {/* Glitch Title */}
          <div className="relative mb-6 group">
            <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 relative z-10">
              YACINE TADJINE
            </h1>
            {/* Simple Glitch Layers */}
            <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tighter text-red-500 absolute top-0 left-0 opacity-0 group-hover:opacity-40 animate-pulse translate-x-[2px] z-0 overflow-hidden" aria-hidden="true">
              YACINE TADJINE
            </h1>
            <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tighter text-blue-500 absolute top-0 left-0 opacity-0 group-hover:opacity-40 animate-pulse -translate-x-[2px] z-0 overflow-hidden" aria-hidden="true">
              YACINE TADJINE
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl font-mono text-foreground/60 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            <span className="text-emerald-500">const</span> <span className="text-blue-400">role</span> = <span className="text-amber-400">"Robotics Engineer/ETH Zürich"</span>;
            <br />
            <span className="text-sm mt-2 block opacity-70">
              Building autonomous systems & exploring AI frontiers.
            </span>
          </motion.p>

          {/* Cyberpunk Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="#projects" className="relative px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-emerald-400 transition-colors clip-path-slant group">
              <span className="relative z-10">Initiate Protocol</span>
              <div className="absolute inset-0 bg-white group-hover:bg-emerald-400 transition-colors blur-lg opacity-40" />
            </a>

            <a href="#contact" className="px-8 py-3 bg-transparent border border-white/20 text-white font-mono text-sm uppercase tracking-widest hover:bg-white/5 hover:border-emerald-500/50 transition-all">
              [ Contact_Me ]
            </a>
          </div>

        </div>
      </motion.div>

      {/* Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[100] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
    </section>
  );
};

export default Hero;
