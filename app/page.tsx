"use client";
import {
  About,
  Contact,
  CustomSolutions,
  FAQ,
  FeaturedBlogs,
  Header,
  Hero,
  HowItWorks,
  PastProjects,
  Products,
  Testimonials,
  WhoWeServe,
} from "@/components";
import { useRef } from "react";

export default function Home() {
  const contactRef = useRef(null);
  const aboutRef = useRef(null);
  const faqsRef = useRef(null);

  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <Hero />
      <div ref={aboutRef} id="about">
        <About />
      </div>
      <Products />
      <CustomSolutions />
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
    </div>
  );
}
