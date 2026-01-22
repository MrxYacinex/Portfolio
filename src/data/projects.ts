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
        description: "ETH's first modular autonomous rover for the European Rover Challenge. AI-based navigation and object detection.",
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
        description: "Multi-agent AI system for real-time geopolitical risk analysis. Achieved 70%+ accuracy.",
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
        description: "AI-powered learning platform with real-time emotion detection to personalize educational content.",
        tech: ["Python", "Computer Vision", "TensorFlow", "OpenCV", "React"],
        link: "https://github.com/MrxYacinex/emol_marc"
    },
    {
        slug: "crater-simulation",
        title: "Crater Simulation (Gazebo)",
        category: "Robotics & Simulation",
        description: "Advanced crater simulation environment using Gazebo. Realistic terrain models and physics-based simulations.",
        tech: ["C++", "Gazebo", "ROS", "Simulation"],
        link: "https://github.com/MrxYacinex/crater_sim_gazebo"
    },
    {
        slug: "ai-game-bot",
        title: "AI Game Bot",
        category: "Computer Vision & AI",
        description: "Intelligent bot using computer vision and machine learning to play games autonomously. Real-time screen capture and object detection.",
        tech: ["Python", "OpenCV", "TensorFlow", "Computer Vision"],
        link: "https://github.com/MrxYacinex/MegaGay"
    },
    {
        slug: "eth-algorithms",
        title: "ETH Algorithms & Data Structures",
        category: "Academic & Competitive Programming",
        description: "Comprehensive collection of fundamental algorithms and data structures implemented in Java. Covers sorting, graph algorithms, dynamic programming, and more.",
        tech: ["1", "Algorithms", "Data Structures", "Competitive Programming"],
        link: "https://github.com/MrxYacinex/ETH_Algorithms_DataStructures",
        content: {
            overview: "A comprehensive repository of algorithms and data structures implemented in Java, covering the core topics taught in ETH Zürich's computer science curriculum. This collection features clean, minimal, and educational implementations designed for understanding and study purposes.",
            challenges: [
                "Implementing algorithms correctly while maintaining code readability and educational value",
                "Ensuring optimal time and space complexity for each algorithm",
                "Organizing code structure to be intuitive and easy to navigate",
                "Balancing between minimal code and comprehensive functionality"
            ],
            solutions: [
                "Organized code by categories (basics, sorting, graphs, DP, etc.) for easy navigation",
                "Included detailed complexity analysis in documentation",
                "Implemented algorithms with clear variable names and comments",
                "Created standalone implementations that can be run independently"
            ],
            results: "Successfully implemented 50+ algorithms and data structures covering all major categories. The repository serves as a comprehensive study resource for algorithms and data structures, with clear complexity analysis and educational implementations."
        }
    },
    {
        slug: "real-estate",
        title: "RealEstate Platform",
        category: "Full-Stack Development",
        description: "Modern real estate platform with TypeScript. Property listings, search functionality, and interactive interfaces.",
        tech: ["TypeScript", "React", "Node.js", "Full-Stack"],
        link: "https://github.com/MrxYacinex/RealEstate"
    },
    {
        slug: "voter-app",
        title: "Voter Application",
        category: "Full-Stack Development",
        description: "Interactive voting application with TypeScript. Secure voting processes with real-time updates.",
        tech: ["TypeScript", "React", "Node.js", "Web Application"],
        link: "https://github.com/MrxYacinex/Voter"
    },
    {
        slug: "botgreen",
        title: "BotGreen - Automation Bot",
        category: "Automation & Python",
        description: "Python-based automation bot designed for efficient task automation and workflow optimization.",
        tech: ["Python", "Automation", "Bot Development"],
        link: "https://github.com/MrxYacinex/botgreen"
    },
    {
        slug: "system-programming",
        title: "System Programming (C)",
        category: "Systems Programming",
        description: "File system implementation from scratch in C. Directory management, file I/O, inode structures, and process scheduling.",
        tech: ["C", "File Systems", "Operating Systems", "Low-Level Programming"],
        link: "https://github.com/MrxYacinex/SysProg-3",
        content: {
            overview: "A comprehensive file system implementation built from the ground up in C, developed as part of TU Berlin's System Programming coursework. This project involved creating a fully functional file system with directory structures, file operations, and process scheduling capabilities.",
            challenges: [
                "Designing and implementing inode structures for efficient file metadata storage",
                "Managing memory allocation and deallocation for file system blocks",
                "Implementing directory traversal and path resolution algorithms",
                "Creating robust file I/O operations with proper error handling",
                "Implementing multiple CPU scheduling algorithms (FCFS, SJF, Round Robin)"
            ],
            solutions: [
                "Designed a hierarchical inode structure supporting both files and directories",
                "Implemented efficient block allocation using bitmap-based free space management",
                "Created a robust path parsing and directory navigation system",
                "Developed comprehensive test suite covering edge cases and error scenarios",
                "Built modular architecture allowing easy extension with new scheduling strategies"
            ],
            results: "Successfully implemented a working file system with all core operations (create, read, write, delete, directory management). All tests passed, demonstrating correct implementation of file system internals and process scheduling algorithms. The project provided deep hands-on experience with operating system concepts and low-level C programming."
        }
    },
];
