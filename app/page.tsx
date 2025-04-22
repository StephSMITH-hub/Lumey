import {
  FeaturedBlogs,
  FloatingCTA,
  Footer,
  Header,
  Hero,
  HowItWorks,
  PastProjects,
  Products,
  Testimonials,
  WhoWeServe,
} from "@/components";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <Hero />
      <Footer />
      <FloatingCTA />
    </div>
  );
}
