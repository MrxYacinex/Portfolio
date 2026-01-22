import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import LogoBar from "@/components/LogoBar";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <LogoBar />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;

