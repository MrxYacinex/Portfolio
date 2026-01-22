import { motion } from "framer-motion";

const logos = [
    { name: "ETH Zürich", src: "/logos/eth.png", className: "h-6 md:h-8 invert opacity-80 hover:opacity-100" },
    { name: "TU Berlin", src: "/logos/tub.png", className: "h-6 md:h-8" },
    { name: "HU Berlin", src: "/logos/hu.png", className: "h-10 md:h-12 rounded-full" },
    { name: "ETH Robotics Club", src: "/logos/erc.png", className: "h-8 md:h-10 opacity-80 hover:opacity-100" },
    { name: "CRATER", src: "/logos/crater.png", className: "h-8 md:h-10 hover:opacity-100" },
    { name: "Analytics Club ETH", src: "/logos/ace.png", className: "h-8 md:h-10 hover:opacity-100" },
    { name: "Google Developers", src: "/logos/gdg.png", className: "h-6 md:h-8 opacity-90 hover:opacity-100" },
];

const LogoBar = () => {
    return (
        <section className="py-12 md:py-16 relative overflow-hidden grain">
            <div className="container mx-auto px-6">
                {/* Label */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center text-[10px] uppercase tracking-[0.25em] text-muted-foreground/50 mb-12"
                >
                    Trusted by & Affiliated with
                </motion.p>

                {/* Logo Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-wrap justify-center items-center gap-x-12 gap-y-10 md:gap-x-20"
                >
                    {logos.map((logo, index) => (
                        <motion.div
                            key={logo.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                            className="group relative flex justify-center items-center grayscale hover:grayscale-0 transition-all duration-300"
                        >
                            <img
                                src={logo.src}
                                alt={logo.name}
                                className={`w-auto object-contain transition-all duration-300 ${logo.className}`}
                            />

                            {/* Tooltip */}
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-20">
                                <span className="text-[10px] text-muted-foreground/70 bg-background/90 border border-white/10 px-2 py-1 rounded backdrop-blur-md">
                                    {logo.name}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default LogoBar;
