"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Check,
  Phone,
  MessageSquare,
  Wrench,
  Zap,
  Shield,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatPrice } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductsTable } from "@/components";
import Link from "next/link";
import { useParams } from "next/navigation";
import { products } from "@/data/productData";

const formatNumber = (num: number) => {
  return num.toLocaleString("en-NG");
};

const page = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const { productId } = useParams();
  const [currentProduct, setCurrentProduct] = useState(products[0]);
  const isMobile = useIsMobile();

  const getMotionProps = (initial: {
    initial:
      | { opacity: number }
      | { opacity: number }
      | { opacity: number; y: number }
      | { opacity: number; y: number };
    animate:
      | { opacity: number }
      | { opacity: number }
      | { opacity: number; y: number }
      | { opacity: number; y: number };
    exit?: { opacity: number };
    transition:
      | { duration: number }
      | { duration: number }
      | { duration: number }
      | { duration: number; delay: number };
    key?: number;
  }) => {
    return isMobile ? {} : initial;
  };

  console.log(productId);
  console.log(useParams());
  useEffect(() => {
    window.scrollTo(0, 0);

    if (productId) {
      const foundProduct = products.find((p) => p.id === productId);
      if (foundProduct) {
        setCurrentProduct(foundProduct);
      }
    }
  }, [productId]);

  const isProductDetail = productId && products.find((p) => p.id === productId);

  const nextImage = () => {
    if (currentProduct.images.length > 0) {
      setImageIndex((prev) => (prev + 1) % (currentProduct.images.length + 1));
    }
  };

  const prevImage = () => {
    if (currentProduct.images.length > 0) {
      setImageIndex(
        (prev) =>
          (prev - 1 + (currentProduct.images.length + 1)) %
          (currentProduct.images.length + 1)
      );
    }
  };

  const currentImage =
    imageIndex === 0
      ? currentProduct.mainImage
      : currentProduct.images[imageIndex - 1];

  const MotionDiv = isMobile ? "div" : motion.div;

  return (
    <div className="pt-[120px]">
      <div className="bg-gray-50 py-4 my-3  ">
        <div className="container mx-auto px-4 md:mt-[20px] mt-[10px]">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-lumey-orange">
              Home
            </Link>
            <ChevronRight size={12} className="mx-2" />
            <Link href="/products" className="hover:text-lumey-orange">
              Products
            </Link>
            {isProductDetail && (
              <>
                <ChevronRight size={12} className="mx-2" />
                <span className="font-semibold">{currentProduct.name}</span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="section-container py-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="relative">
            <MotionDiv
              {...getMotionProps({
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                key: imageIndex,
                transition: { duration: 0.5 },
              })}
              className="aspect-square bg-white rounded-lg overflow-hidden border border-gray-200"
            >
              <img
                src={currentImage}
                alt={currentProduct.name}
                className="w-full h-full object-contain p-4"
              />
            </MotionDiv>

            <div className="flex justify-center mt-4 space-x-2">
              <button
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
                onClick={prevImage}
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex space-x-2 items-center">
                <button
                  onClick={() => setImageIndex(0)}
                  className={`h-3 w-3 rounded-full ${
                    imageIndex === 0 ? "bg-lumey-orange" : "bg-gray-300"
                  }`}
                />
                {currentProduct.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImageIndex(idx + 1)}
                    className={`h-3 w-3 rounded-full ${
                      imageIndex === idx + 1 ? "bg-lumey-orange" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <button
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
                onClick={nextImage}
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="flex mt-4 gap-2">
              <div
                className={`h-20 w-20 border rounded-md cursor-pointer ${
                  imageIndex === 0 ? "border-lumey-orange" : "border-gray-200"
                }`}
                onClick={() => setImageIndex(0)}
              >
                <img
                  src={currentProduct.mainImage}
                  alt={currentProduct.name}
                  className="w-full h-full object-contain p-1"
                />
              </div>
              {currentProduct.images.map((image, idx) => (
                <div
                  key={idx}
                  className={`h-20 w-20 border rounded-md cursor-pointer ${
                    imageIndex === idx + 1
                      ? "border-lumey-orange"
                      : "border-gray-200"
                  }`}
                  onClick={() => setImageIndex(idx + 1)}
                >
                  <img
                    src={image}
                    alt={`${currentProduct.name} view ${idx + 1}`}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">{currentProduct.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.floor(currentProduct.rating)
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300 fill-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                ({currentProduct.reviewCount} reviews)
              </span>
              <span className="ml-4 text-sm text-gray-600">
                Over {currentProduct.soldCount} units sold
              </span>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 mb-1">
                Power: {currentProduct.power} | Capacity:{" "}
                {currentProduct.capacity}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-lumey-orange">
                  {formatPrice(currentProduct.price)}
                </span>
                <span className="text-gray-500 line-through text-lg">
                  {formatPrice(currentProduct.originalPrice)}
                </span>
              </div>

              <div className="text-sm text-gray-500 mb-2">
                <span>{currentProduct.panelInfo}</span>
              </div>
              <div className="text-sm text-gray-600 italic mb-4">
                {formatPrice(currentProduct.priceInfo.withPanel)} with solar
                panels
              </div>
            </div>

            <p className="text-gray-700 mb-6">{currentProduct.description}</p>

            <div className="space-y-4 mb-6">
              {currentProduct.features.slice(0, 4).map((feature, idx) => (
                <div key={idx} className="flex items-start">
                  <Check
                    className="text-green-500 mr-2 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href={`https://wa.me/2348139743177?text=I'm%20interested%20in%20the%20${encodeURIComponent(
                  currentProduct.name
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="button-secondary w-full sm:w-auto"
              >
                <MessageSquare size={18} className="mr-2" />
                Contact on WhatsApp
              </a>
              <a
                href={`tel:+2348139743177`}
                className="button-primary w-full sm:w-auto"
              >
                <Phone size={18} className="mr-2" />
                Call to Order
              </a>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-8">
              <button
                className={`pb-4 pt-2 font-medium ${
                  activeTab === "description"
                    ? "border-b-2 border-lumey-orange text-lumey-dark"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={`pb-4 pt-2 font-medium ${
                  activeTab === "specifications"
                    ? "border-b-2 border-lumey-orange text-lumey-dark"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("specifications")}
              >
                Specifications
              </button>
              <button
                className={`pb-4 pt-2 font-medium ${
                  activeTab === "pricing"
                    ? "border-b-2 border-lumey-orange text-lumey-dark"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("pricing")}
              >
                Pricing
              </button>
            </div>
          </div>

          <div className="px-1">
            {activeTab === "description" && (
              <div className="space-y-4">
                <p>
                  The {currentProduct.name} is a versatile and reliable portable
                  power solution that provides clean, quiet, and sustainable
                  energy whenever and wherever you need it.
                </p>

                <div className="mt-6">
                  <h3 className="font-bold text-lg mb-3">Use Cases:</h3>
                  <p className="text-gray-700">{currentProduct.useCase}</p>
                </div>

                <h3 className="font-bold text-lg mt-6 mb-2">Key Features:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {currentProduct.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4">
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  {Object.entries(currentProduct.specifications).map(
                    ([key, value]) => (
                      <div key={key} className="border-b pb-2">
                        <span className="font-medium capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}:{" "}
                        </span>
                        <span className="text-gray-600">
                          {value as React.ReactNode}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {activeTab === "pricing" && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4">Pricing Options</h3>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg bg-white">
                    <h4 className="font-semibold text-lg mb-2">Base Model</h4>
                    <p className="text-gray-600 mb-2">
                      Powerbox unit without solar panels or installation
                    </p>
                    <p className="text-xl font-bold text-lumey-orange">
                      {formatPrice(currentProduct.priceInfo.withoutPanel)}
                    </p>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg bg-white">
                    <h4 className="font-semibold text-lg mb-2">
                      With Solar Panels
                    </h4>
                    <p className="text-gray-600 mb-2">
                      Powerbox unit with solar panels
                    </p>
                    <p className="text-xl font-bold text-lumey-orange">
                      {formatPrice(currentProduct.priceInfo.withPanel)}
                    </p>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg bg-white">
                    <h4 className="font-semibold text-lg mb-2">
                      Complete Package
                    </h4>
                    <p className="text-gray-600 mb-2">
                      Powerbox unit with solar panels and professional
                      installation
                    </p>
                    <p className="text-xl font-bold text-lumey-orange">
                      {formatPrice(
                        currentProduct.priceInfo.withPanelAndInstallation
                      )}
                    </p>
                  </div>

                  <div className="mt-4 text-center">
                    <a
                      href={`https://wa.me/2348139743177?text=I'm%20interested%20in%20the%20${encodeURIComponent(
                        currentProduct.name
                      )}%20package%20options`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-primary inline-flex"
                    >
                      <MessageSquare size={18} className="mr-2" />
                      Contact for Custom Pricing
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products
              .filter((p) => p.id !== currentProduct.id)
              .slice(0, 4)
              .map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="product-card group"
                >
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
                    <img
                      src={product.mainImage}
                      alt={product.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {product.capacity} | {product.power}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <p className="text-lumey-orange font-bold">
                        ₦{formatNumber(product.price)}
                      </p>
                      <p className="text-gray-500 line-through text-sm">
                        ₦{formatNumber(product.originalPrice)}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      Over {product.soldCount} sold
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 w-screen">
            Compare All Models
          </h2>
          <ProductsTable />
        </div>

        <div className="mt-16 mb-12 relative">
          <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-lumey-yellow to-lumey-orange"></div>
          <div className="pt-12 pb-6 px-6 rounded-xl bg-gradient-to-br from-lumey-yellow/5 to-lumey-orange/5 border border-lumey-yellow/20 shadow-lg">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Need a Custom Energy Solution?
            </h2>

            <Card className="overflow-hidden border-none shadow-xl">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                  <div className="lg:col-span-2 h-[300px] lg:h-auto relative overflow-hidden">
                    <img
                      src="/images/farm.jpg"
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
                          Custom Energy Solution
                        </h4>
                        <p className="text-white/90 font-medium">
                          5kVA - 20kVA+
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-3 p-8 bg-white">
                    <h4 className="text-xl font-bold mb-4">
                      Built to Your Exact Specifications
                    </h4>
                    <p className="mb-6">
                      We design and build custom power solutions to meet
                      specific energy requirements for homes, businesses, farms,
                      and industrial applications. From 5kVA to over 20kVA, our
                      custom solutions are engineered for reliability and
                      performance.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                        <Wrench className="text-lumey-orange mb-2" size={28} />
                        <h5 className="font-medium mb-1">Custom Built</h5>
                        <p className="text-sm text-gray-600">
                          Tailored to your exact requirements
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                        <Zap className="text-lumey-orange mb-2" size={28} />
                        <h5 className="font-medium mb-1">High Capacity</h5>
                        <p className="text-sm text-gray-600">
                          Power multiple appliances simultaneously
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                        <Shield className="text-lumey-orange mb-2" size={28} />
                        <h5 className="font-medium mb-1">Reliable</h5>
                        <p className="text-sm text-gray-600">
                          Built for long-term performance
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a
                        href="https://wa.me/2348139743177?text=I'm%20interested%20in%20a%20custom%20energy%20solution"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button-primary flex items-center justify-center gap-2"
                      >
                        <MessageSquare size={18} />
                        Get a Custom Quote
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
          </div>
          <div className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-lumey-orange to-lumey-yellow"></div>
        </div>
      </div>
    </div>
  );
};

export default page;
