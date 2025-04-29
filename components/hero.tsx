"use client";

import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const heroSlides = [
  {
    title: "Welcome to Lumey Energy",
    description: `Home to Nigeria\`s No 1 Indigenous Solar solutions Provider.`,
    description2: `Solar Generators | Power stations | Energy storage banks`,
    image: "/images/hero/banner.png",
    tag: "Welcome",
    isWelcomeSlide: true,
  },
  {
    title: "Affordable, Reliable, Long-lasting.",
    description:
      "Say goodbye to fuel, noise, and unreliable power. With Lumey Powerboxes, you get pure, sustainable energy whenever and wherever you need it.",
    image: "/images/hero/hero1.jpg",
    tag: "Reliable Power",
  },
  {
    title: "Clean Energy, Any Time, Anywhere.",
    description:
      "Portable solar solutions that power your life whether at home, work, or on the go. Experience the freedom of clean energy.",
    image: "/images/hero/hero2.jpg",
    tag: "Sustainable Power",
  },
  {
    title: "Invest Once. Save Forever.",
    description:
      "Eliminate monthly fuel costs and enjoy years of reliable power. Lumey Powerboxes pay for themselves in months.",
    image: "/images/hero/hero3.jpg",
    tag: "Cost Effective",
  },
];

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nextSlide, setNextSlide] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const preloadImages = async () => {
      const promises = heroSlides.map((slide) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = slide.image;
          img.onload = () => resolve(true);
        });
      });

      await Promise.all(promises);
      setImagesLoaded(true);
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const interval = setInterval(() => {
      const next = (currentSlide + 1) % heroSlides.length;
      setNextSlide(next);
      setTransitioning(true);

      setTimeout(() => {
        setCurrentSlide(next);
        setTransitioning(false);
      }, 1000);
    }, 10000);

    return () => clearInterval(interval);
  }, [currentSlide, imagesLoaded]);

  return (
    <section
      id="home"
      className="pt-28 md:pt-32 lg:pt-36 lg:min-h-screen h-fit flex items-center relative"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/85 z-10" />

        <motion.div
          key={`current-${currentSlide}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: transitioning ? 0 : 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={heroSlides[currentSlide].image}
            alt={`Hero background ${currentSlide + 1}`}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {transitioning && (
          <motion.div
            key={`next-${nextSlide}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: transitioning ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={heroSlides[nextSlide].image}
              alt={`Hero background ${nextSlide + 1}`}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        )}
      </div>

      <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left text-white col-span-1 lg:col-span-2"
          >
            {heroSlides[currentSlide].isWelcomeSlide ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className=""
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="inline-block bg-lumey-yellow/70 text-lumey-dark px-4 py-1 rounded-full mb-4 font-medium text-sm"
                >
                  {heroSlides[currentSlide].tag}
                </motion.span>

                <h1 className="heading-lg mb-6 font-poppins text-white">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`title-${currentSlide}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-left md:text-center"
                    >
                      {heroSlides[currentSlide].title
                        .split(" ")
                        .map((word, index) => (
                          <span
                            key={index}
                            className={`
                            ${index % 3 === 2 ? "text-lumey-yellow " : ""}
                            ${index % 3 === 0 ? "text-white " : ""}
                          `}
                          >
                            {word}{" "}
                          </span>
                        ))}
                    </motion.span>
                  </AnimatePresence>
                </h1>

                {heroSlides[currentSlide].description && (
                  <motion.p
                    key={`desc-${currentSlide}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-md md:text-xl text-white/90 mb-8 "
                  >
                    <span>{heroSlides[currentSlide].description}</span> <br />
                    <span className="text-lumey-orange">
                      {heroSlides[currentSlide].description2}
                    </span>
                  </motion.p>
                )}

                <div className="flex flex-col sm:flex-row gap-4 w-fit mx-auto lg:mx-0">
                  <Link href="/products" className="button-primary">
                    Explore Our Products
                    <ChevronRight size={18} />
                  </Link>
                </div>
              </motion.div>
            ) : (
              <>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="inline-block bg-lumey-yellow/70 text-lumey-dark px-4 py-1 rounded-full mb-4 font-medium text-sm"
                >
                  {heroSlides[currentSlide].tag}
                </motion.span>

                <h1 className="heading-lg mb-6 font-poppins text-white">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`title-${currentSlide}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="block"
                    >
                      {heroSlides[currentSlide].title
                        .split(" ")
                        .map((word, index) => (
                          <span
                            key={index}
                            className={`
                            ${index % 3 === 0 ? "text-lumey-yellow " : ""}
                            ${index % 3 === 1 ? "text-white " : ""}
                          `}
                          >
                            {word}{" "}
                          </span>
                        ))}
                    </motion.span>
                  </AnimatePresence>
                </h1>

                {heroSlides[currentSlide].description && (
                  <motion.p
                    key={`desc-${currentSlide}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-md md:text-xl text-white/90 mb-8"
                  >
                    {heroSlides[currentSlide].description}
                  </motion.p>
                )}

                <div className="flex flex-col sm:flex-row gap-4 w-fit mx-auto lg:mx-0">
                  <Link href="/products" className="button-primary">
                    Explore Our Products
                    <ChevronRight size={18} />
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute -bottom-12 left-0 right-0 flex justify-center z-10">
        <div className="flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "w-8 bg-lumey-orange"
                  : "w-3 bg-gray-300"
              }`}
              onClick={() => {
                setNextSlide(index);
                setTransitioning(true);
                setTimeout(() => {
                  setCurrentSlide(index);
                  setTransitioning(false);
                }, 500);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
