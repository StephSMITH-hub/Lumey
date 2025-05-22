"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const projects = [
  {
    id: 1,
    name: "Commercial Solar Installation",
    location: "Akure, Ondo",
    date: new Date("2024-03-15"),
    image: "/images/pastprojects/past 1.png",
  },
  {
    id: 2,
    name: "Residential Powerbox Setup",
    location: "Abuja, FCT",
    date: new Date("2024-02-22"),
    image: "/images/pastprojects/past 2.png",
  },
  {
    id: 3,
    name: "Factory Backup Power System",
    location: "Ibadan, Oyo",
    date: new Date("2024-01-10"),
    image: "/images/pastprojects/past 3.png",
  },
  {
    id: 4,
    name: "Parks and Garden Solar Setup",
    location: "Akure, Akure",
    date: new Date("2023-12-05"),
    image: "/images/pastprojects/past 4.png",
  },
];

export const PastProjects = () => {
  const isMobile = useIsMobile();

  // Sort projects by date, most recent first
  const sortedProjects = [...projects].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  // Define the motion properties based on mobile status
  const motionProps = isMobile
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
      };

  // Define the item motion properties based on mobile status
  const itemMotionProps = isMobile
    ? {}
    : {
        initial: { opacity: 0, scale: 0.95 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true },
        transition: { duration: 0.5 },
      };

  const MotionDiv = isMobile ? "div" : motion.div;

  return (
    <section id="past-projects" className="bg-gray-50 ">
      <div className="section-container">
        <MotionDiv {...motionProps} className="text-center mb-12">
          <h2 className="heading-md mb-4">Past Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We've successfully completed numerous solar installations across
            Nigeria. Here are some of our recent projects.
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProjects.map((project) => (
            <MotionDiv
              key={project.id}
              {...itemMotionProps}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{project.name}</h3>
                <p className="text-gray-600 mb-1">{project.location}</p>
                <p className="text-gray-500 text-sm">
                  {project.date.toLocaleDateString("en-NG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </MotionDiv>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#contact" className="button-secondary">
            Discuss Your Project <ArrowRight size={16} className="ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
};
