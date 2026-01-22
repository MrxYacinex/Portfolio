import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

      <div className="container mx-auto px-6 relative z-10">

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto pt-10"
        >
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
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
                  passionate about robotics, AI, and competitive programming. Currently leading the ETH Robotics Club
                  team developing autonomous rover systems for the European Rover Challenge.
                </p>
                <p>
                  My journey includes leading award-winning hackathon projects like <span className="text-foreground/90 font-semibold">Bubbe.Ai</span>
                  (1st Place at JiVS Hackathon 2025), building AI-powered learning platforms that improve outcomes by 220%+,
                  and developing full-stack applications at startups like leasyro.
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
                    { value: "2027", label: "Graduation" },
                    { value: "1.1", label: "GPA (TU Berlin)" },
                    { value: "220%", label: "Improvement" },
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

            {/* Visual Column */}
            <motion.div
              variants={visualVariants}
              className="relative lg:h-[600px] flex items-center justify-center"
            >
              <div className="relative w-full max-w-md lg:max-w-lg aspect-square">
                {/* Main glass container */}
                <div className="absolute inset-0 rounded-[2.5rem] glass overflow-hidden">
                  {/* Animated gradient orbs */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-64 h-64 bg-gradient-to-br from-foreground/[0.06] to-foreground/[0.02] rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-40 h-40 border-2 border-foreground/10 rounded-full"
                      animate={{
                        scale: [1, 0.8, 1],
                        rotate: [0, -180, 0],
                      }}
                      transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                      }}
                    />
                  </div>

                  {/* Floating particles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-foreground/20 rounded-full"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 3) * 20}%`,
                      }}
                      animate={{
                        y: [0, -30, 0],
                        opacity: [0.2, 0.5, 0.2],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5,
                      }}
                    />
                  ))}

                  {/* Glowing accents */}
                  <div className="absolute top-12 left-12 w-3 h-3 bg-foreground/40 rounded-full blur-sm" />
                  <div className="absolute bottom-20 right-20 w-4 h-4 bg-foreground/30 rounded-full blur-md" />
                  <div className="absolute top-1/2 right-12 w-2 h-2 bg-foreground/25 rounded-full blur-sm" />
                </div>

                {/* Outer glow ring */}
                <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-foreground/5 to-transparent blur-2xl opacity-50" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
