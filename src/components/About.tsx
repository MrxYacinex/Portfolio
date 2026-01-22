import { motion, useInView, Variants, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

// Visible Dynamic Visualization
const InteractiveJourney = () => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Multiple animated gradient orbs - more visible */}
      <div className="absolute inset-0">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${400 + i * 120}px`,
              height: `${400 + i * 120}px`,
              background: `radial-gradient(circle, rgba(255,255,255,${0.05 + i * 0.02}) 0%, transparent 70%)`,
              right: `${10 + i * 8}%`,
              top: `${15 + i * 12}%`,
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -40, 0],
              scale: [1, 1.25, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      {/* Flowing curved paths - more visible */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="pathGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="pathGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        
        {/* Curved path 1 */}
        <motion.path
          d="M 80% 20% Q 60% 40%, 70% 60% T 80% 80%"
          fill="none"
          stroke="url(#pathGrad1)"
          strokeWidth="1.5"
          className="text-foreground"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 0.7,
            d: [
              "M 80% 20% Q 60% 40%, 70% 60% T 80% 80%",
              "M 80% 25% Q 65% 35%, 72% 55% T 80% 75%",
              "M 80% 20% Q 60% 40%, 70% 60% T 80% 80%",
            ]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Curved path 2 */}
        <motion.path
          d="M 70% 30% Q 50% 50%, 60% 70%"
          fill="none"
          stroke="url(#pathGrad2)"
          strokeWidth="1.5"
          className="text-foreground"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 0.6,
            d: [
              "M 70% 30% Q 50% 50%, 60% 70%",
              "M 70% 35% Q 55% 45%, 62% 65%",
              "M 70% 30% Q 50% 50%, 60% 70%",
            ]
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </svg>

      {/* More visible floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-foreground/40 rounded-full"
            style={{
              right: `${15 + (i % 5) * 12}%`,
              top: `${25 + Math.floor(i / 5) * 18}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, (i % 2 === 0 ? 1 : -1) * 25, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
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
                    { value: "2026", label: "Graduation" },
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
