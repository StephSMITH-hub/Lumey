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
    image:
      "https://res.cloudinary.com/dwruvre6o/image/upload/v1748875399/LEH_2982_ckwrgk.jpg",
    alt: "Revolutionary Solar Technology",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dwruvre6o/image/upload/v1748875393/LEH_2779_y0osbw.jpg",
    alt: "Zero Fuel, Zero Noise",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dwruvre6o/image/upload/v1748875392/LEH_2783_ca6umc.jpg",
    alt: "Award-Winning Quality",
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/dwruvre6o/image/upload/v1748875390/LEH_2769_ohmsvw.jpg",
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
                  <div className="w-full h-64 md:h-[500px] lg:h-[620px] overflow-hidden">
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
