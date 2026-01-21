import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section id="about" className="py-40 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <motion.span
                variants={itemVariants}
                className="text-muted-foreground/60 text-xs font-medium tracking-[0.3em] uppercase mb-6 block"
              >
                About Me
              </motion.span>
              
              <motion.h2
                variants={itemVariants}
                className="font-display text-4xl md:text-6xl font-bold mb-8 leading-[1.1]"
              >
                Turning ideas into
                <span className="text-gradient block mt-2">digital reality</span>
              </motion.h2>

              <motion.div
                variants={itemVariants}
                className="space-y-5 text-muted-foreground leading-relaxed"
              >
                <p>
                  With over 5 years of experience in web development, I specialize 
                  in creating immersive digital experiences that push the boundaries 
                  of what's possible on the web.
                </p>
                <p>
                  My approach combines technical excellence with design thinking, 
                  ensuring every project creates an emotional connection with users.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-12 grid grid-cols-3 gap-8"
              >
                {[
                  { value: "50+", label: "Projects" },
                  { value: "5+", label: "Years" },
                  { value: "30+", label: "Clients" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-display text-4xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground/60 tracking-wider uppercase">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <div className="aspect-square rounded-3xl glass overflow-hidden relative">
                {/* Liquid animated shapes */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 bg-foreground/[0.03] animate-morph animate-float" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-32 h-32 border border-foreground/10 animate-morph-slow animate-float-delayed"
                    style={{ animationDelay: "-5s" }}
                  />
                </div>
                
                {/* Decorative dots */}
                <div className="absolute top-10 left-10 w-1 h-1 bg-foreground/30 rounded-full animate-pulse-glow" />
                <div className="absolute bottom-16 right-16 w-1.5 h-1.5 bg-foreground/20 rounded-full animate-pulse-glow" style={{ animationDelay: "-2s" }} />
                <div className="absolute top-1/2 right-10 w-1 h-1 bg-foreground/15 rounded-full animate-pulse-glow" style={{ animationDelay: "-4s" }} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
