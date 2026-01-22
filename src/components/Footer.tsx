import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const [uptime, setUptime] = useState("99.9%");
  const [lastUpdate, setLastUpdate] = useState("");
  const [systemStatus, setSystemStatus] = useState<"online" | "offline">("online");

  useEffect(() => {
    // Set last update date
    const date = new Date();
    setLastUpdate(date.toISOString().split('T')[0]);
    
    // Check localStorage for system status
    const storedStatus = localStorage.getItem("systemStatus");
    if (storedStatus === "offline") {
      setSystemStatus("offline");
      navigate("/404");
    }
  }, [navigate]);

  const handleSystemClick = () => {
    if (systemStatus === "online") {
      setSystemStatus("offline");
      localStorage.setItem("systemStatus", "offline");
      navigate("/404");
    }
  };

  const isOnline = systemStatus === "online";

  return (
    <footer className="py-12 border-t border-border/30 relative">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-xs text-muted-foreground/50 tracking-wider"
          >
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xs text-muted-foreground/50 tracking-wider"
          >
            Designed & Built with precision
          </motion.p>
        </div>

        {/* Technical Details */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-border/20">
          {/* Left: System Status - Clickable */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-mono text-[10px] text-muted-foreground/60 space-y-1"
          >
            <motion.button
              type="button"
              className="flex items-center gap-2 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:rounded-md focus:px-1 focus:py-1"
              onClick={handleSystemClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`System status: ${isOnline ? 'Online' : 'Offline'}. Click to ${isOnline ? 'deactivate' : 'activate'} system`}
              aria-pressed={!isOnline}
            >
              <motion.div
                className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-500/60' : 'bg-red-500/60'}`}
                animate={isOnline ? {} : { scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span>
                SYSTEM:{" "}
                <span className={isOnline ? "text-emerald-500/60" : "text-red-500/60"} aria-live="polite">
                  {isOnline ? "ONLINE" : "OFFLINE"}
                </span>
              </span>
            </motion.button>
            <div className="pl-4">UPTIME: {uptime}</div>
            <div className="pl-4">
              LATENCY:{" "}
              <span className={isOnline ? "text-emerald-500/60" : "text-red-500/60"}>
                {isOnline ? "12ms" : "TIMEOUT"}
              </span>
            </div>
          </motion.div>

          {/* Right: Version & Update */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-mono text-[10px] text-muted-foreground/60 space-y-1 text-right"
          >
            <div>VER: <span className="text-foreground/70">2.4.0-RC</span></div>
            <div>LAST UPDATE: {lastUpdate}</div>
            <div className="flex items-center justify-end gap-1">
              <span className={isOnline ? "text-emerald-500/60" : "text-red-500/60"}>
                {isOnline ? "DEPLOYED" : "FAILED"}
              </span>
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={isOnline ? "text-emerald-500/60" : "text-red-500/60"}
              >
                |
              </motion.span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
