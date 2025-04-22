"use client"

import React from "react";
import { Battery, BatteryCharging, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <BatteryCharging className="h-12 w-12 text-lumey-orange" />,
    title: "Charge Your Powerbox",
    description: "Use solar panels, grid electricity, or a backup generator.",
    delay: 0,
  },
  {
    icon: <Battery className="h-12 w-12 text-lumey-orange" />,
    title: "Store Energy Efficiently",
    description: "Our high-capacity batteries store power for extended use.",
    delay: 0.2,
  },
  {
    icon: <Lightbulb className="h-12 w-12 text-lumey-orange" />,
    title: "Power Your Devices",
    description: "Seamless energy for your home, office, or business.",
    delay: 0.4,
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="heading-md mb-4">How It Works</h2>
          <p className="text-lg text-gray-700">
            Simple, efficient, and reliable. Powering your world has never been
            easier.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: step.delay, duration: 0.5 }}
              className="feature-card text-center"
            >
              <div className="rounded-full bg-lumey-yellow/10 w-24 h-24 flex items-center justify-center mx-auto mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">
                <span className="text-lumey-orange mr-2">{index + 1}️⃣</span>
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-12"
        >
          <a href="#products" className="button-primary">
            Start Your Solar Journey
          </a>
        </motion.div>
      </div>
    </section>
  );
};

