"use client";
import React, { act, useState } from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomSolutions from "./custom_solutions";
import Link from "next/link";
import { cn } from "@/lib/utils";

const homeProducts = [
  {
    id: "powerbox-550",
    name: "Lumey Powerbox 550",
    specs: "400W | 550Wh",
    description: "Ideal for small home and office use.",
    image: "/images/products/550.jpg",
    originalPrice: 250000,
    currentPrice: 220000,
    withPanelPrice: 270000,
    completePackagePrice: 335000,
    soldCount: 150,
    panelInfo: "1 x 300W panel (36V Mono)",
  },
  {
    id: "powerbox-1200",
    name: "Lumey Powerbox 1200",
    specs: "800W | 1200Wh",
    description: "Perfect for extended power backup.",
    image: "/images/products/1200.jpg",
    originalPrice: 350000,
    currentPrice: 320000,
    withPanelPrice: 420000,
    completePackagePrice: 525000,
    soldCount: 213,
    panelInfo: "2 x 300W panels (36V Mono)",
  },
  {
    id: "powerbox-2100",
    name: "Lumey Powerbox 2100",
    specs: "1500W | 2100Wh",
    description: "Reliable for home appliances and business tools.",
    image: "/images/products/2100.jpg",
    originalPrice: 535000,
    currentPrice: 500000,
    withPanelPrice: 650000,
    completePackagePrice: 775000,
    soldCount: 189,
    panelInfo: "3 x 300W panels (36V Mono)",
  },
  {
    id: "powerbox-3300",
    name: "Lumey Powerbox 3300",
    specs: "1500W | 3300Wh",
    description: "Advanced energy for business and industrial use.",
    image: "/images/products/3300.jpg",
    originalPrice: 860000,
    currentPrice: 820000,
    withPanelPrice: 1120000,
    completePackagePrice: 1265000,
    soldCount: 142,
    panelInfo: "4 x 300W panels (36V Mono)",
  },
  {
    id: "powerbox-6500",
    name: "Lumey Powerbox 6500",
    specs: "3500W | 6500Wh",
    description: "Heavy-duty power for larger energy needs.",
    image: "/images/products/6500.jpg",
    originalPrice: 1550000,
    currentPrice: 1500000,
    withPanelPrice: 2100000,
    completePackagePrice: 2290000,
    soldCount: 97,
    panelInfo: "6 x 300W panels (36V Mono)",
  },
];

const commercialProducts = [
  {
    id: "commercial-hotel",
    name: "Hotel Power Solution",
    specs: "15kVA - 50kVA",
    description: "Complete power systems for hotels of all sizes.",
    image: "/images/pastprojects/past 2.png",
    category: "Commercial",
    custom: true,
  },
  {
    id: "commercial-filling-station",
    name: "Filling Station System",
    specs: "10kVA - 30kVA",
    description: "Reliable 24/7 power for filling stations and gas plants.",
    image: "/images/pastprojects/past 1.png",
    category: "Commercial",
    custom: true,
  },
  {
    id: "commercial-warehouse",
    name: "Warehouse Power",
    specs: "10kVA - 100kVA+",
    description: "Industrial-grade power for warehouses and manufacturing.",
    image: "/images/pastprojects/past 3.png",
    category: "Commercial",
    custom: true,
  },
];

const formatPrice = (price: number | bigint) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
};

export const TabProducts = () => {
  const [activeTab, setActiveTab] = useState("homes");
  const isMobile = useIsMobile();

  const handleTabChange = (value: React.SetStateAction<string>) => {
    setActiveTab(value);
  };

  const motionProps = isMobile
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
      };

  const itemMotionProps = isMobile
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
      };

  const MotionDiv = isMobile ? "div" : motion.div;

  const renderProduct = (
    product: {
      id: any;
      name: any;
      specs: any;
      description: any;
      image: any;
      originalPrice?: any;
      currentPrice?: any;
      withPanelPrice?: any;
      completePackagePrice?: number;
      soldCount?: any;
      panelInfo?: any;
      category?: string;
      custom?: any;
    },
    index: number
  ) => (
    <Link
      href={product.custom ? "#contact" : `/products/${product.id}`}
      key={product.id}
    >
      <MotionDiv
        {...(isMobile
          ? {}
          : {
              ...itemMotionProps,
              transition: { delay: index * 0.1, duration: 0.5 },
            })}
        className="product-card h-full hover:shadow-2xl border-2 hover:border-lumey-yellow"
      >
        <div className="relative h-80 mb-4 rounded-lg overflow-hidden group">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-4 text-white w-full">
              <div className="flex justify-between items-center w-full">
                <p className="text-sm font-medium bg-lumey-yellow text-black inline-block px-3 py-1 rounded-full">
                  {product.specs}
                </p>
                {!product.custom && (
                  <span className="text-white/90 text-sm flex items-center gap-1">
                    <span className="w-3 h-3">⭐</span> Over {product.soldCount}{" "}
                    sold
                  </span>
                )}
                {product.custom && (
                  <span className="text-white/90 text-sm flex items-center gap-1">
                    <span className="w-3 h-3">⚙️</span> Custom Built
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-3">{product.description}</p>

        {!product.custom ? (
          <>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl font-bold text-lumey-dark">
                {formatPrice(product.currentPrice)}
              </span>
              <span className="text-gray-500 line-through text-sm">
                {formatPrice(product.originalPrice)}
              </span>
            </div>
            <div className="text-sm text-gray-500 mb-2">
              <span>{product.panelInfo}</span>
            </div>
            <div className="text-sm text-gray-600 italic mb-4">
              {formatPrice(product.withPanelPrice)} with solar panels
            </div>
          </>
        ) : (
          <div className="mb-4">
            <span className="text-lg font-semibold text-lumey-orange">
              Custom Quote
            </span>
            <p className="text-sm text-gray-600 mt-1">
              Tailored pricing based on your requirements
            </p>
          </div>
        )}

        <div className="mt-auto pt-4">
          <Link
            href={product.custom ? "#contact" : `/products/${product.id}`}
            className="flex items-center text-lumey-orange hover:text-lumey-yellow transition-colors font-medium"
          >
            {product.custom ? "Get Custom Quote" : "Learn more"}
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </MotionDiv>
    </Link>
  );

  return (
    <section id="products" className="bg-gradient-to-br from-white to-gray-100">
      <div className="section-container">
        <MotionDiv
          {...motionProps}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="heading-md mb-4 font-poppins">Our Products</h2>
          <p className="text-lg text-gray-700">
            From compact home solutions to powerful business-grade energy
            stations, Lumey Powerboxes keep you powered—no matter the situation.
          </p>
        </MotionDiv>

        <Tabs
          defaultValue="homes"
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="flex md:flex-col flex-row justify-center mb-8">
            <TabsList className="bg-gray-100 w-full p-1 flex md:flex-row flex-col">
              <TabsTrigger
                value="homes"
                className="px-6 px- py-2 w-full data-[state=active]:bg-lumey-yellow data-[state=active]:text-lumey-dark data-[state=active]:shadow-md"
              >
                Homes & Businesses
              </TabsTrigger>
              <TabsTrigger
                value="commercial"
                className="px-6 px- py-2 w-full data-[state=active]:bg-lumey-yellow data-[state=active]:text-lumey-dark data-[state=active]:shadow-md"
              >
                Commercial
              </TabsTrigger>
              <TabsTrigger
                value="custom"
                className="px-6 px- py-2 w-full data-[state=active]:bg-lumey-yellow data-[state=active]:text-lumey-dark data-[state=active]:shadow-md"
              >
                Custom Solutions
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="homes" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {homeProducts.map((product, index) =>
                renderProduct(product, index)
              )}
            </div>

            <div className="mt-12 text-center">
              <Link href="/products" className="button-primary">
                View All Products
                <ChevronRight size={18} />
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="commercial" className="mt-0 flex flex-col">
            <div className="">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  We provide energy solutions for businesses of all sizes, from
                  small offices to large industrial setups. Our commercial
                  solutions are designed to power filling stations, warehouses,
                  hotels, and other business properties.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {commercialProducts.map((product, index) =>
                  renderProduct(product, index)
                )}
              </div>
            </div>

            <div className="mt-6 text-center">
              <a href="#contact" className="button-primary">
                Get Commercial Quote
                <ChevronRight size={18} />
              </a>
            </div>
          </TabsContent>

          <TabsContent value="custom" className="mt-0">
            <CustomSolutions />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TabProducts;
