import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { name: "Home", href: "#" },
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "Skills", href: "#skills" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-background/80 backdrop-blur-lg border-b border-border/50"
                    : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <motion.a
                        href="#"
                        className="font-display text-2xl font-bold"
                        whileHover={{ scale: 1.05 }}
                    >
                        <span className="text-gradient">YT</span>
                    </motion.a>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {item.name}
                            </motion.a>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <motion.a
                        href="#contact"
                        className="hidden md:block px-6 py-2.5 bg-foreground text-background text-sm font-medium rounded-full hover:bg-foreground/90 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Get in Touch
                    </motion.a>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2 text-muted-foreground hover:text-foreground">
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
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
