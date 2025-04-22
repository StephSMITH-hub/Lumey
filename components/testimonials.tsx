"use client"

import React from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const testimonials = [
  {
    name: "Chinedu",
    role: "Business Owner",
    content:
      "Lumey Powerboxes changed my business! No more fuel costs, no more noise. Just pure, reliable power!",
    image: "/images/testimonials/business.png",
  },
  {
    name: "Amina",
    role: "Student",
    content:
      "Perfect for my home! I can charge my laptop, phone, and even my fan without worrying about blackouts.",
    image: "/images/testimonials/student.png",
  },
  {
    name: "Ibrahim",
    role: "Remote Worker",
    content:
      "As someone who works from home, consistent power is essential. My Lumey Powerbox has been a game-changer for my productivity.",
    image: "/images/testimonials/remote.png",
  },
];

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const isMobile = useIsMobile();

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section id="testimonials" className="">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="heading-md mb-4">Testimonials</h2>
          <p className="text-lg text-gray-700">
            Don't just take our word for it. Here's what our customers have to
            say.
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <div className="flex items-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 fill-lumey-yellow text-lumey-yellow"
                            />
                          ))}
                        </div>

                        <p className="text-lg mb-4 italic">
                          "{testimonial.content}"
                        </p>

                        <div>
                          <h4 className="font-bold">{testimonial.name}</h4>
                          <p className="text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-3 shadow-md hover:bg-gray-50 transition-colors -ml-6 hidden md:block"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-3 shadow-md hover:bg-gray-50 transition-colors -mr-6 hidden md:block"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Pagination Dots */}
        <div className="flex justify-center mt-6 md:hidden">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-3 rounded-full mx-1 transition-all ${
                index === activeIndex
                  ? "w-8 bg-lumey-orange"
                  : "w-3 bg-gray-300"
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

        {/* <div className="text-center mt-12">
          <a href="#contact" className="button-primary">
            See More Reviews
          </a>
        </div> */}
      </div>
    </section>
  );
};

