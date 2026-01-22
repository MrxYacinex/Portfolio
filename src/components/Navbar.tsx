import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const navOpacity = useTransform(scrollY, [0, 100], [0.8, 1]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Update active section based on scroll position
            const sections = ["home", "about", "projects", "skills", "contact"];
            const scrollPosition = window.scrollY + 150; // Offset for navbar

            // Check if user has scrolled to the bottom of the page
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
                setActiveSection("contact");
                return;
            }

            // Check each section to find which one is currently in view
            let currentSection = "home";
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section === "home") {
                    if (window.scrollY < 100) {
                        currentSection = "home";
                        break;
                    }
                } else {
                    const element = document.getElementById(section);
                    if (element) {
                        const elementTop = element.offsetTop;
                        const elementBottom = elementTop + element.offsetHeight;
                        if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
                            currentSection = section;
                            break;
                        }
                    }
                }
            }
            setActiveSection(currentSection);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [mobileMenuOpen]);

    const navItems = [
        { name: "Home", href: "#", id: "home" },
        { name: "About", href: "#about", id: "about" },
        { name: "Projects", href: "#projects", id: "projects" },
        { name: "Skills", href: "#skills", id: "skills" },
        { name: "Contact", href: "#contact", id: "contact" },
    ];

    const handleNavClick = (href: string) => {
        setMobileMenuOpen(false);
        if (href !== '#') {
            const targetId = href.replace('#', '');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const offset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ opacity: navOpacity }}
                className="fixed top-0 left-0 right-0 z-50"
            >
                <div className="container mx-auto px-6 py-6">
                    <motion.div
                        className={`relative transition-all duration-500 ${scrolled || mobileMenuOpen
                            ? "glass rounded-full shadow-2xl shadow-foreground/5 bg-background/60"
                            : "bg-transparent"
                            }`}
                        animate={{
                            paddingTop: scrolled || mobileMenuOpen ? "0.75rem" : "1rem",
                            paddingBottom: scrolled || mobileMenuOpen ? "0.75rem" : "1rem",
                        }}
                    >
                        <div className="flex items-center justify-between px-6 md:px-8">
                            {/* Logo */}
                            <motion.a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick('#');
                                }}
                                className="font-display text-lg font-semibold relative group cursor-hover text-foreground/80 hover:text-foreground transition-colors z-50"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="relative z-10">Yacine Tadjine</span>
                            </motion.a>

                            {/* Desktop Navigation Links */}
                            <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1 bg-background/40 backdrop-blur-sm rounded-full px-2 py-1.5 border border-border/30">
                                {navItems.map((item) => (
                                    <motion.a
                                        key={item.name}
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavClick(item.href);
                                        }}
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
                                    </motion.a>
                                ))}
                            </div>

                            {/* Desktop CTA Button */}
                            <motion.a
                                href="#contact"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick('#contact');
                                }}
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
                                className="md:hidden p-2 text-muted-foreground hover:text-foreground cursor-hover relative z-50"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                <motion.div
                                    animate={mobileMenuOpen ? "open" : "closed"}
                                    initial="closed"
                                >
                                    {mobileMenuOpen ? (
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    ) : (
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    )}
                                </motion.div>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-3xl pt-28 px-6 md:hidden flex flex-col items-center justify-start gap-8"
                    >
                        <div className="flex flex-col items-center gap-6 w-full">
                            {navItems.map((item, i) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavClick(item.href);
                                    }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1 }}
                                    className={`text-2xl font-display font-medium transition-colors ${activeSection === item.id ? "text-foreground" : "text-muted-foreground"
                                        }`}
                                >
                                    {item.name}
                                </motion.a>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="w-full max-w-xs h-[1px] bg-border my-2"
                        />

                        <motion.a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick('#contact');
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="px-8 py-3 bg-foreground text-background text-lg font-semibold rounded-full hover:bg-foreground/90 transition-all flex items-center gap-2"
                        >
                            <span>Get in Touch</span>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;

