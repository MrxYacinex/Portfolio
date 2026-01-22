import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
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

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: "center",
            skipSnaps: false,
            dragFree: true,
        },
        [
            Autoplay({
                delay: 3000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
            }),
        ]
    );

    const [scrollProgress, setScrollProgress] = useState(0);

    const onScroll = useCallback((api: any) => {
        const progress = Math.max(0, Math.min(1, api.scrollProgress()));
        setScrollProgress(progress);

        // Custom 3D effect logic would go here if we were doing it via React state,
        // but for performance, we might want to let the CSS handle some of it or use the tween approach below.
    }, []);

    const [tweenValues, setTweenValues] = useState<number[]>([]);

    const onScrollTween = useCallback((api: any) => {
        const scrollProgress = api.scrollProgress();
        const styles = api.scrollSnapList().map((scrollSnap: number, index: number) => {
            let diffToTarget = scrollSnap - scrollProgress;
            const slidesInSnap = api.scrollSnapList().length;

            // Handle loop
            if (api.options.loop) {
                if (diffToTarget < -1) diffToTarget += slidesInSnap;
                if (diffToTarget > 1) diffToTarget -= slidesInSnap;
            }
            return diffToTarget;
        });
        setTweenValues(styles);
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        // Add listener for scroll events to update 3D effects
        emblaApi.on("scroll", () => {
            // We can use the engine's internal location to calculate distance from center
            const engine = emblaApi.internalEngine();
            const scrollProgress = emblaApi.scrollProgress();
            const slidesInView = emblaApi.slidesInView();

            // This is a bit complex to do perfectly reactively without re-renders. 
            // A common pattern is to manipulate DOM refs directly here.
            // For simplicity in this first pass, let's try a CSS-based approach 
            // where we set a variable or just standard carousel first, 
            // then layer on the "3D" via a mapped value if possible.

            // Let's rely on the tweenValues approach which triggers re-renders (might be slightly heavy but easiest to implement safely).
            onScrollTween(emblaApi);
        });

        emblaApi.on("reInit", onScrollTween);
        onScrollTween(emblaApi);

    }, [emblaApi, onScrollTween]);

    return (
        <div className="w-full relative py-10 [perspective:1000px]">
            <div className="overflow-hidden px-4" ref={emblaRef}>
                <div className="flex touch-pan-y -ml-4">
                    {projects.map((project, index) => {
                        const tweenValue = tweenValues[index] || 0;
                        const distance = Math.abs(tweenValue);


                        // Calculate 3D styles
                        // Scale drops off as it moves away
                        const scale = Math.max(0.8, 1 - distance * 0.15);

                        // Opacity fades slightly to sides
                        const opacity = 1;

                        // 3D Rotation: Rotate "inwards" towards the center
                        const rotateY = tweenValue * -25;

                        // Blur effect for side items
                        const blur = distance * 4;

                        return (
                            <div
                                key={index}
                                className="pl-4 min-w-0 flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_28%]"
                                style={{
                                    transform: `perspective(1000px) rotateY(${rotateY}deg) scale(${scale})`,
                                    opacity,
                                    filter: `blur(${blur}px)`,
                                    zIndex: Math.round(10 - distance),
                                    transition: "transform 0.1s ease-out, filter 0.1s ease-out",
                                    transformStyle: "preserve-3d",
                                }}
                            >
                                <div style={{ transform: "translateZ(0)" }}>
                                    <ProjectCard project={project} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Gradient Overlays for "Blurry Sides" effect visually */}
            <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        </div>
    );
};

const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <div className="group relative h-full bg-card/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors duration-500">
            {/* Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="p-6 md:p-8 flex flex-col h-full relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                        <span className="text-xs font-medium text-emerald-400 tracking-wider uppercase">
                            {project.category}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                            {project.title}
                        </h3>
                    </div>
                    {project.link !== "#" && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                        >
                            <ExternalLink className="w-5 h-5 text-gray-300" />
                        </a>
                    )}
                </div>

                {project.award && (
                    <div className="flex items-center gap-2 mb-4 text-amber-400 text-sm font-medium">
                        <Trophy className="w-4 h-4" />
                        <span>{project.award}</span>
                    </div>
                )}

                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t, i) => (
                        <span key={i} className="px-3 py-1 text-[10px] uppercase tracking-wider bg-white/5 border border-white/5 rounded-full text-gray-300">
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectCarousel;
