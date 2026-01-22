import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "CRATER – ETH Autonomous Rover",
    category: "Robotics & Autonomous Systems",
    description: "Leading ETH's first modular autonomous rover for the European Rover Challenge. Implementing AI-based navigation, object detection, and motion planning using Python and ROS. Collaborating with interdisciplinary teams to integrate mechanical, electrical, and software systems.",
    tech: ["Python", "ROS", "AI", "Computer Vision", "Motion Planning"],
    link: "#",
    award: "European Rover Challenge 2025"
  },
  {
    title: "Bubbe.Ai - Geopolitical Risk Intelligence",
    category: "AI & Machine Learning",
    description: "AI-driven system combining multi-agent architectures and ML prediction models for real-time geopolitical risk analysis. Achieved 70%+ accuracy, outperforming SAP's baseline. Built with NLP and time-series forecasting for automated mitigation strategies.",
    tech: ["Python", "NLP", "Multi-Agent AI", "Time-Series", "ML"],
    link: "#",
    award: "JiVS Hackathon 2025 - 1st Place"
  },
  {
    title: "EMOL - AI Learning Platform",
    category: "AI & Education Technology",
    description: "AI-powered learning platform using real-time camera-based emotion and engagement detection to personalize educational content. Improved learning outcomes by 220%+ through computer vision, facial expression analysis, and adaptive learning algorithms.",
    tech: ["Python", "Computer Vision", "TensorFlow", "OpenCV", "React"],
    link: "https://github.com/MrxYacinex/emol_marc"
  },
  {
    title: "Crater Simulation (Gazebo)",
    category: "Robotics & Simulation",
    description: "Advanced crater simulation environment using Gazebo for robotics research and testing. Developed realistic terrain models and physics-based simulations for autonomous rover navigation testing.",
    tech: ["C++", "Gazebo", "ROS", "Simulation"],
    link: "https://github.com/MrxYacinex/crater_sim_gazebo"
  },
  {
    title: "AI Game Bot",
    category: "Computer Vision & AI",
    description: "Intelligent bot using computer vision and machine learning to play games autonomously. Implemented real-time screen capture, object detection, and decision-making algorithms for automated gameplay.",
    tech: ["Python", "OpenCV", "TensorFlow", "Computer Vision"],
    link: "https://github.com/MrxYacinex/MegaGay"
  },
  {
    title: "ETH Algorithms & Data Structures",
    category: "Academic & Competitive Programming",
    description: "Comprehensive implementation of fundamental algorithms and data structures from ETH Zürich coursework. Includes advanced data structures, graph algorithms, dynamic programming, and optimization techniques used in competitive programming.",
    tech: ["Java", "Algorithms", "Data Structures", "Competitive Programming"],
    link: "https://github.com/MrxYacinex/ETH_Algorithms_DataStructures"
  },
  {
    title: "leasyro - Web Platform",
    category: "Full-Stack Development",
    description: "Developed and deployed web applications using Next.js and Vercel, improving load times and user experience. Integrated backend services and APIs to support dynamic features. Collaborated in a cross-functional startup environment to design scalable software architecture.",
    tech: ["Next.js", "Vercel", "TypeScript", "React", "Node.js"],
    link: "#"
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
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] text-muted-foreground/60 font-medium tracking-[0.2em] uppercase">
                        {project.category}
                      </span>
                      {project.award && (
                        <span className="text-[10px] text-foreground/80 font-semibold tracking-wider">
                          🏆 {project.award}
                        </span>
                      )}
                    </div>
                    {project.link !== "#" && (
                      <motion.div
                        className="w-12 h-12 rounded-full border border-border/30 flex items-center justify-center transition-all duration-500 group-hover:border-foreground/20 group-hover:bg-foreground/5"
                        whileHover={{ scale: 1.1, rotate: 45 }}
                      >
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-500" />
                      </motion.div>
                    )}
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
