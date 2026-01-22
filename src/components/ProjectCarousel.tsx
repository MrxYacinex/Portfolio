import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useMotionValue, useTransform, animate } from "framer-motion";
import { ExternalLink, Trophy, Github } from "lucide-react";
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

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
    // Duplicate projects to create a seamless infinite loop
    const extendedProjects = [...projects, ...projects, ...projects];

    // We can use a ref to measure, but for a "chain" we can simpler logic
    // Moves from Left to Right as requested? Or right to left?
    // "move from the left to the right" -> usually means content flows -> so x goes negative ?
    // If it moves left-to-right, x goes positive. 
    // Usually tickers go Right-to-Left (text entering from right). 
    // Let's do standard Right-to-Left (x goes -) as it's more natural for reading.

    // Actually, "move from the left to the right" might mean the USER looks left-right, so content moves Left.
    // Let's stick to standard Marquee (Right -> Left).

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="w-full relative py-20 overflow-hidden group">
            {/* Gradient Overlays for "Blurry Sides" */}
            <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-background via-background/80 to-transparent z-20 pointer-events-none blur-sm" />
            <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-background via-background/80 to-transparent z-20 pointer-events-none blur-sm" />

            <div className="flex overflow-hidden">
                <motion.div
                    className="flex gap-6 px-4"
                    animate={{ x: ["0%", "-33.33%"] }} // We have 3 sets, so moving 1 set width is 33%
                    transition={{
                        duration: 40,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "loop",
                        // Pause on hover hack: we can't easily pause a pure CSS/motion animate without state
                        // But we can slow it down or use playback controls.
                        // Let's try simple first.
                    }}
                    style={{
                        width: "fit-content",
                        minWidth: "300%", // Ensure container is wide enough
                    }}
                // Hover to pause: simpler to just let it run or use AnimationControls.
                // For now, smooth constant motion.
                >
                    {extendedProjects.map((project, index) => (
                        <ProjectCard key={`${project.title}-${index}`} project={project} />
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <div className="w-[85vw] md:w-[450px] flex-shrink-0 relative group/card">
            {/* 
               "Chain" style: 
               Connecting line? Or just neatly packed?
               "Next to each other" implies standard spacing.
               
               Fix "See through" bug: Use SOLID background.
            */}
            <div className="h-full bg-zinc-900/90 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1">
                {/* Image/Gradient Header Area */}
                <div className="h-32 bg-gradient-to-br from-emerald-900/20 to-zinc-900 relative p-6 border-b border-white/5 group-hover/card:from-emerald-900/40 transition-colors">
                    <div className="absolute top-4 right-4 flex gap-2">
                        {project.link !== "#" && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-black/40 rounded-full hover:bg-emerald-500 text-white/70 hover:text-white transition-all backdrop-blur-sm"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-widest uppercase mb-3">
                        {project.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white leading-tight group-hover/card:text-emerald-400 transition-colors">
                        {project.title}
                    </h3>
                </div>

                <div className="p-6 flex flex-col h-[280px]"> {/* Fixed height for consistency */}

                    {project.award && (
                        <div className="flex items-center gap-2 mb-4 text-amber-300 text-xs font-medium bg-amber-500/10 p-2 rounded-lg border border-amber-500/20 w-fit">
                            <Trophy className="w-3 h-3" />
                            <span>{project.award}</span>
                        </div>
                    )}

                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-4 flex-grow">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tech.slice(0, 5).map((t, i) => (
                            <span key={i} className="px-2.5 py-1 text-[11px] font-medium bg-white/5 border border-white/10 rounded text-zinc-300 group-hover/card:border-white/20 transition-colors">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCarousel;
