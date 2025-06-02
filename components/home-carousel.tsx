import React from "react";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const carouselImages = [
  {
    id: 1,
    image: "/images/hero/hero1.jpg",
    alt: "Revolutionary Solar Technology",
  },
  {
    id: 2,
    image: "/images/hero/hero2.jpg",
    alt: "Zero Fuel, Zero Noise",
  },
  {
    id: 3,
    image: "/images/hero/hero3.jpg",
    alt: "Award-Winning Quality",
  },
  {
    id: 4,
    image: "/images/hero/hero4.jpg",
    alt: "Trusted by Thousands",
  },
];

const HomeCarousel = () => {
  return (
    <section className="w-full">
      <div className="w-full">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="ml-0">
            {carouselImages.map((item, index) => (
              <CarouselItem key={item.id} className="pl-0 basis-full">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="w-full"
                >
                  <div className="w-full h-64 md:h-96 lg:h-[500px] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-4 bg-white/80 border-gray-200 hover:bg-white" />
          <CarouselNext className="right-4 bg-white/80 border-gray-200 hover:bg-white" />
        </Carousel>
      </div>
    </section>
  );
};

export default HomeCarousel;
