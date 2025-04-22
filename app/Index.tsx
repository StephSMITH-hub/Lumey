
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Products from "../components/Products";
import HowItWorks from "../components/HowItWorks";
import WhoWeServe from "../components/WhoWeServe";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import PastProjects from "../components/PastProjects";
import FloatingCTA from "../components/FloatingCTA";
import FeaturedBlogs from "../components/FeaturedBlogs";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "react-router-dom";

const Index = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const contactRef = useRef(null);
  const aboutRef = useRef(null);
  const faqsRef = useRef(null);
  
  useEffect(() => {
    // Scroll to the top when the page loads
    window.scrollTo(0, 0);
    
    // Check for hash in URL to scroll to specific section
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  }, [location]);

  // Define the container component based on mobile status
  const ContainerComponent = isMobile ? 'div' : motion.div;
  const containerProps = isMobile ? {} : {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="w-full overflow-x-hidden">
      <AnimatePresence mode="wait">
        <ContainerComponent {...containerProps}>
          <Header />
          <main>
            <Hero />
            <div ref={aboutRef} id="about">
              <About />
            </div>
            <Products />
            <HowItWorks />
            <WhoWeServe />
            <Testimonials />
            <PastProjects />
            <FeaturedBlogs />
            <div ref={faqsRef} id="faqs">
              <FAQ />
            </div>
            <div ref={contactRef} id="contact">
              <Contact />
            </div>
          </main>
          <Footer />
          <FloatingCTA />
        </ContainerComponent>
      </AnimatePresence>
    </div>
  );
};

export default Index;
