import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 300 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering] = useState(false);
    const [cursorVariant, setCursorVariant] = useState("default");

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseEnter = () => {
            setIsHovering(true);
            setCursorVariant("hover");
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
            setCursorVariant("default");
        };

        // Add cursor movement
        window.addEventListener("mousemove", moveCursor);

        // Add hover listeners to interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, [role="button"], .cursor-hover'
        );

        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, [cursorX, cursorY]);

    const variants = {
        default: {
            scale: 1,
            mixBlendMode: "difference" as const,
        },
        hover: {
            scale: 1.5,
            mixBlendMode: "difference" as const,
        },
    };

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] hidden md:block"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                variants={variants}
                animate={cursorVariant}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
            />

            {/* Outer cursor ring */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 border-2 border-white/40 rounded-full pointer-events-none z-[9998] hidden md:block"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                    mixBlendMode: "difference",
                }}
                animate={{
                    scale: isHovering ? 2 : 1,
                    opacity: isHovering ? 0.6 : 0.3,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
        </>
    );
};

export default CustomCursor;
