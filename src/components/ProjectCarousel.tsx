import React, { useCallback, useEffect, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Project } from "@/data/projects";

interface ProjectCarouselProps {
    projects: Project[];
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: "center",
            slidesToScroll: 1,
            speed: 8,
        },
        [
            Autoplay({
                delay: 3200,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
            }),
        ]
    );

    // Track which slide is active for scaling / emphasis
    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        };

        emblaApi.on("select", onSelect);
        onSelect();

        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi]);

    const scrollPrev = useCallback(() => {
        if (!emblaApi) return;
        emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (!emblaApi) return;
        emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className="w-full py-12 md:py-20 bg-background overflow-hidden relative">
            {/* Subtle scanline/grid texture overlay */}
            <div
                className="absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                }}
            />

            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

            <div className="relative z-10">
                {/* Navigation buttons - always visible */}
                <button
                    type="button"
                    onClick={scrollPrev}
                    className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 h-12 w-12 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-white/10 hover:bg-background hover:border-white/20 transition-all shadow-lg hover:scale-110"
                    aria-label="Previous project"
                >
                    <ChevronLeft className="w-6 h-6 text-foreground" />
                </button>
                <button
                    type="button"
                    onClick={scrollNext}
                    className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 h-12 w-12 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-white/10 hover:bg-background hover:border-white/20 transition-all shadow-lg hover:scale-110"
                    aria-label="Next project"
                >
                    <ChevronRight className="w-6 h-6 text-foreground" />
                </button>

                {/* Embla viewport */}
                <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
                    {/* Embla container */}
                    <div className="flex gap-6 md:gap-8 px-8 md:px-16">
                        {projects.map((project, index) => (
                            <div
                                key={`${project.slug}-${index}`}
                                className="flex-[0_0_85%] sm:flex-[0_0_65%] md:flex-[0_0_40%] lg:flex-[0_0_32%] min-w-0"
                            >
                                <SpotlightCard
                                    project={project}
                                    index={index}
                                    isActive={index === selectedIndex}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const SpotlightCard = ({
    project,
    index,
    isActive,
}: {
    project: Project;
    index: number;
    isActive: boolean;
}) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{
                opacity: 1,
                y: 0,
                scale: isActive ? 1 : 0.94,
            }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full"
        >
            <Link
                to={`/projects/${project.slug}`}
                className="group relative h-[420px] md:h-[480px] w-full bg-gradient-to-br from-zinc-900/60 via-zinc-900/40 to-zinc-900/60 border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-white/30 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2"
                onMouseMove={handleMouseMove}
            >
                {/* Animated gradient background */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)",
                    }}
                />

                {/* Spotlight Effect */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                              600px circle at ${mouseX}px ${mouseY}px,
                              rgba(255, 255, 255, 0.15),
                              transparent 70%
                            )
                        `,
                    }}
                />

                {/* Content */}
                <div className="h-full flex flex-col p-6 md:p-8 relative z-10">
                    {/* Top Section: ID & Category */}
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-emerald-500/60 font-bold tracking-tighter text-sm font-mono">
                            {(index + 1).toString().padStart(2, "0")} // PROJECT
                        </span>
                        <span className="text-[10px] tracking-widest uppercase text-zinc-400 border border-zinc-700/50 px-3 py-1 rounded-full bg-zinc-800/30 backdrop-blur-sm">
                            {project.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 leading-tight group-hover:text-emerald-400 transition-colors duration-300">
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm md:text-base text-zinc-400 line-clamp-2 leading-relaxed mb-6 flex-grow">
                        {project.description}
                    </p>

                    {/* Bottom Section */}
                    <div className="mt-auto pt-6 border-t border-white/10">
                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tech.slice(0, 4).map((tech, i) => (
                                <span
                                    key={i}
                                    className="text-[11px] text-zinc-500 font-mono px-2 py-1 bg-zinc-800/30 border border-zinc-700/30 rounded"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Action */}
                        <div className="flex items-center justify-between text-zinc-400 group-hover:text-emerald-400 transition-colors duration-300">
                            <span className="text-xs tracking-widest uppercase font-semibold">
                                View Project
                            </span>
                            <motion.div
                                animate={{
                                    x: [0, 4, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProjectCarousel;
