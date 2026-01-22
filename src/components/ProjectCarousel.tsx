import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useMotionValue, useTransform, animate } from "framer-motion";
import { Trophy, Github, ArrowRight } from "lucide-react";
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
    // Duplicate projects multiple times for smoother marquee
    const extendedProjects = [...projects, ...projects, ...projects, ...projects];

    return (
        <div className="w-full relative py-10 overflow-hidden group bg-background">
            {/* Gradient Overlays - Reduced width for cleaner edges */}
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

            <div className="flex overflow-hidden">
                <motion.div
                    className="flex" // No gap, touching cards
                    animate={{ x: ["0%", "-25%"] }} // Moving 1/4th (one set)
                    transition={{
                        duration: 60, // Slower, smoother
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "loop",
                    }}
                    style={{
                        width: "fit-content",
                        minWidth: "400%",
                    }}
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
    // Use the link if available, otherwise just a div
    const Component = project.link !== "#" ? "a" : "div";
    const props = project.link !== "#" ? { href: project.link, target: "_blank", rel: "noopener noreferrer" } : {};

    return (
        <Component
            {...props}
            className="w-[80vw] md:w-[400px] h-[350px] flex-shrink-0 relative group border-t border-b border-r border-white/5 first:border-l bg-background hover:bg-zinc-900/50 transition-colors duration-500 cursor-pointer overflow-hidden"
        >
            {/* Hover Reveal Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Content Container */}
            <div className="p-8 h-full flex flex-col relative z-10">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] tracking-[0.2em] font-medium text-zinc-500 uppercase group-hover:text-indigo-400 transition-colors">
                        {project.category}
                    </span>
                    {/* Subtle arrow indicator instead of box icon */}
                    <div className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                        <ArrowRight className="w-4 h-4 text-indigo-400" />
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:translate-x-1 transition-transform duration-500">
                    {project.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-3 group-hover:text-zinc-400 transition-colors flex-grow">
                    {project.description}
                </p>

                {/* Award Highlight */}
                {project.award && (
                    <div className="mb-6 flex items-center gap-2 text-amber-500/80 text-xs">
                        <Trophy className="w-3 h-3" />
                        <span className="tracking-wide font-medium">{project.award}</span>
                    </div>
                )}

                {/* Tech Stack - Minimal Dots/Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.slice(0, 3).map((t, i) => (
                        <span key={i} className="text-[10px] text-zinc-600 border border-zinc-800 px-2 py-1 rounded-sm uppercase tracking-wider group-hover:border-zinc-700 group-hover:text-zinc-500 transition-colors">
                            {t}
                        </span>
                    ))}
                    {project.tech.length > 3 && (
                        <span className="text-[10px] text-zinc-600 border border-zinc-800 px-2 py-1 rounded-sm uppercase tracking-wider">
                            +{project.tech.length - 3}
                        </span>
                    )}
                </div>
            </div>

            {/* Bottom Active Line on Hover */}
            <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-indigo-500 group-hover:w-full transition-all duration-700 ease-out" />
        </Component>
    );
};

export default ProjectCarousel;
