import { motion, useInView, Variants, AnimatePresence, useReducedMotion } from "framer-motion";
import { useRef, useState, useMemo } from "react";

// Nature-inspired Breathing Visualization
const InteractiveJourney = () => {
  const shouldReduceMotion = useReducedMotion();
  
  // Memoize particle data to avoid recalculating on every render
  const particleData = useMemo(() => {
    // Reduce particles on mobile and for reduced motion
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const particleCount = isMobile || shouldReduceMotion ? 10 : 25;
    return Array.from({ length: particleCount }).map((_, i) => {
      const baseX = 55 + (i % 5) * 8;
      const baseY = 20 + Math.floor(i / 5) * 20;
      const randomOffset = (Math.random() - 0.5) * 15;
      const randomY = -60 - Math.random() * 40;
      const randomX = (Math.random() - 0.5) * 50;
      const randomScale = 1.2 + Math.random() * 0.3;
      const randomDuration = 4 + Math.random() * 3;
      
      return {
        id: i,
        baseX,
        baseY,
        randomOffset,
        randomY,
        randomX,
        randomScale,
        randomDuration,
        initialTop: baseY + (Math.random() - 0.5) * 10,
      };
    });
  }, []);

  // Memoize blob configurations - reduce on mobile
  const blobConfigs = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    if (shouldReduceMotion) {
      return []; // No blobs for reduced motion
    }
    
    if (isMobile) {
      return [
        { size: 400, x: 70, y: 25, delay: 0, duration: 8 },
        { size: 350, x: 80, y: 75, delay: 4, duration: 9 },
      ];
    }
    
    return [
      { size: 600, x: 70, y: 25, delay: 0, duration: 8 },
      { size: 450, x: 60, y: 60, delay: 2, duration: 10 },
      { size: 500, x: 80, y: 75, delay: 4, duration: 9 },
    ];
  }, [shouldReduceMotion]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Breathing organic blobs - main elements */}
      <div className="absolute inset-0">
        {blobConfigs.map((blob, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${blob.size}px`,
              height: `${blob.size}px`,
              background: `radial-gradient(ellipse, rgba(255,255,255,${0.04 + i * 0.01}) 0%, transparent 70%)`,
              right: `${blob.x}%`,
              top: `${blob.y}%`,
              transform: "translate(50%, -50%)",
              willChange: "transform, opacity",
            }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 20, 0],
              y: [0, -15, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              ease: [0.4, 0, 0.6, 1], // Smooth breathing ease
              delay: blob.delay,
            }}
          />
        ))}
      </div>

      {/* Flowing organic paths - like vines or roots */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <defs>
          <linearGradient id="organicGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.15" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="organicGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.08" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Organic flowing path 1 - vine-like */}
        <motion.path
          d="M 60% 30% Q 75% 35%, 80% 50% T 75% 70% Q 70% 80%, 65% 85%"
          fill="none"
          stroke="url(#organicGrad1)"
          strokeWidth="2"
          className="text-foreground"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 1],
            opacity: [0, 0.4, 0.4],
            d: [
              "M 60% 30% Q 75% 35%, 80% 50% T 75% 70% Q 70% 80%, 65% 85%",
              "M 60% 32% Q 76% 37%, 81% 52% T 76% 72% Q 71% 82%, 66% 87%",
              "M 60% 30% Q 75% 35%, 80% 50% T 75% 70% Q 70% 80%, 65% 85%",
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ filter: "url(#softGlow)", willChange: "d, opacity, pathLength" }}
        />
        
        {/* Organic flowing path 2 - branch-like */}
        <motion.path
          d="M 55% 40% Q 70% 45%, 78% 60% T 72% 80%"
          fill="none"
          stroke="url(#organicGrad2)"
          strokeWidth="1.5"
          className="text-foreground"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 1],
            opacity: [0, 0.3, 0.3],
            d: [
              "M 55% 40% Q 70% 45%, 78% 60% T 72% 80%",
              "M 55% 42% Q 71% 47%, 79% 62% T 73% 82%",
              "M 55% 40% Q 70% 45%, 78% 60% T 72% 80%",
            ],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          style={{ filter: "url(#softGlow)", willChange: "d, opacity, pathLength" }}
        />

        {/* Subtle organic path 3 */}
        <motion.path
          d="M 65% 50% Q 75% 55%, 80% 65%"
          fill="none"
          stroke="url(#organicGrad2)"
          strokeWidth="1"
          className="text-foreground"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 1],
            opacity: [0, 0.25, 0.25],
            d: [
              "M 65% 50% Q 75% 55%, 80% 65%",
              "M 65% 52% Q 76% 57%, 81% 67%",
              "M 65% 50% Q 75% 55%, 80% 65%",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
          style={{ willChange: "d, opacity, pathLength" }}
        />
      </svg>

      {/* Floating organic particles - like pollen or spores */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        {particleData.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1.5 h-1.5 bg-foreground/25 rounded-full"
            style={{
              right: `${particle.baseX + particle.randomOffset}%`,
              top: `${particle.initialTop}%`,
              willChange: "transform, opacity",
            }}
            animate={{
              y: [0, particle.randomY, 0],
              x: [0, particle.randomX, 0],
              opacity: [0, 0.5, 0],
              scale: [1, particle.randomScale, 1],
            }}
            transition={{
              duration: particle.randomDuration,
              repeat: Infinity,
              delay: particle.id * 0.15,
              ease: [0.4, 0, 0.6, 1],
            }}
          />
        ))}
      </div>

      {/* Breathing pulse effect - subtle heartbeat */}
      <motion.div
        className="absolute right-[65%] top-[50%] w-32 h-32 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
          filter: "blur(20px)",
          transform: "translate(50%, -50%)",
          willChange: "transform, opacity",
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: [0.4, 0, 0.6, 1],
        }}
      />
    </div>
  );
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
      filter: "blur(8px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] // Custom easing for smoother animation
      },
    },
  };

  const statsVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      filter: "blur(6px)"
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      },
    },
  };

  const visualVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      rotate: -5,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1]
      },
    },
  };

  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden grain">
      {/* Background gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/[0.02] to-transparent pointer-events-none" />
      
      {/* Background Visualization */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <InteractiveJourney />
      </div>

      <div className="container mx-auto px-6 relative z-10">

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto pt-10"
        >
          <div className="max-w-4xl">
            {/* Content Column */}
            <div className="space-y-8">
              <motion.div variants={itemVariants} className="space-y-4">
                <span className="inline-block text-muted-foreground/70 text-xs font-semibold tracking-[0.25em] uppercase">
                  About Me
                </span>

                <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                  From competitive programming
                  <span className="text-gradient block mt-3">to autonomous robotics</span>
                </h2>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="space-y-6 text-muted-foreground/90 text-base md:text-lg leading-relaxed max-w-xl"
              >
                <p>
                  I'm a Computer Science student at <span className="text-foreground/90 font-semibold">ETH Zürich</span>,
                  passionate about robotics, AI, and competitive programming. I'm actively participating in <span className="text-foreground/90 font-semibold">Project CRATER</span>,
                  developing autonomous rover systems for the European Rover Challenge.
                </p>
                <p>
                  With over 6 years of coding experience, my journey includes building AI-powered learning platforms,
                  developing full-stack applications, and working on award-winning hackathon projects like <span className="text-foreground/90 font-semibold">Bubbe.Ai</span>.
                </p>
                <p>
                  Beyond code, I've managed sustainability projects raising $5,000+ for schools, winning the Berlin Senate's
                  "Championing Sustainability" $20,000 Award, and actively participating in competitive programming training
                  and Model United Nations.
                </p>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                variants={itemVariants}
                className="pt-8"
              >
                <div className="grid grid-cols-3 gap-6 lg:gap-10">
                  {[
                    { value: "2028", label: "Graduation" },
                    { value: "6+", label: "Years Coding" },
                    { value: "6.7k+", label: "Commits" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      variants={statsVariants}
                      className="text-center lg:text-left group"
                    >
                      <div className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-2 group-hover:text-gradient transition-all duration-300">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground/70 tracking-[0.15em] uppercase font-medium">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
