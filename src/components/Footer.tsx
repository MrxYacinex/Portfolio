import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
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
      </div>
    </footer>
  );
};

export default Footer;
