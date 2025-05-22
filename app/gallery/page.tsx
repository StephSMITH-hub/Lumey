"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { GalleryHorizontal, GalleryThumbnails, Images } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { FloatingCTA, Footer, Header } from "@/components";

// Define gallery categories and images
const galleryData = {
  pastProjects: [
    {
      id: 1,
      title: "Commercial Solar Installation - Akure",
      description: "10kW solar installation for a commercial building in Akure",
      image: "/images/pastprojects/past 1.png",
      category: "Commercial",
    },
    {
      id: 2,
      title: "Residential Power Solution - Abuja",
      description: "Complete home power solution with battery storage",
      image: "/images/pastprojects/past 2.png",
      category: "Residential",
    },
    {
      id: 3,
      title: "Factory Backup System - Ibadan",
      description:
        "Industrial-grade backup power system for manufacturing facility",
      image: "/images/pastprojects/past 3.png",
      category: "Industrial",
    },
    {
      id: 4,
      title: "Parks and Garden Solar Setup - Akure",
      description: "Educational institution powered by renewable energy",
      image: "/images/pastprojects/past 4.png",
      category: "Commercial",
    },
    // Additional past projects
    {
      id: 5,
      title: "Office Building Solar Array - Port Harcourt",
      description: "Corporate office building with rooftop solar installation",
      image: "/images/products/6500.jpg",
      category: "Commercial",
    },
    {
      id: 6,
      title: "Hospital Backup System - Kano",
      description: "Critical power backup system for healthcare facility",
      image: "/images/products/3300.jpg",
      category: "Healthcare",
    },
  ],
  teamPhotos: [
    {
      id: 1,
      title: "Leadership Team",
      description: "Our executive leadership team",
      image: "/images/products/1200.jpg",
      role: "Executive",
    },
    {
      id: 2,
      title: "Installation Team",
      description: "Our certified installation professionals",
      image: "/images/products/2100.jpg",
      role: "Technical",
    },
    {
      id: 3,
      title: "Customer Service",
      description: "Our dedicated support specialists",
      image: "/images/products/550.jpg",
      role: "Support",
    },
    {
      id: 4,
      title: "Engineering Team",
      description: "The brilliant minds behind our solutions",
      image: "/images/products/6500.jpg",
      role: "Engineering",
    },
  ],
  productPhotos: [
    {
      id: 1,
      title: "Lumey PowerBox 1200",
      description: "Compact and reliable power solution",
      image: "/images/products/1200.jpg",
      productLine: "PowerBox",
    },
    {
      id: 2,
      title: "Lumey PowerBox 2100",
      description: "Mid-range power solution for homes",
      image: "/images/products/2100.jpg",
      productLine: "PowerBox",
    },
    {
      id: 3,
      title: "Lumey PowerBox 3300",
      description: "Advanced power solution for larger homes",
      image: "/images/products/3300.jpg",
      productLine: "PowerBox",
    },
    {
      id: 4,
      title: "Lumey PowerBank 550",
      description: "Portable power solution for on-the-go",
      image: "/images/products/550.jpg",
      productLine: "PowerBank",
    },
    {
      id: 5,
      title: "Lumey PowerStation 6500",
      description: "Commercial-grade power station",
      image: "/images/products/6500.jpg",
      productLine: "PowerStation",
    },
  ],
};

// Gallery Card Component
const GalleryCard = ({ item, index }: { item: any; index: number }) => {
  const isMobile = useIsMobile();

  // Define the motion properties based on mobile status
  const motionProps = isMobile
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: index * 0.1, duration: 0.5 },
      };

  const MotionComponent = isMobile ? "div" : motion.div;

  return (
    <MotionComponent {...motionProps}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
        <div className="relative h-56 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
          <p className="text-gray-600 text-sm">{item.description}</p>
          {item.category && (
            <span className="inline-block bg-lumey-light_yellow text-gray-800 text-xs px-2 py-1 rounded mt-2">
              {item.category}
            </span>
          )}
          {item.role && (
            <span className="inline-block bg-lumey-lightblue text-gray-800 text-xs px-2 py-1 rounded mt-2">
              {item.role}
            </span>
          )}
          {item.productLine && (
            <span className="inline-block bg-lumey-green bg-opacity-20 text-gray-800 text-xs px-2 py-1 rounded mt-2">
              {item.productLine}
            </span>
          )}
        </CardContent>
      </Card>
    </MotionComponent>
  );
};

const Gallery = () => {
  const isMobile = useIsMobile();
  const [activeFilter, setActiveFilter] = useState("all");

  const MotionComponent = isMobile ? "div" : motion.div;

  const motionProps = isMobile
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.5 },
      };

  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <main className="pt-32 pb-12">
        <MotionComponent {...motionProps} className="section-container">
          <div className="text-center mb-12">
            <h1 className="heading-lg mb-4">Lumey Gallery</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our past projects, meet our team, and view our product
              lineup through this visual showcase.
            </p>
          </div>

          <Tabs defaultValue="pastProjects" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-3 w-full max-w-2xl">
                <TabsTrigger
                  onClick={() => setActiveFilter("all")}
                  value="pastProjects"
                  className="flex  data-[state=active]:bg-lumey-yellow items-center gap-2"
                >
                  <GalleryHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">Past Projects</span>
                  <span className="sm:hidden">Projects</span>
                </TabsTrigger>
                <TabsTrigger
                  onClick={() => setActiveFilter("all")}
                  value="teamPhotos"
                  className="flex  data-[state=active]:bg-lumey-yellow items-center gap-2"
                >
                  <Images className="h-4 w-4" />
                  <span className="hidden sm:inline">Team Photos</span>
                  <span className="sm:hidden">Team</span>
                </TabsTrigger>
                <TabsTrigger
                  onClick={() => setActiveFilter("all")}
                  value="productPhotos"
                  className="flex  data-[state=active]:bg-lumey-yellow items-center gap-2"
                >
                  <GalleryThumbnails className="h-4 w-4" />
                  <span className="hidden sm:inline">Product Photos</span>
                  <span className="sm:hidden">Products</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="pastProjects">
              <div className="mb-8">
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  <button
                    onClick={() => setActiveFilter("all")}
                    className={`px-4 py-1 rounded-full text-sm ${
                      activeFilter === "all"
                        ? "bg-lumey-yellow text-gray-800"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveFilter("Commercial")}
                    className={`px-4 py-1 rounded-full text-sm ${
                      activeFilter === "Commercial"
                        ? "bg-lumey-yellow text-gray-800"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    Commercial
                  </button>
                  <button
                    onClick={() => setActiveFilter("Residential")}
                    className={`px-4 py-1 rounded-full text-sm ${
                      activeFilter === "Residential"
                        ? "bg-lumey-yellow text-gray-800"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    Residential
                  </button>
                  <button
                    onClick={() => setActiveFilter("Industrial")}
                    className={`px-4 py-1 rounded-full text-sm ${
                      activeFilter === "Industrial"
                        ? "bg-lumey-yellow text-gray-800"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    Industrial
                  </button>
                  <button
                    onClick={() => setActiveFilter("Educational")}
                    className={`px-4 py-1 rounded-full text-sm ${
                      activeFilter === "Educational"
                        ? "bg-lumey-yellow text-gray-800"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    Educational
                  </button>
                  <button
                    onClick={() => setActiveFilter("Healthcare")}
                    className={`px-4 py-1 rounded-full text-sm ${
                      activeFilter === "Healthcare"
                        ? "bg-lumey-yellow text-gray-800"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    Healthcare
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galleryData.pastProjects
                    .filter(
                      (item) =>
                        activeFilter === "all" || item.category === activeFilter
                    )
                    .map((item, index) => (
                      <GalleryCard key={item.id} item={item} index={index} />
                    ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="teamPhotos">
              <div className="mb-8">
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  <button
                    onClick={() => setActiveFilter("all")}
                    className={`px-4 py-1 rounded-full text-sm ${
                      activeFilter === "all"
                        ? "bg-lumey-lightblue text-gray-800"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveFilter("Executive")}
                    className={`px-4 py-1 rounded-full text-sm ${
                      activeFilter === "Executive"
                        ? "bg-lumey-lightblue text-gray-800"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    Executive
                  </button>
                  <button
                    onClick={() => setActiveFilter("Technical")}
                    className={`px-4 py-1 rounded-full text-sm ${
                      activeFilter === "Technical"
                        ? "bg-lumey-lightblue text-gray-800"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    Technical
                  </button>
                  <button
                    onClick={() => setActiveFilter("Support")}
                    className={`px-4 py-1 rounded-full text-sm ${
                      activeFilter === "Support"
                        ? "bg-lumey-lightblue text-gray-800"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    Support
                  </button>
                  <button
                    onClick={() => setActiveFilter("Engineering")}
                    className={`px-4 py-1 rounded-full text-sm ${
                      activeFilter === "Engineering"
                        ? "bg-lumey-lightblue text-gray-800"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    Engineering
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galleryData.teamPhotos
                    .filter(
                      (item) =>
                        activeFilter === "all" || item.role === activeFilter
                    )
                    .map((item, index) => (
                      <GalleryCard key={item.id} item={item} index={index} />
                    ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="productPhotos">
              <div className="mb-8">
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  <button
                    onClick={() => setActiveFilter("all")}
                    className={`px-4 py-1 rounded-full text-sm ${
                      activeFilter === "all"
                        ? "bg-lumey-green text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveFilter("PowerBox")}
                    className={`px-4 py-1 rounded-full text-sm ${
                      activeFilter === "PowerBox"
                        ? "bg-lumey-green text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    PowerBox
                  </button>
                  <button
                    onClick={() => setActiveFilter("PowerBank")}
                    className={`px-4 py-1 rounded-full text-sm ${
                      activeFilter === "PowerBank"
                        ? "bg-lumey-green text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    PowerBank
                  </button>
                  <button
                    onClick={() => setActiveFilter("PowerStation")}
                    className={`px-4 py-1 rounded-full text-sm ${
                      activeFilter === "PowerStation"
                        ? "bg-lumey-green text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    PowerStation
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galleryData.productPhotos
                    .filter(
                      (item) =>
                        activeFilter === "all" ||
                        item.productLine === activeFilter
                    )
                    .map((item, index) => (
                      <GalleryCard key={item.id} item={item} index={index} />
                    ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </MotionComponent>
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Gallery;
