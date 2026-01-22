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
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
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
            className="mb-10 min-h-[3.5rem] flex items-center justify-center" // Reduced margin and height
          >
            <p className="text-base md:text-lg text-muted-foreground/90 max-w-2xl mx-auto font-mono flex items-center justify-center bg-white/5 py-1.5 px-4 rounded-lg border border-white/5 backdrop-blur-sm">
              <span className="text-emerald-500 mr-2 text-xl flex-shrink-0">{">"}</span>
              <span className="relative inline-flex items-center">
                <span className="relative">
                  {isSelecting && (
                    <motion.span
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute inset-0 bg-emerald-500/20 -z-10"
                    />
                  )}
                  <span className="inline-block px-1 relative z-10">
                    {text || "\u00A0"}
                  </span>
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
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16" // Reduced margin
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
    </section>
  );
};

export default Hero;
