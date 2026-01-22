import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isScrollingRef = useRef(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { scrollY } = useScroll();
    const navOpacity = useTransform(scrollY, [0, 100], [0.8, 1]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Don't update active section during programmatic scrolling
            if (isScrollingRef.current) {
                return;
            }

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
        
        // Clear any existing timeout
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
        
        // Set target section immediately to prevent jumping
        if (href !== '#') {
            const targetId = href.replace('#', '');
            setActiveSection(targetId);
            isScrollingRef.current = true;
            
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const offset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Re-enable scroll detection after scroll completes
                scrollTimeoutRef.current = setTimeout(() => {
                    isScrollingRef.current = false;
                    // Force update active section after scroll
                    const scrollPosition = window.scrollY + 150;
                    const sections = ["home", "about", "projects", "skills", "contact"];
                    for (let i = sections.length - 1; i >= 0; i--) {
                        const section = sections[i];
                        if (section === "home") {
                            if (window.scrollY < 100) {
                                setActiveSection("home");
                                break;
                            }
                        } else {
                            const element = document.getElementById(section);
                            if (element) {
                                const elementTop = element.offsetTop;
                                const elementBottom = elementTop + element.offsetHeight;
                                if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
                                    setActiveSection(section);
                                    break;
                                }
                            }
                        }
                    }
                }, 1200);
            }
        } else {
            setActiveSection("home");
            isScrollingRef.current = true;
            window.scrollTo({ top: 0, behavior: 'smooth' });
            scrollTimeoutRef.current = setTimeout(() => {
                isScrollingRef.current = false;
            }, 1200);
        }
    };

    // Handle keyboard navigation for mobile menu
    useEffect(() => {
        if (!mobileMenuOpen) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setMobileMenuOpen(false);
            }
        };

        const handleTab = (e: KeyboardEvent) => {
            if (e.key === 'Tab') {
                const menuItems = document.querySelectorAll('[role="menuitem"]');
                const firstItem = menuItems[0] as HTMLElement;
                const lastItem = menuItems[menuItems.length - 1] as HTMLElement;

                if (e.shiftKey && document.activeElement === firstItem) {
                    e.preventDefault();
                    lastItem?.focus();
                } else if (!e.shiftKey && document.activeElement === lastItem) {
                    e.preventDefault();
                    firstItem?.focus();
                }
            }
        };

        window.addEventListener('keydown', handleEscape);
        window.addEventListener('keydown', handleTab);
        return () => {
            window.removeEventListener('keydown', handleEscape);
            window.removeEventListener('keydown', handleTab);
        };
    }, [mobileMenuOpen]);

    return (
        <>
            {/* Skip to main content link for screen readers */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground"
            >
                Skip to main content
            </a>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ opacity: navOpacity }}
                className="fixed top-0 left-0 right-0 z-50"
                role="navigation"
                aria-label="Main navigation"
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
                                className="font-display text-lg font-semibold relative group cursor-hover text-foreground/80 hover:text-foreground transition-colors z-50 focus:outline-none"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                aria-label="Yacine Tadjine - Go to homepage"
                            >
                                <span className="relative z-10">Yacine Tadjine</span>
                            </motion.a>

                            {/* Desktop Navigation Links */}
                            <ul className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-1 bg-background/40 backdrop-blur-sm rounded-full px-2 py-1.5 border border-border/30" role="menubar" aria-label="Main navigation menu">
                                {navItems.map((item) => (
                                    <li key={item.name} role="none">
                                        <motion.a
                                            href={item.href}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleNavClick(item.href);
                                            }}
                                            className="relative px-5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-hover focus:outline-none focus:rounded-full"
                                            whileHover={{ y: -1 }}
                                            whileTap={{ scale: 0.95 }}
                                            role="menuitem"
                                            aria-current={activeSection === item.id ? "page" : undefined}
                                            aria-label={`Navigate to ${item.name} section`}
                                        >
                                            {item.name}
                                            {activeSection === item.id && (
                                                <motion.div
                                                    layoutId="activeSection"
                                                    className="absolute inset-0 bg-foreground/10 rounded-full -z-10 border border-foreground/50"
                                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                                    aria-hidden="true"
                                                    style={{
                                                        borderWidth: '1px'
                                                    }}
                                                />
                                            )}
                                        </motion.a>
                                    </li>
                                ))}
                            </ul>

                            {/* Desktop CTA Button */}
                            <motion.a
                                href="#contact"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick('#contact');
                                }}
                                className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-foreground text-background text-sm font-semibold rounded-full hover:bg-foreground/90 transition-all cursor-hover relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Get in touch - Navigate to contact section"
                            >
                                <span className="relative z-10">Get in Touch</span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: "100%" }}
                                    transition={{ duration: 0.5 }}
                                    aria-hidden="true"
                                />
                                <svg
                                    className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </motion.a>

                            {/* Mobile Menu Button */}
                            <motion.button
                                className="md:hidden p-2 text-muted-foreground hover:text-foreground cursor-hover relative z-50 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:rounded-md"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                                aria-expanded={mobileMenuOpen}
                                aria-controls="mobile-menu"
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
                        id="mobile-menu"
                        role="menu"
                        aria-label="Mobile navigation menu"
                    >
                        <ul className="flex flex-col items-center gap-6 w-full" role="menubar">
                            {navItems.map((item, i) => (
                                <li key={item.name} role="none">
                                    <motion.a
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavClick(item.href);
                                        }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + i * 0.1 }}
                                        className={`text-2xl font-display font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:rounded-md focus:px-2 focus:py-1 ${activeSection === item.id ? "text-foreground" : "text-muted-foreground"
                                            }`}
                                        role="menuitem"
                                        aria-current={activeSection === item.id ? "page" : undefined}
                                        aria-label={`Navigate to ${item.name} section`}
                                    >
                                        {item.name}
                                    </motion.a>
                                </li>
                            ))}
                        </ul>

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
                            className="px-8 py-3 bg-foreground text-background text-lg font-semibold rounded-full hover:bg-foreground/90 transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-background focus:ring-offset-2 focus:ring-offset-foreground"
                            role="menuitem"
                            aria-label="Get in touch - Navigate to contact section"
                        >
                            <span>Get in Touch</span>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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

