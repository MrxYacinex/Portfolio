import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Project {
    title: string;
    category: string;
    description: string;
    tech: string[];
    link: string;
    award?: string;
}

interface ProjectCarouselProps {
    projects: Project[];
}

const ProjectCarouselCustom: React.FC<ProjectCarouselProps> = ({ projects }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-rotate
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % projects.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [projects.length]);

    // Calculate visible items
    // We want to show a centered item and neighbors.
    // Let's render transparent 3D items.

    // Helper to get project at wrapped index
    const getProject = (index: number) => {
        const wrappedIndex = (index + projects.length) % projects.length;
        return projects[wrappedIndex];
    };

    return (
        <div className="w-full relative py-20 min-h-[500px] flex justify-center items-center overflow-hidden [perspective:1000px]">
            {/* Gradient Overlays */}
            <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

            <div className="relative w-full max-w-5xl h-[400px] flex justify-center items-center">
                {/* Render virtual window of items relative to activeIndex */
                    [-2, -1, 0, 1, 2].map((offset) => {
                        const index = activeIndex + offset;
                        const project = getProject(index);
                        const isCenter = offset === 0;

                        // 3D Transforms
                        const xOffset = offset * 50; // % translation roughly
                        // But for absolute positioning we need pixels or % relative to container

                        // Let's use absolute positioning with transforms
                        // Center is at 50%
                        // Left 1 is at 25%
                        // Right 1 is at 75%

                        let x = "0%";
                        let zIndex = 10 - Math.abs(offset);
                        let scale = 1;
                        let rotateY = 0;
                        let blur = 0;
                        let opacity = 1;

                        if (offset === 0) {
                            x = "0%";
                            scale = 1;
                            blur = 0;
                            rotateY = 0;
                        } else if (offset === -1) {
                            x = "-50%"; // Left
                            scale = 0.8;
                            rotateY = 25;
                            blur = 2;
                            opacity = 0.8;
                        } else if (offset === 1) {
                            x = "50%"; // Right
                            scale = 0.8;
                            rotateY = -25;
                            blur = 2;
                            opacity = 0.8;
                        } else if (offset === -2) {
                            x = "-90%"; // Far Left
                            scale = 0.6;
                            rotateY = 45;
                            blur = 5;
                            opacity = 0.5;
                        } else if (offset === 2) {
                            x = "90%"; // Far Right
                            scale = 0.6;
                            rotateY = -45;
                            blur = 5;
                            opacity = 0.5;
                        }

                        return (
                            <motion.div
                                key={`slide-${index}-${project.title}`} // Unique key logic is tricky with circular, using activeIndex helps stability
                                layoutId={`slide-${getProject(index).title}`}
                                // Actually, explicit animation is better for infinite loop
                                initial={false}
                                animate={{
                                    x: x,
                                    zIndex: zIndex,
                                    scale: scale,
                                    rotateY: rotateY,
                                    filter: `blur(${blur}px)`,
                                    opacity: opacity,
                                }}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeInOut"
                                }}
                                className="absolute w-[80vw] md:w-[400px] h-[450px]"
                                style={{
                                    transformStyle: "preserve-3d",
                                    left: "50%",
                                    marginLeft: "-200px" // Half of width (md)
                                    // We need responsive centering logic.
                                    // Tailwind w-[80vw] means marginLeft -40vw?
                                }}
                            >
                                {/* Responsive centering fix */}
                                <div className="w-full h-full relative">
                                    <ProjectCard project={project} />
                                </div>
                            </motion.div>
                        );
                    })
                }
            </div>
        </div>
    );
};

// ... ProjectCard component (duplicate for now to ensure self-contained file)
const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <div className="group relative h-full bg-card/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors duration-500 flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="p-6 flex flex-col h-full relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                        <span className="text-[10px] font-medium text-emerald-400 tracking-wider uppercase">
                            {project.category}
                        </span>
                        <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                            {project.title}
                        </h3>
                    </div>
                    {project.link !== "#" && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
                        >
                            <ExternalLink className="w-4 h-4 text-gray-300" />
                        </a>
                    )}
                </div>
                {/* 
                {project.award && (
                    <div className="flex items-center gap-2 mb-4 text-amber-400 text-xs font-medium">
                        <Trophy className="w-3 h-3" />
                        <span>{project.award}</span>
                    </div>
                )}
                */}
                <p className="text-gray-400 text-xs leading-relaxed mb-6 line-clamp-4 flex-grow">
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tech.slice(0, 4).map((t, i) => (
                        <span key={i} className="px-2 py-1 text-[9px] uppercase tracking-wider bg-white/5 border border-white/5 rounded-full text-gray-300">
                            {t}
                        </span>
                    ))}
                    {project.tech.length > 4 && (
                        <span className="px-2 py-1 text-[9px] uppercase tracking-wider bg-white/5 border border-white/5 rounded-full text-gray-300">
                            +{project.tech.length - 4}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCarouselCustom;

/* 
   Note: The 'marginLeft' logic in the main styles above was hardcoded for 'md'. 
   We should adjust styles to be responsive or use 'transform: translateX(-50%)' in the animate.
   Wait, 'x' in animate is translateX. 
   If I set left: 50%, and then x shifts it relative to that Center point.
   
   If x="0%", it is centered (but top-left corner is at center).
   So we need `translateX(-50%)` as the base state.
   
   Let's refine the x values:
   Center: `calc(-50% + 0px)`
   Right: `calc(-50% + 50%)` -> 0%
   Left: `calc(-50% - 50%)` -> -100%
   
   Actually, standard `translateX` works on the element's own width.
   Left: 50%.
   x: "-50%" -> Perfect center.
   
   If I want it shifted to the right by 200px? 
   x: "calc(-50% + 300px)"
   
   Let's use hard pixel offsets approx or percentage.
   If width is fixed/responsive, percentage is best.
   
   Offset -1: x: calc(-50% - 60%) to be spaced out?
   
   I'll update the logic below in the file write.
*/
