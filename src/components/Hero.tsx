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
    "Building intelligent systems from robotics to AI",
    "Creating innovative solutions with code",
    "Exploring the future of technology"
  ];

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
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-[0.2em] uppercase glass rounded-full border border-border/30 cursor-hover">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground"></span>
              </span>
              ETH Zürich Student
            </span>
          </motion.div>

          {/* Main Heading with Gradient Animation */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8 leading-[0.95]"
          >
            <motion.span
              className="block bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/80 to-foreground"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Robotics
            </motion.span>
            <motion.span
              className="block mt-2 bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #fff 0%, #888 50%, #fff 100%)",
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
                delay: 0.5,
              }}
            >
              & AI Engineer
            </motion.span>
          </motion.h1>

          {/* Enhanced Typewriter Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-16 min-h-[4rem] flex items-center justify-center"
          >
            <p className="text-lg md:text-xl text-muted-foreground/90 max-w-2xl mx-auto font-mono flex items-center justify-center">
              <span className="text-foreground/60 mr-3 text-2xl">{">"}</span>
              <span className="relative inline-flex items-center h-8">
                <motion.span
                  className={isSelecting ? "bg-blue-600 text-white px-1 rounded-sm" : "px-1"}
                  layout
                  transition={{ duration: 0.2 }}
                >
                  {text}
                </motion.span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-[3px] h-6 bg-foreground/60 ml-1"
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

          {/* Scroll Indicator - Moved down and properly centered */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-muted-foreground/40"
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
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

