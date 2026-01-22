import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [text, setText] = useState("");
  const [isSelecting, setIsSelecting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  const messages = [
    "The important thing is not to stop questioning - Albert Einstein",
    "We can only see a short distance ahead, but we can see plenty there that needs to be done - Alan Turing",
    "Somewhere, something incredible is waiting to be known - Carl Sagan",
    "The future belongs to those who believe in the beauty of their dreams - Eleanor Roosevelt",
    "Imagination is more important than knowledge - Albert Einstein",
    "The computer was born to solve problems that did not exist before - Bill Gates",
    "Science is a way of thinking much more than it is a body of knowledge - Carl Sagan"
  ];

  // Calculate the longest message for consistent width
  const longestMessage = messages.reduce((longest, msg) => msg.length > longest.length ? msg : longest, "");

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleType = () => {
      const currentMessage = messages[loopNum % messages.length];

      if (isSelecting) {
        // Selection phase - delete all text at once after showing selection
        setIsSelecting(false);
        setText(""); // Delete all text at once
        setLoopNum(loopNum + 1);
      } else {
        // Typing phase
        if (text.length < currentMessage.length) {
          setText(currentMessage.slice(0, text.length + 1));
        } else {
          // Finished typing, start selection phase
          timeout = setTimeout(() => {
            setIsSelecting(true);
          }, 2000);
        }
      }
    };

    // Dynamic timing based on state
    let delay = 100;
    if (isSelecting) delay = 800; // Show selection for 800ms before deleting

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
          {/* Personal Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground/70">
              Computer Science Student
            </span>
          </motion.div>

          {/* Main Heading - More Personal */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
          >
            <span className="block">Hi, I'm</span>
            <span className="block mt-2 text-gradient">Yacine Tadjine</span>
          </motion.h1>

          {/* Personal Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Building autonomous systems, exploring AI frontiers, and solving complex problems through code.
            Currently at <span className="text-foreground/90">ETH Zürich</span>, leading robotics projects and competing in programming contests.
          </motion.p>

          {/* Enhanced Typewriter Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-16 min-h-[4rem] flex items-center justify-center"
          >
            <p className="text-lg md:text-xl text-muted-foreground/90 max-w-2xl mx-auto font-mono flex items-center justify-center">
              <span className="text-foreground/60 mr-3 text-2xl flex-shrink-0">{">"}</span>
              <span className="relative inline-flex items-center">
                <span
                  className={`inline-block ${isSelecting ? "bg-foreground/20 text-foreground px-1 rounded-sm" : "px-1"}`}
                  style={{
                    whiteSpace: "nowrap",
                    textRendering: "optimizeLegibility",
                    WebkitFontSmoothing: "antialiased",
                    MozOsxFontSmoothing: "grayscale",
                    fontFeatureSettings: '"liga" 1, "kern" 1',
                    backfaceVisibility: "hidden",
                    transform: "translateZ(0)",
                    willChange: "contents",
                    transition: "opacity 0.05s ease-out",
                  }}
                >
                  {text || "\u00A0"}
                </span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-[3px] h-6 bg-foreground/60 ml-1 flex-shrink-0"
                />
              </span>
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20"
          >
            <motion.a
              href="#projects"
              className="group relative px-10 py-4 bg-foreground text-background font-semibold rounded-full overflow-hidden cursor-hover"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
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
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground to-foreground/80"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </motion.a>

            <motion.a
              href="#about"
              className="group relative px-10 py-4 glass border border-border/50 text-foreground font-semibold rounded-full overflow-hidden cursor-hover"
              whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.3)" }}
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

          {/* Scroll Indicator - Fixed position */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                  const offset = 100;
                  const elementPosition = aboutSection.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-muted-foreground/50 hover:text-muted-foreground/70 transition-colors cursor-pointer"
            >
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase">Scroll</span>
              <svg
                className="w-4 h-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

