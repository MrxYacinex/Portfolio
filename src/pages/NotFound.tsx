import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [errorCode, setErrorCode] = useState("404");
  const [errorMessages] = useState([
    "SYSTEM FAILURE DETECTED",
    "ROUTE NOT FOUND",
    "CONNECTION TERMINATED",
    "ACCESS DENIED",
  ]);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Custom cursor position
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    
    // Cycle through error messages
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % errorMessages.length);
    }, 2000);

    // Track mouse position for custom cursor
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [location.pathname, errorMessages.length, cursorX, cursorY]);

  const handleRestore = () => {
    // Restore system status
    localStorage.setItem("systemStatus", "online");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden grain cursor-none">
      {/* Custom Red Pixel X Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {/* Pixel X - Red */}
        <div className="relative">
          {/* X shape made of pixels */}
          <div className="grid grid-cols-3 gap-0 w-6 h-6">
            {/* Top row */}
            <div className="w-2 h-2 bg-red-500" />
            <div className="w-2 h-2" />
            <div className="w-2 h-2 bg-red-500" />
            {/* Middle row */}
            <div className="w-2 h-2" />
            <div className="w-2 h-2 bg-red-500" />
            <div className="w-2 h-2" />
            {/* Bottom row */}
            <div className="w-2 h-2 bg-red-500" />
            <div className="w-2 h-2" />
            <div className="w-2 h-2 bg-red-500" />
          </div>
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-red-500/30 blur-sm -z-10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>

      {/* Error scanlines effect */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,0,0.1) 2px, rgba(255,0,0,0.1) 4px)",
        }} />
      </div>

      <div className="text-center relative z-10 px-6">
        {/* Error Code */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 font-mono text-8xl md:text-9xl font-bold text-red-500/80"
        >
          {errorCode}
        </motion.h1>

        {/* Error Message */}
        <motion.div
          key={currentMessage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-8"
        >
          <p className="font-mono text-lg md:text-xl text-red-500/60 uppercase tracking-widest mb-4">
            {errorMessages[currentMessage]}
          </p>
          <p className="text-muted-foreground/70 text-sm md:text-base">
            System offline. Route not accessible.
          </p>
        </motion.div>

        {/* System Status */}
        <div className="mb-8 font-mono text-xs text-muted-foreground/60 space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>SYSTEM: <span className="text-red-500">OFFLINE</span></span>
          </div>
          <div>STATUS: CRITICAL FAILURE</div>
          <div>ERROR CODE: {errorCode}</div>
        </div>

        {/* System Restart Button - Terminal Style */}
        <motion.button
          onClick={handleRestore}
          className="relative px-6 py-3 bg-background/90 backdrop-blur-sm border border-emerald-500/30 hover:border-emerald-500/50 font-mono text-xs text-emerald-500/80 rounded transition-all group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Terminal prompt style */}
          <div className="flex items-center gap-2">
            <span className="text-emerald-500/60">$</span>
            <span className="text-foreground/70">sudo</span>
            <span className="text-emerald-500/70">systemctl</span>
            <span className="text-muted-foreground/60">restart</span>
            <span className="text-foreground/70">system</span>
          </div>
          
          {/* Hover indicator */}
          <motion.div
            className="absolute inset-0 border border-emerald-500/20 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            initial={false}
          />
        </motion.button>
      </div>
    </div>
  );
};

export default NotFound;
