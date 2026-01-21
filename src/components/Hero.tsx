import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grain">
      {/* Liquid background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 -left-48 w-[500px] h-[500px] bg-foreground/[0.03] animate-morph animate-pulse-glow"
        />
        <div 
          className="absolute bottom-1/4 -right-48 w-[600px] h-[600px] bg-foreground/[0.02] animate-morph-slow animate-pulse-glow"
          style={{ animationDelay: "-7s" }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-foreground/[0.015] animate-morph animate-float"
          style={{ animationDelay: "-3s" }}
        />
      </div>

      {/* Subtle grid */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(0 0% 50%) 1px, transparent 0)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <span className="inline-block px-5 py-2 text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground border border-border/50 rounded-full backdrop-blur-sm">
              Available for Work
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8 leading-[0.9]"
          >
            <motion.span 
              className="text-gradient block"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Creative
            </motion.span>
            <motion.span 
              className="text-foreground/90 block"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              Developer
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-14 leading-relaxed"
          >
            Crafting digital experiences that feel alive. 
            Focused on seamless interfaces and fluid interactions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <motion.a
              href="#projects"
              className="group relative px-10 py-4 bg-foreground text-background font-medium rounded-full overflow-hidden transition-all duration-500"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">View My Work</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-foreground via-muted-foreground to-foreground"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </motion.a>
            <motion.a
              href="#about"
              className="px-10 py-4 border border-border/50 text-foreground/80 font-medium rounded-full hover:border-foreground/30 hover:text-foreground transition-all duration-500"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-muted-foreground/40 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
