"use client";

import React from "react";
import {
  ChevronRight,
  Tag,
  Wrench,
  FileText,
  Check,
  MessageSquare,
  Phone,
} from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import { products } from "@/data/productData";

const formatPrice = (price: any) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
};

export const Products = () => {
  const isMobile = useIsMobile();

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
        transition: { duration: 0.5 },
      };

  const MotionDiv = isMobile ? "div" : motion.div;

  return (
    <section id="products" className="bg-gradient-to-br from-white to-gray-100">
      <div className="section-container">
        <MotionDiv
          {...motionProps}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="heading-md mb-4 font-poppins">Our Products</h2>
          <p className="text-lg text-gray-700">
            From compact home solutions to powerful business-grade energy
            stations, Lumey Powerboxes keep you powered—no matter the situation.
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Link
              href={
                product.id === "custom-solution"
                  ? "#contact"
                  : `/products/${product.id}`
              }
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
                        {product.id !== "custom-solution" && (
                          <span className="text-white/90 text-sm flex items-center gap-1">
                            <Tag size={12} /> Over {product.soldCount} sold
                          </span>
                        )}
                        {product.id === "custom-solution" && (
                          <span className="text-white/90 text-sm flex items-center gap-1">
                            <Wrench size={12} /> Custom Built
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-3">{product.description_home}</p>

                {product.id !== "custom-solution" ? (
                  <>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl font-bold text-lumey-dark">
                        {formatPrice(product.currentPrice)}
                      </span>
                      <span className="text-gray-500 line-through text-sm">
                        {formatPrice(product.originalPrice)}
                      </span>
                    </div>
                    {/* <div className="text-sm text-gray-500 mb-2">
                      <span>{product.panelInfo}</span>
                    </div>
                    <div className="text-sm text-gray-600 italic mb-4">
                      {formatPrice(product.withPanelPrice)} with solar panels
                    </div> */}
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
                  <div className="flex items-center text-lumey-orange hover:text-lumey-yellow transition-colors font-medium">
                    {product.id === "custom-solution"
                      ? "Get Custom Quote"
                      : "Learn more"}
                    <ChevronRight size={16} className="ml-1" />
                  </div>
                </div>
              </MotionDiv>
            </Link>
          ))}
        </div>

        {/* <div className="mt-16 mb-12 border-t-2 border-b-2 border-lumey-yellow/30 py-10">
          <h3 className="heading-sm text-center mb-8">
            Custom Energy Solutions
          </h3>

          <Card className="bg-gradient-to-r from-lumey-yellow/5 to-lumey-orange/5 border-none shadow-xl">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="h-[300px] md:h-auto relative overflow-hidden">
                  <img
                    src={customSolution.image}
                    alt="Custom Energy Solution"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                    <div className="p-8">
                      <Badge className="bg-lumey-yellow text-black mb-4">
                        <Wrench size={14} className="mr-1" />
                        Custom Built
                      </Badge>
                      <h4 className="text-2xl font-bold text-white mb-2">
                        {customSolution.name}
                      </h4>
                      <p className="text-white/80 mb-4">
                        {customSolution.description}
                      </p>
                      <p className="text-white/90 font-medium">
                        {customSolution.specs}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8 flex flex-col justify-center">
                  <h4 className="text-xl font-bold mb-4">
                    Need Something Custom Built?
                  </h4>
                  <p className="mb-6">
                    We design and build custom power solutions to meet specific
                    energy requirements for homes, businesses, and industries.
                  </p>

                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <Check
                        className="text-lumey-green flex-shrink-0 mt-1"
                        size={18}
                      />
                      <span>Tailored to your exact power requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check
                        className="text-lumey-green flex-shrink-0 mt-1"
                        size={18}
                      />
                      <span>Engineered for your specific use case</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check
                        className="text-lumey-green flex-shrink-0 mt-1"
                        size={18}
                      />
                      <span>Professional installation and setup</span>
                    </li>
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                    <a
                      href="#contact"
                      className="button-primary flex items-center justify-center gap-2"
                    >
                      <MessageSquare size={18} />
                      Get Custom Quote
                    </a>
                    <a
                      href="tel:+2348139743177"
                      className="button-secondary flex items-center justify-center gap-2"
                    >
                      <Phone size={18} />
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div> */}

        <div className="mt-12 text-center flex flex-col md:flex-row items-center justify-center gap-4">
          <Link href="/products" className="button-primary">
            View All Products
            <ChevronRight size={18} />
          </Link>

          {/* Commenting out load estimator as requested */}
          {/* <Link to="/load-estimator" className="button-secondary flex items-center">
            <Tag className="mr-2 h-5 w-5" />
            Estimate Your Power Needs
          </Link> */}
        </div>
      </div>
    </section>
  );
};
