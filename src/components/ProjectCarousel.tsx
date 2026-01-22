import React, { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { Project } from "@/data/projects";

interface ProjectCarouselProps {
    projects: Project[];
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
    // Duplicate for infinite loop
    const extendedProjects = [...projects, ...projects, ...projects, ...projects];

    return (
        <div className="w-full py-20 bg-background overflow-hidden relative">
            {/* Subtle scanline/grid texture overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.03]"
                style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

            <div className="flex">
                <motion.div
                    className="flex gap-4 md:gap-8 px-4"
                    animate={{ x: ["0%", "-50%"] }} // Adjust based on duplication count
                    transition={{
                        duration: 50,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "loop",
                    }}
                    style={{ minWidth: "200%" }}
                >
                    {extendedProjects.map((project, index) => (
                        <SpotlightCard key={`${project.title}-${index}`} project={project} index={index % projects.length} />
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

const SpotlightCard = ({ project, index }: { project: Project; index: number }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <Link
            to={`/projects/${project.slug}`}
            className="group relative h-[400px] w-[300px] md:w-[350px] flex-shrink-0 bg-zinc-900/40 border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/20"
            onMouseMove={handleMouseMove}
        >
            {/* Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          650px circle at ${mouseX}px ${mouseY}px,
                          rgba(255, 255, 255, 0.1),
                          transparent 80%
                        )
                    `,
                }}
            />

            {/* Content Content - Industrial / Minimalist */}
            <div className="h-full flex flex-col p-6 relative z-10 text-zinc-400 font-mono text-sm leading-relaxed">

                {/* Top Section: ID & Category */}
                <div className="flex justify-between items-start border-b border-white/5 pb-4 mb-4">
                    <span className="text-zinc-600 font-bold tracking-tighter text-xs">
                        {(index + 1).toString().padStart(2, '0')} // PROJECT
                    </span>
                    <span className="text-[10px] tracking-widest uppercase text-zinc-500 border border-zinc-800 px-2 rounded-full">
                        {project.category}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-display font-bold text-white mb-2 leading-none group-hover:text-white transition-colors">
                    {project.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-zinc-500 line-clamp-4 text-xs md:text-sm">
                    {project.description}
                </p>

                {/* Bottom Section */}
                <div className="mt-auto pt-4 border-t border-white/5 flex flex-col gap-4">
                    {/* Tech List as raw text or minimal pills */}
                    <div className="flex flex-wrap gap-1">
                        {project.tech.slice(0, 4).map((tech, i) => (
                            <span key={i} className="text-[10px] text-zinc-600 font-mono">
                                [{tech}]
                            </span>
                        ))}
                    </div>

                    {/* Action */}
                    <div className="flex items-center justify-between text-zinc-600 group-hover:text-white transition-colors duration-300">
                        <span className="text-[10px] tracking-widest uppercase">
                            View Project
                        </span>
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProjectCarousel;
