"use client";
import React from "react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export const CustomSolutions = () => {
  return (
    <section
      id="custom"
      className="bg-gradient-to-br from-lumey-yellow/10 to-lumey-orange/10 "
    >
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 order-2 lg:order-1"
          >
            <h2 className="heading-md">Need a Custom Solar Solution?</h2>
            <p className="text-lg text-gray-700">
              Got bigger energy needs? Whether it's higher load capacity,
              extended backup time, or faster charging—we've got you covered.
            </p>
            <p className="text-lg text-gray-700">
              At Lumey Energy, we specialize in designing custom-built solar
              generators tailored to your exact requirements. From 3.5kVA to
              over 20kVA, we engineer robust power stations for homes, offices,
              businesses, and industrial setups.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="flex items-start gap-3"
              >
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-lumey-orange" />
                </div>
                <p className="font-medium">Built to your specifications</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-start gap-3"
              >
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-lumey-orange" />
                </div>
                <p className="font-medium">High-efficiency lithium batteries</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex items-start gap-3"
              >
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-lumey-orange" />
                </div>
                <p className="font-medium">Reliable, long-term performance</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex items-start gap-3"
              >
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-lumey-orange" />
                </div>
                <p className="font-medium">
                  Zero fuel. Zero noise. Zero stress.
                </p>
              </motion.div>
            </div>

            <p className="mt-6 font-medium text-center sm:text-left">
              Tell us what you need. We'll build it.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
              <a
                href="#contact"
                className="button-primary inline-flex items-center justify-center"
              >
                Get a Custom Quote
              </a>
              <a
                href="tel:+2348139743177"
                className="button-secondary inline-flex items-center justify-center"
              >
                Call Now
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden shadow-xl h-[400px] lg:h-[580px] order-1 lg:order-2"
          >
            <img
              src="/images/farm.jpg"
              alt="Engineers assembling a high-capacity solar generator"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-lumey-blue/30 to-transparent"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
