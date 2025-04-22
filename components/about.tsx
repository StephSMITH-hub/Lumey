"use client"

import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export const About = () => {
  const features = [
    {
      title: "Innovation-Driven",
      description:
        "We continuously enhance our technology for superior efficiency.",
    },
    {
      title: "Affordable & Cost-Saving",
      description: "Save up to 85% on energy costs with our solar generators.",
    },
    {
      title: "Multi-Source Energy",
      description:
        "A variety of energy sources, including NEPA, generators, solar, wind, and more.",
    },
    {
      title: "1-Year Warranty",
      description: "Guaranteed reliability with a full year of coverage.",
    },
    {
      title: "Zero Noise, Zero Fuel",
      description:
        "No more noisy, fuel-guzzling generators—just clean, quiet energy.",
    },
    {
      title: "Long Battery Life",
      description:
        "Advanced lithium-ion and tubular battery technology for extended performance.",
    },
    {
      title: "Custom Solutions",
      description:
        "Need something specific? We build custom solar generators to meet your unique energy demands.",
    },
  ];

  return (
    <section id="about" className="pt-10 bg-gray-50">
      <div className="section-container">
        <h2 className="heading-md">About Us</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden"
          >
            <div className="aspect-video w-full">
              <video
                src="/about.mp4"
                controls
                // poster="/images/hero/hero4.jpg"
                className="w-full h-full object-cover rounded-lg"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <p className="text-lg text-gray-700 p-3 mt-4 bg-white rounded-lg shadow-sm">
              At Lumey Energy, we envision a world where electricity is
              accessible, reliable, and sustainable. To achieve this, we develop
              innovative, high-quality, and affordable alternative energy
              solutions, primarily powered by solar and other renewable sources.
              As Nigeria's leading indigenous solar brand, we specialize in
              manufacturing and sales of Solar Generators, Power Stations, and
              Energy Storage Banks, ensuring clean and uninterrupted power for
              homes, businesses, and industries.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-lumey-dark">
              Why Choose Lumey Energy?
            </h3>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex gap-3"
                >
                  <CheckCircle className="h-6 w-6 text-lumey-green flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <a href="#products" className="button-primary mt-8">
              Learn More About Us
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

