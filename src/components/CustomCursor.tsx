import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Fast spring for the core dot (instant feedback)
    const springConfigDot = { damping: 20, stiffness: 450, mass: 0.5 };
    // Smooth, laggy spring for the trailing ring (elegance)
    const springConfigRing = { damping: 25, stiffness: 200, mass: 0.8 };

    const cursorXSpring = useSpring(cursorX, springConfigDot);
    const cursorYSpring = useSpring(cursorY, springConfigDot);
    const cursorXSpringRing = useSpring(cursorX, springConfigRing);
    const cursorYSpringRing = useSpring(cursorY, springConfigRing);

    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);
        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        // Targeted interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, [role="button"], .cursor-hover, input, textarea, select'
        );

        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Core Cursor (Dot) */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    className="bg-white rounded-full"
                    animate={{
                        width: isHovering ? 8 : 8,
                        height: isHovering ? 8 : 8,
                        scale: isClicking ? 0.8 : 1,
                    }}
                />
            </motion.div>

            {/* Trailing Ring */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block mix-blend-difference"
                style={{
                    x: cursorXSpringRing,
                    y: cursorYSpringRing,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    className="border border-white rounded-full"
                    animate={{
                        width: isHovering ? 64 : 24,
                        height: isHovering ? 64 : 24,
                        opacity: isHovering ? 1 : 0.6,
                        borderWidth: isHovering ? "1px" : "1.5px",
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25
                    }}
                />
            </motion.div>
        </>
    );
};

export default CustomCursor;
