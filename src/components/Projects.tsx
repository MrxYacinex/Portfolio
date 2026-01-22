import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import ProjectCarousel from "./ProjectCarousel";

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
  {
    title: "RealEstate Platform",
    category: "Full-Stack Development",
    description: "Modern real estate platform built with TypeScript, featuring property listings, search functionality, and interactive user interfaces. Implemented responsive design and efficient data management for real estate transactions.",
    tech: ["TypeScript", "React", "Node.js", "Full-Stack"],
    link: "https://github.com/MrxYacinex/RealEstate"
  },
  {
    title: "Voter Application",
    category: "Full-Stack Development",
    description: "Interactive voting application built with TypeScript, enabling secure and efficient voting processes. Features include real-time updates, user authentication, and result visualization.",
    tech: ["TypeScript", "React", "Node.js", "Web Application"],
    link: "https://github.com/MrxYacinex/Voter"
  },
  {
    title: "BotGreen - Automation Bot",
    category: "Automation & Python",
    description: "Python-based automation bot designed for efficient task automation and workflow optimization. Implements intelligent decision-making algorithms and automated processes.",
    tech: ["Python", "Automation", "Bot Development"],
    link: "https://github.com/MrxYacinex/botgreen"
  },
  {
    title: "System Programming (C)",
    category: "Systems Programming",
    description: "Advanced system programming projects in C, focusing on low-level system interactions, memory management, and efficient algorithms. Part of ETH Zürich coursework demonstrating mastery of systems programming concepts.",
    tech: ["C", "Systems Programming", "Low-Level Programming"],
    link: "https://github.com/MrxYacinex/SysProg-HW3"
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
    <section id="projects" className="py-20 relative">
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
            className="w-full"
          >
            <ProjectCarousel projects={projects} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
