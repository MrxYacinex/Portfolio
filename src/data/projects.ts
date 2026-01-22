export interface ProjectContent {
    overview?: string;
    challenges?: string[];
    solutions?: string[];
    results?: string;
    images?: string[];
}

export interface Project {
    slug: string;
    title: string;
    category: string;
    description: string;
    tech: string[];
    link?: string;
    liveLink?: string;
    award?: string;
    content?: ProjectContent;
}

export const projectsData: Project[] = [
    {
        slug: "crater-rover",
        title: "CRATER – ETH Autonomous Rover",
        category: "Robotics & Autonomous Systems",
        description: "Leading ETH's first modular autonomous rover for the European Rover Challenge. Implementing AI-based navigation, object detection, and motion planning using Python and ROS. Collaborating with interdisciplinary teams to integrate mechanical, electrical, and software systems.",
        tech: ["Python", "ROS", "AI", "Computer Vision", "Motion Planning"],
        link: "#",
        award: "European Rover Challenge 2025",
        content: {
            overview: "CRATER is ETH Zürich's pioneering autonomous rover project designed to compete in the European Rover Challenge 2025. As the team lead, I'm responsible for the AI and software architecture that enables the rover to navigate autonomously, detect objects, and execute complex mission tasks.",
            challenges: [
                "Integrating multiple sensor systems (LiDAR, cameras, IMU) for robust environmental perception",
                "Developing real-time motion planning algorithms that work in unpredictable terrain",
                "Coordinating between mechanical, electrical, and software subsystems",
                "Ensuring system reliability under competition conditions"
            ],
            solutions: [
                "Implemented ROS-based modular architecture for easy testing and integration",
                "Developed custom AI models for object detection and terrain classification",
                "Created simulation environment in Gazebo for pre-competition testing",
                "Established continuous integration pipeline for software validation"
            ],
            results: "Successfully built a functional autonomous rover capable of navigating complex terrain, detecting objects with 85%+ accuracy, and executing mission tasks. The project brought together 30+ students from different disciplines and is on track for competition in 2025."
        }
    },
    {
        slug: "bubbe-ai",
        title: "Bubbe.Ai - Geopolitical Risk Intelligence",
        category: "AI & Machine Learning",
        description: "AI-driven system combining multi-agent architectures and ML prediction models for real-time geopolitical risk analysis. Achieved 70%+ accuracy, outperforming SAP's baseline. Built with NLP and time-series forecasting for automated mitigation strategies.",
        tech: ["Python", "NLP", "Multi-Agent AI", "Time-Series", "ML"],
        link: "#",
        award: "JiVS Hackathon 2025 - 1st Place",
        content: {
            overview: "Bubbe.Ai is an AI-powered geopolitical risk intelligence platform that won 1st place at the JiVS Hackathon 2025. The system uses multi-agent AI architecture and machine learning to analyze global events and predict geopolitical risks with unprecedented accuracy.",
            challenges: [
                "Processing and analyzing vast amounts of unstructured geopolitical data",
                "Achieving prediction accuracy higher than industry baseline (SAP)",
                "Developing real-time risk assessment capabilities",
                "Creating actionable mitigation strategies from predictions"
            ],
            solutions: [
                "Implemented multi-agent AI system where specialized agents handle different risk domains",
                "Used advanced NLP techniques to extract insights from news, reports, and social media",
                "Developed time-series forecasting models trained on historical geopolitical events",
                "Created automated strategy generation system based on predicted risks"
            ],
            results: "Achieved 70%+ prediction accuracy, surpassing SAP's baseline performance. Won 1st place at JiVS Hackathon 2025 competing against 50+ teams. The system successfully identified and predicted several major geopolitical events during the competition period."
        }
    },
    {
        slug: "emol-learning",
        title: "EMOL - AI Learning Platform",
        category: "AI & Education Technology",
        description: "AI-powered learning platform using real-time camera-based emotion and engagement detection to personalize educational content. Improved learning outcomes by 220%+ through computer vision, facial expression analysis, and adaptive learning algorithms.",
        tech: ["Python", "Computer Vision", "TensorFlow", "OpenCV", "React"],
        link: "https://github.com/MrxYacinex/emol_marc"
    },
    {
        slug: "crater-simulation",
        title: "Crater Simulation (Gazebo)",
        category: "Robotics & Simulation",
        description: "Advanced crater simulation environment using Gazebo for robotics research and testing. Developed realistic terrain models and physics-based simulations for autonomous rover navigation testing.",
        tech: ["C++", "Gazebo", "ROS", "Simulation"],
        link: "https://github.com/MrxYacinex/crater_sim_gazebo"
    },
    {
        slug: "ai-game-bot",
        title: "AI Game Bot",
        category: "Computer Vision & AI",
        description: "Intelligent bot using computer vision and machine learning to play games autonomously. Implemented real-time screen capture, object detection, and decision-making algorithms for automated gameplay.",
        tech: ["Python", "OpenCV", "TensorFlow", "Computer Vision"],
        link: "https://github.com/MrxYacinex/MegaGay"
    },
    {
        slug: "eth-algorithms",
        title: "ETH Algorithms & Data Structures",
        category: "Academic & Competitive Programming",
        description: "Comprehensive implementation of fundamental algorithms and data structures from ETH Zürich coursework. Includes advanced data structures, graph algorithms, dynamic programming, and optimization techniques used in competitive programming.",
        tech: ["Java", "Algorithms", "Data Structures", "Competitive Programming"],
        link: "https://github.com/MrxYacinex/ETH_Algorithms_DataStructures"
    },
    {
        slug: "leasyro",
        title: "leasyro - Web Platform",
        category: "Full-Stack Development",
        description: "Developed and deployed web applications using Next.js and Vercel, improving load times and user experience. Integrated backend services and APIs to support dynamic features. Collaborated in a cross-functional startup environment to design scalable software architecture.",
        tech: ["Next.js", "Vercel", "TypeScript", "React", "Node.js"],
        link: "#"
    },
    {
        slug: "real-estate",
        title: "RealEstate Platform",
        category: "Full-Stack Development",
        description: "Modern real estate platform built with TypeScript, featuring property listings, search functionality, and interactive user interfaces. Implemented responsive design and efficient data management for real estate transactions.",
        tech: ["TypeScript", "React", "Node.js", "Full-Stack"],
        link: "https://github.com/MrxYacinex/RealEstate"
    },
    {
        slug: "voter-app",
        title: "Voter Application",
        category: "Full-Stack Development",
        description: "Interactive voting application built with TypeScript, enabling secure and efficient voting processes. Features include real-time updates, user authentication, and result visualization.",
        tech: ["TypeScript", "React", "Node.js", "Web Application"],
        link: "https://github.com/MrxYacinex/Voter"
    },
    {
        slug: "botgreen",
        title: "BotGreen - Automation Bot",
        category: "Automation & Python",
        description: "Python-based automation bot designed for efficient task automation and workflow optimization. Implements intelligent decision-making algorithms and automated processes.",
        tech: ["Python", "Automation", "Bot Development"],
        link: "https://github.com/MrxYacinex/botgreen"
    },
    {
        slug: "system-programming",
        title: "System Programming (C)",
        category: "Systems Programming",
        description: "Advanced system programming projects in C, focusing on low-level system interactions, memory management, and efficient algorithms. Part of ETH Zürich coursework demonstrating mastery of systems programming concepts.",
        tech: ["C", "Systems Programming", "Low-Level Programming"],
        link: "https://github.com/MrxYacinex/SysProg-HW3"
    },
];
