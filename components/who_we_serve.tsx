"use client"

import React from "react";
import { Home, Users, Building, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const audiences = [
  {
    icon: <Home className="h-10 w-10 text-lumey-yellow" />,
    title: "Households",
    description: "Reliable backup power for daily essentials.",
    delay: 0.1,
  },
  {
    icon: <Users className="h-10 w-10 text-lumey-yellow" />,
    title: "Students & Remote Workers",
    description: "Stay powered through your tasks without interruptions.",
    delay: 0.2,
  },
  {
    icon: <Building className="h-10 w-10 text-lumey-yellow" />,
    title: "Businesses & Offices",
    description: "Sustainable energy for uninterrupted workflow.",
    delay: 0.3,
  },
  {
    icon: <ShoppingBag className="h-10 w-10 text-lumey-yellow" />,
    title: "Shops & SMEs",
    description: "Keep your business running, no matter the power situation.",
    delay: 0.4,
  },
];

export const WhoWeServe = () => {
  return (
    <section id="who-we-serve" className=" bg-gray-50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="heading-md mb-4">Who We Serve</h2>
          <p className="text-lg text-gray-700">
            Whether you're a homeowner, student, business owner, or remote
            worker, Lumey Energy has the perfect power solution for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {audiences.map((audience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: audience.delay, duration: 0.5 }}
              className="feature-card"
            >
              <div className="mb-4">{audience.icon}</div>
              <h3 className="text-xl font-bold mb-2">{audience.title}</h3>
              <p className="text-gray-600">{audience.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/3">
                <img
                  src="/images/consultant.jpg"
                  alt="A family using Lumey Powerbox at home"
                  className="rounded-lg w-full h-64 object-cover"
                />
              </div>

              <div className="w-full md:w-2/3">
                <h3 className="text-2xl font-bold mb-4">
                  Find Your Perfect Power Solution
                </h3>
                <p className="text-gray-700 mb-6">
                  Our team of experts will help you identify the right Lumey
                  Powerbox for your specific needs. Whether you need power for
                  your home during outages, your small business, or for outdoor
                  activities, we have the perfect solution for you.
                </p>
                <a href="#products" className="button-primary">
                  Find Your Perfect Power Solution
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

