import { useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
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

  useEffect(() => {
    // Check if system is offline
    const systemStatus = localStorage.getItem("systemStatus");
    if (systemStatus === "offline") {
      navigate("/404");
    }
  }, [navigate]);

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

