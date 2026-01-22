import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["Java", "Python", "JavaScript", "HTML/CSS", "C++", "C", "GoLang", "ROS2"],
  },
  {
    title: "Frameworks & Libraries",
    skills: ["React.js", "Next.js", "Node.js", "Express.js", "Bootstrap", "Spring Boot", "TensorFlow", "PyTorch", "scikit-learn", "MATLAB", "NLP", "Computer Vision"],
  },
  {
    title: "Tools & Platforms",
    skills: ["Vercel", "Git", "Jupyter Notebook", "IntelliJ IDEA", "PyCharm", "Eclipse", "Android Studio"],
  },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <section id="skills" className="py-20 relative">
      {/* Background blob */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-foreground/[0.01] animate-morph-slow animate-pulse-glow" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <span className="text-muted-foreground/60 text-xs font-medium tracking-[0.3em] uppercase mb-6 block">
              Expertise
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-bold">
              Technical <span className="text-gradient">Skills</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-3 gap-6"
          >
            {skillCategories.map((category) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="glass rounded-2xl p-10"
              >
                <h3 className="font-display text-xl font-bold mb-8 text-foreground/80">
                  {category.title}
                </h3>
                <ul className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.li
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        delay: 0.4 + skillIndex * 0.08,
                        duration: 0.6,
                        ease: "easeOut",
                      }}
                      className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors duration-500 group"
                    >
                      <span className="w-1 h-1 bg-foreground/30 rounded-full group-hover:bg-foreground/60 transition-colors duration-500" />
                      <span className="text-sm">{skill}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Skill bars */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-12 glass rounded-2xl p-10"
          >
            <h3 className="font-display text-xl font-bold mb-10 text-center text-foreground/80">
              Core Competencies
            </h3>
            <div className="space-y-8 max-w-3xl mx-auto">
              {[
                { name: "Algorithms & Data Structures", level: 95 },
                { name: "Robotics & Autonomous Systems", level: 90 },
                { name: "AI & Machine Learning", level: 85 },
                { name: "Competitive Programming", level: 95 },
                { name: "Full-Stack Development", level: 80 },
                { name: "Software Engineering", level: 85 },
              ].map((competency, index) => (
                <div key={competency.name}>
                  <div className="flex justify-between text-xs mb-3">
                    <span className="text-muted-foreground tracking-wider">{competency.name}</span>
                    <span className="text-foreground/60">{competency.level}%</span>
                  </div>
                  <div className="h-[2px] bg-foreground/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${competency.level}%` } : {}}
                      transition={{
                        delay: 0.8 + index * 0.15,
                        duration: 1.2,
                        ease: "easeOut"
                      }}
                      className="h-full bg-gradient-to-r from-foreground/20 via-foreground/40 to-foreground/20 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
