import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Crater Simulation (Gazebo)",
    category: "Robotics & Simulation",
    description: "Advanced crater simulation environment using Gazebo for robotics research and testing.",
    tech: ["C++", "Gazebo", "ROS"],
    link: "https://github.com/MrxYacinex/crater_sim_gazebo"
  },
  {
    title: "AI Game Bot",
    category: "Computer Vision & AI",
    description: "Intelligent bot using computer vision and machine learning to play Clash Royale autonomously.",
    tech: ["Python", "OpenCV", "TensorFlow"],
    link: "https://github.com/MrxYacinex/MegaGay"
  },
  {
    title: "ETH Algorithms & Data Structures",
    category: "Academic Project",
    description: "Implementation of fundamental algorithms and data structures from ETH Zürich coursework.",
    tech: ["Java", "Algorithms", "Data Structures"],
    link: "https://github.com/MrxYacinex/ETH_Algorithms_DataStructures"
  },
  {
    title: "Emol Web Platform",
    category: "Full-Stack Application",
    description: "Modern web application with TypeScript backend and interactive frontend features.",
    tech: ["TypeScript", "React", "Node.js"],
    link: "https://github.com/MrxYacinex/emol_marc"
  },
];

const Projects = () => {
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
    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };

  return (
    <section id="projects" className="py-40 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <span className="text-muted-foreground/60 text-xs font-medium tracking-[0.3em] uppercase mb-6 block">
              Selected Work
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-bold">
              Featured <span className="text-gradient">Projects</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 gap-6"
          >
            {projects.map((project) => (
              <motion.a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                className="group relative glass rounded-2xl p-10 cursor-pointer overflow-hidden transition-all duration-700 hover:bg-foreground/[0.03] block"
                whileHover={{ y: -5 }}
              >
                {/* Animated border glow on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: "linear-gradient(135deg, transparent, hsl(0 0% 100% / 0.03), transparent)",
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-8">
                    <span className="text-[10px] text-muted-foreground/60 font-medium tracking-[0.2em] uppercase">
                      {project.category}
                    </span>
                    <motion.div
                      className="w-12 h-12 rounded-full border border-border/30 flex items-center justify-center transition-all duration-500 group-hover:border-foreground/20 group-hover:bg-foreground/5"
                      whileHover={{ scale: 1.1, rotate: 45 }}
                    >
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-500" />
                    </motion.div>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl font-bold mb-4 transition-colors duration-500 group-hover:text-foreground">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground/70 text-sm leading-relaxed mb-8">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-1.5 text-[10px] tracking-wider uppercase bg-foreground/[0.03] border border-border/30 rounded-full text-muted-foreground/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
