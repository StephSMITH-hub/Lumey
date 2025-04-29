"use client";

import { CheckCircle2, Factory, Building, Home } from "lucide-react";
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

            <div className="bg-white/50 rounded-lg p-5 border border-lumey-orange/20 shadow-sm">
              <p className="text-lg font-medium text-lumey-dark mb-4">
                Have a desired system in mind? Let's create the magic for you.
              </p>
              <p className="text-lg font-medium text-lumey-dark">
                Have a budget to work with? Let's help you work out a perfect
                energy system within your budget.
              </p>
            </div>

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

        {/* Commercial Subsection */}
        {/* <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h3 className="heading-sm">Commercial Solutions</h3>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mt-4">
              We provide energy solutions for businesses of all sizes, from
              small offices to large industrial setups. Our commercial solutions
              are designed to power filling stations, warehouses, hotels, and
              other business properties.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg"
            >
              <div className="h-64 relative">
                <img
                  src="/images/pastprojects/past 1.png"
                  alt="Filling Station Solar Setup"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h4 className="text-white text-xl font-bold">
                    Filling Stations
                  </h4>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-700">
                  Reliable power solutions for filling stations, ensuring
                  uninterrupted service for your customers 24/7.
                </p>
                <div className="mt-4 flex items-center text-lumey-orange font-medium">
                  <Factory className="mr-2 h-5 w-5" />
                  <span>Industrial Grade Power</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg"
            >
              <div className="h-64 relative">
                <img
                  src="/images/pastprojects/past 2.png"
                  alt="Hotel Solar Setup"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h4 className="text-white text-xl font-bold">
                    Hotels & Hospitality
                  </h4>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-700">
                  Ensure your guests enjoy uninterrupted comfort with our
                  tailored hotel power solutions.
                </p>
                <div className="mt-4 flex items-center text-lumey-orange font-medium">
                  <Building className="mr-2 h-5 w-5" />
                  <span>Hospitality Solutions</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg"
            >
              <div className="h-64 relative">
                <img
                  src="/images/pastprojects/past 3.png"
                  alt="Warehouse Solar Setup"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h4 className="text-white text-xl font-bold">
                    Warehouses & Storage
                  </h4>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-700">
                  Keep your inventory safe with reliable power solutions for
                  warehouses and storage facilities.
                </p>
                <div className="mt-4 flex items-center text-lumey-orange font-medium">
                  <Home className="mr-2 h-5 w-5" />
                  <span>Commercial Power</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="#contact"
              className="button-primary inline-flex items-center justify-center"
            >
              Get Commercial Solutions
            </a>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default CustomSolutions;
