
"use client";

import React from "react";
import { Battery, BatteryCharging, Lightbulb, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <BatteryCharging className="h-8 w-8 text-white" />,
    title: "Charge Your Powerbox",
    description: "Solar panels, grid, or generator charging options.",
    delay: 0,
  },
  {
    icon: <Battery className="h-8 w-8 text-white" />,
    title: "Store Energy Efficiently",
    description: "High-capacity batteries for extended use.",
    delay: 0.2,
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-white" />,
    title: "Power Your Devices",
    description: "Clean energy for home, office, or business.",
    delay: 0.4,
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-gradient-to-br from-lumey-blue/10 via-lumey-lightblue/20 to-lumey-yellow/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-lumey-orange"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-lumey-yellow"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-lumey-green"></div>
      </div>

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="heading-md mb-4 text-lumey-dark">How It Works</h2>
          <p className="text-lg text-gray-700">
            Three simple steps to power your world
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative flex items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: step.delay, duration: 0.5 }}
                className="relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 text-center group hover:scale-105"
              >
                {/* Number Badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-gradient-to-r from-lumey-orange to-lumey-yellow rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>
                </div>

                {/* Icon Container */}
                <div className="w-16 h-16 bg-gradient-to-r from-lumey-orange to-lumey-yellow rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>

                <h3 className="text-lg font-bold mb-2 text-lumey-dark">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </motion.div>

              {/* Connecting Arrow - Hidden on mobile, shown on desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: step.delay + 0.3, duration: 0.5 }}
                    className="bg-white rounded-full p-2 shadow-lg"
                  >
                    <ArrowRight className="w-5 h-5 text-lumey-orange" />
                  </motion.div>
                </div>
              )}
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-12"
        >
          <a href="#products" className="button-primary shadow-xl hover:shadow-2xl">
            Start Your Solar Journey
          </a>
        </motion.div>
      </div>
    </section>
  );
};
