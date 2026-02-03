import { useEffect, lazy, Suspense } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";

// Lazy load components below the fold for better initial load performance
const Projects = lazy(() => import("@/components/Projects"));
const LogoBar = lazy(() => import("@/components/LogoBar"));
const Skills = lazy(() => import("@/components/Skills"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

// Simple loading placeholder
const SectionLoader = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground/60 rounded-full animate-spin" />
  </div>
);

const Index = () => {
  const navigate = useNavigate();
  const { hash } = useLocation();

  useEffect(() => {
    // Check if system is offline
    const systemStatus = localStorage.getItem("systemStatus");
    if (systemStatus === "offline") {
      navigate("/404");
    }
  }, [navigate]);

  useEffect(() => {
    if (hash) {
      // Small delay to allow components to mount/suspense to resolve
      const timeout = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const offset = 100; // Match Navbar offset
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 500); // 500ms delay should be enough for initial render + suspense start. 
      // Ideally use a mutation observer but this is simpler.

      // Retry mechanism if 500ms wasn't enough (e.g. slow network for lazy chunk)
      const interval = setInterval(() => {
        const element = document.querySelector(hash);
        if (element) {
          const offset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          clearInterval(interval);
        }
      }, 1000);

      const cleanup = setTimeout(() => clearInterval(interval), 5000); // Stop retrying after 5s

      return () => {
        clearTimeout(timeout);
        clearInterval(interval);
        clearTimeout(cleanup);
      };
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <main id="main-content" role="main">
        <Hero />
        <About />
        <Suspense fallback={<SectionLoader />}>
          <Projects />
          <LogoBar />
          <Skills />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;

