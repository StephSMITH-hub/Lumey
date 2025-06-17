
"use client";

import React from "react";
import { Home, Users, Building, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const audiences = [
  {
    icon: <Home className="h-8 w-8 text-lumey-yellow" />,
    title: "Households",
    description: "Backup power for daily essentials",
    delay: 0.1,
  },
  {
    icon: <Users className="h-8 w-8 text-lumey-yellow" />,
    title: "Students & Remote Workers",
    description: "Uninterrupted power for productivity",
    delay: 0.2,
  },
  {
    icon: <Building className="h-8 w-8 text-lumey-yellow" />,
    title: "Businesses & Offices",
    description: "Sustainable workflow continuity",
    delay: 0.3,
  },
  {
    icon: <ShoppingBag className="h-8 w-8 text-lumey-yellow" />,
    title: "Shops & SMEs",
    description: "Reliable business operations",
    delay: 0.4,
  },
];

export const WhoWeServe = () => {
  return (
    <section id="who-we-serve" className="bg-gradient-to-r from-gray-50 via-white to-gray-50 relative">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-lumey-yellow/10 rounded-full"></div>
        <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-lumey-orange/10 rounded-full"></div>
      </div>

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="heading-md mb-4 text-lumey-dark">Who We Serve</h2>
          <p className="text-lg text-gray-700">
            Perfect power solutions for every lifestyle and business
          </p>
        </motion.div>

        {/* Horizontal Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {audiences.map((audience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: audience.delay, duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-lumey-yellow/50 group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-lumey-orange/10 to-lumey-yellow/10 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  {audience.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1 text-lumey-dark">{audience.title}</h3>
                  <p className="text-gray-600 text-sm">{audience.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compact CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-gradient-to-r from-lumey-yellow/10 via-white to-lumey-orange/10 rounded-2xl p-8 border border-lumey-yellow/20 shadow-xl"
        >
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="w-full lg:w-1/3">
              <img
                src="/images/consultant.jpg"
                alt="Power solution consultant"
                className="rounded-xl w-full h-48 object-cover shadow-lg"
              />
            </div>

            <div className="w-full lg:w-2/3 text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-3 text-lumey-dark">
                Find Your Perfect Power Solution
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Expert guidance to match your energy needs. From homes to businesses, 
                we deliver the right power solution for your lifestyle.
              </p>
              <a href="#products" className="button-primary shadow-lg hover:shadow-xl">
                Get Your Solution
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
