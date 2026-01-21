import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const { scrollY } = useScroll();
    const navOpacity = useTransform(scrollY, [0, 100], [0.8, 1]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Update active section based on scroll position
            const sections = ["home", "about", "projects", "skills", "contact"];
            const current = sections.find(section => {
                const element = document.getElementById(section === "home" ? "" : section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { name: "Home", href: "#", id: "home" },
        { name: "About", href: "#about", id: "about" },
        { name: "Projects", href: "#projects", id: "projects" },
        { name: "Skills", href: "#skills", id: "skills" },
        { name: "Contact", href: "#contact", id: "contact" },
    ];

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ opacity: navOpacity }}
            className="fixed top-0 left-0 right-0 z-50"
        >
            <div className="container mx-auto px-6 py-6">
                <motion.div
                    className={`relative transition-all duration-500 ${scrolled
                            ? "glass rounded-full shadow-2xl shadow-foreground/5"
                            : "bg-transparent"
                        }`}
                    animate={{
                        paddingTop: scrolled ? "0.75rem" : "1rem",
                        paddingBottom: scrolled ? "0.75rem" : "1rem",
                    }}
                >
                    <div className="flex items-center justify-between px-8">
                        {/* Logo */}
                        <motion.a
                            href="#"
                            className="font-display text-2xl font-bold relative group cursor-hover"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="relative z-10 text-gradient">YT</span>
                            <motion.div
                                className="absolute -inset-2 bg-foreground/5 rounded-lg -z-10"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileHover={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2 }}
                            />
                        </motion.a>

                        {/* Centered Navigation Links */}
                        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1 bg-background/40 backdrop-blur-sm rounded-full px-2 py-1.5 border border-border/30">
                            {navItems.map((item) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    className="relative px-5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-hover"
                                    whileHover={{ y: -1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {item.name}
                                    {activeSection === item.id && (
                                        <motion.div
                                            layoutId="activeSection"
                                            className="absolute inset-0 bg-foreground/10 rounded-full -z-10"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    {activeSection === item.id && (
                                        <motion.div
                                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-foreground rounded-full"
                                            layoutId="activeDot"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </motion.a>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <motion.a
                            href="#contact"
                            className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-foreground text-background text-sm font-semibold rounded-full hover:bg-foreground/90 transition-all cursor-hover relative overflow-hidden group"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="relative z-10">Get in Touch</span>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.5 }}
                            />
                            <svg
                                className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </motion.a>

                        {/* Mobile Menu Button */}
                        <motion.button
                            className="md:hidden p-2 text-muted-foreground hover:text-foreground cursor-hover"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </motion.nav>
    );
};

export default Navbar;

