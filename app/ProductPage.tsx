import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { useIsMobile } from "@/hooks/use-mobile";
import ProductsTable from "@/components/ProductsTable";
import { formatPrice } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Product data - in a real app, this would come from an API
const products = [
  {
    id: "powerbox-550",
    name: "Lumey Powerbox 550",
    capacity: "550Wh",
    power: "400W",
    originalPrice: 250000,
    price: 220000,
    soldCount: 0,
    withPanelPrice: 270000,
    rating: 0,
    reviewCount: 0,
    mainImage: "/images/products/550.jpg",
    panelInfo: "1 x 12V, 200W panel",
    images: [],
    description:
      "Perfect for students, small rooms, and light users. A compact, affordable backup solution for basic devices during outages.",
    features: [
      "550Wh battery capacity",
      "400W pure sine wave inverter",
      "Multiple charging options: solar, AC, generator",
      "2 AC outlets, 4 USB ports, 1 USB-C",
      "LED display showing battery level and usage",
      "Compact and portable design",
      "Silent operation",
      "12-month warranty",
    ],
    specifications: {
      capacity: "550Wh",
      inverter: "400W (800W surge)",
      battery: "Lithium-ion, 2000+ lifecycle",
      acOutput: "230V, 50Hz, 2 outlets",
      usbPorts: "4x USB-A, 1x USB-C",
      chargingOptions: "Solar Panel, AC Adapter, Generator",
      chargingTime: "AC: 6-8 hours, Solar: 8-10 hours",
      weight: "5.5 kg",
      dimensions: "24cm × 15cm × 20cm",
      noiseLevel: "5dB",
    },
    useCase: "Ideal for phones, laptops, fans, bulbs, and other essentials.",
    priceInfo: {
      withoutPanel: 220000,
      withPanel: 270000,
      withPanelAndInstallation: 335000,
    },
  },
  {
    id: "powerbox-1200",
    name: "Lumey Powerbox 1200",
    capacity: "1200Wh",
    power: "800W",
    originalPrice: 350000,
    price: 320000,
    soldCount: 0,
    withPanelPrice: 420000,
    rating: 0,
    reviewCount: 0,
    mainImage: "/images/products/1200.jpg",
    panelInfo: "2 x 12V, 200W panels",
    images: [],
    description:
      "Great for remote work, freelancers, and growing families. Provides longer backup and power for multiple devices.",
    features: [
      "1200Wh battery capacity",
      "800W pure sine wave inverter",
      "Multiple charging options: solar, AC, generator",
      "3 AC outlets, 4 USB ports, 2 USB-C",
      "LED display showing battery level and usage",
      "Built-in LED light",
      "Silent operation",
      "12-month warranty",
    ],
    specifications: {
      capacity: "1200Wh",
      inverter: "800W (1600W surge)",
      battery: "Lithium-ion, 2000+ lifecycle",
      acOutput: "230V, 50Hz, 3 outlets",
      usbPorts: "4x USB-A, 2x USB-C",
      chargingOptions: "Solar Panel, AC Adapter, Generator",
      chargingTime: "AC: 8-10 hours, Solar: 10-12 hours",
      weight: "11.5 kg",
      dimensions: "32cm × 18cm × 25cm",
      noiseLevel: "5dB",
    },
    useCase: "Supports TVs, routers, printers, and multiple device charging.",
    priceInfo: {
      withoutPanel: 320000,
      withPanel: 420000,
      withPanelAndInstallation: 525000,
    },
  },
  {
    id: "powerbox-2100",
    name: "Lumey Powerbox 2100",
    capacity: "2100Wh",
    power: "1500W",
    originalPrice: 535000,
    price: 500000,
    soldCount: 0,
    withPanelPrice: 650000,
    rating: 0,
    reviewCount: 0,
    mainImage: "/images/products/2100.jpg",
    panelInfo: "3 x 12V, 200W panels",
    images: [],
    description:
      "Designed for small businesses and homes with high usage. Powers more devices simultaneously with reliable backup.",
    features: [
      "2100Wh battery capacity",
      "1500W pure sine wave inverter",
      "Multiple charging options: solar, AC, generator",
      "4 AC outlets, 6 USB ports, 2 USB-C",
      "LCD display with input/output details",
      "Built-in LED light",
      "Silent operation",
      "12-month warranty",
    ],
    specifications: {
      capacity: "2100Wh",
      inverter: "1500W (3000W surge)",
      battery: "Lithium-ion, 3000+ lifecycle",
      acOutput: "230V, 50Hz, 4 outlets",
      usbPorts: "6x USB-A, 2x USB-C",
      chargingOptions: "Solar Panel, AC Adapter, Generator",
      chargingTime: "AC: 10-12 hours, Solar: 12-14 hours",
      weight: "19.5 kg",
      dimensions: "38cm × 25cm × 30cm",
      noiseLevel: "15dB",
    },
    useCase: "Powers fridges, TVs, PoS machines, fans, and work tools.",
    priceInfo: {
      withoutPanel: 500000,
      withPanel: 650000,
      withPanelAndInstallation: 775000,
    },
  },
  {
    id: "powerbox-3300",
    name: "Lumey Powerbox 3300",
    capacity: "3300Wh",
    power: "1500W",
    originalPrice: 860000,
    price: 820000,
    soldCount: 0,
    withPanelPrice: 1120000,
    rating: 0,
    reviewCount: 0,
    mainImage: "/images/products/3300.jpg",
    panelInfo: "2 x 555W panels",
    images: [],
    description:
      "Backup for entire homes or offices. Handles heavier loads for longer hours.",
    features: [
      "3300Wh battery capacity",
      "1500W pure sine wave inverter",
      "Multiple charging options: solar, AC, generator",
      "4 AC outlets, 6 USB ports, 2 USB-C",
      "LCD display with energy details",
      "Expandable battery support",
      "Silent operation",
      "12-month warranty",
    ],
    specifications: {
      capacity: "3300Wh",
      inverter: "1500W (3000W surge)",
      battery: "Lithium-ion, 3000+ lifecycle",
      acOutput: "230V, 50Hz, 4 outlets",
      usbPorts: "6x USB-A, 2x USB-C",
      chargingOptions: "Solar Panel, AC Adapter, Generator",
      chargingTime: "AC: 14-16 hours, Solar: 16-20 hours",
      weight: "27.5 kg",
      dimensions: "42cm × 28cm × 33cm",
      noiseLevel: "25dB",
    },
    useCase: "Great for homes with ACs, fridges, or multiple workstations.",
    priceInfo: {
      withoutPanel: 820000,
      withPanel: 1120000,
      withPanelAndInstallation: 1265000,
    },
  },
  {
    id: "powerbox-6500",
    name: "Lumey Powerbox 6500",
    capacity: "6500Wh",
    power: "3500W",
    originalPrice: 1550000,
    price: 1500000,
    soldCount: 0,
    withPanelPrice: 2100000,
    rating: 0,
    reviewCount: 0,
    mainImage: "/images/products/6500.jpg",
    panelInfo: "4 x 555W panels",
    images: [],
    description:
      "Heavy-duty solution for large homes, offices, farms, or hospitals. Provides stable energy for critical equipment.",
    features: [
      "6500Wh battery capacity",
      "3500W pure sine wave inverter",
      "Multiple charging options: solar, AC, generator",
      "6 AC outlets, 8 USB ports, 4 USB-C",
      "Advanced LCD energy management system",
      "Expandable battery capacity",
      "Silent operation",
      "24-month warranty",
    ],
    specifications: {
      capacity: "6500Wh",
      inverter: "3500W (7000W surge)",
      battery: "Lithium-iron-phosphate, 6000+ lifecycle",
      acOutput: "230V, 50Hz, 6 outlets",
      usbPorts: "8x USB-A, 4x USB-C",
      chargingOptions: "Solar Panel, AC Adapter, Generator",
      chargingTime: "AC: 18-20 hours, Solar: 24-30 hours",
      weight: "58 kg",
      dimensions: "53cm × 32cm × 42cm",
      noiseLevel: "30dB",
    },
    useCase:
      "Powers deep freezers, washing machines, water pumps, and industrial-grade equipment.",
    priceInfo: {
      withoutPanel: 1500000,
      withPanel: 2100000,
      withPanelAndInstallation: 2290000,
    },
  },
];

const formatNumber = (num) => {
  return num.toLocaleString("en-NG");
};

const ProductPage = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const { productId } = useParams();
  const [currentProduct, setCurrentProduct] = useState(products[0]);
  const isMobile = useIsMobile();

  const getMotionProps = (initial) => {
    return isMobile ? {} : initial;
  };

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
    <AnimatePresence mode="wait">
      <MotionDiv
        {...getMotionProps({
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.5 },
        })}
      >
        <Header />

        <main className="pt-[120px]">
          <div className="bg-gray-50 py-4">
            <div className="container mx-auto px-4 md:mt-[70px] mt-[10px]">
              <div className="flex items-center text-sm text-gray-600">
                <Link to="/" className="hover:text-lumey-orange">
                  Home
                </Link>
                <ChevronRight size={12} className="mx-2" />
                <Link to="/products" className="hover:text-lumey-orange">
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

          {isProductDetail ? (
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
                            imageIndex === idx + 1
                              ? "bg-lumey-orange"
                              : "bg-gray-300"
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
                        imageIndex === 0
                          ? "border-lumey-orange"
                          : "border-gray-200"
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
                  <h1 className="text-3xl font-bold mb-2">
                    {currentProduct.name}
                  </h1>
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
                      {formatPrice(currentProduct.priceInfo.withPanel)} with
                      solar panels
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6">
                    {currentProduct.description}
                  </p>

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
                        The {currentProduct.name} is a versatile and reliable
                        portable power solution that provides clean, quiet, and
                        sustainable energy whenever and wherever you need it.
                      </p>

                      <div className="mt-6">
                        <h3 className="font-bold text-lg mb-3">Use Cases:</h3>
                        <p className="text-gray-700">
                          {currentProduct.useCase}
                        </p>
                      </div>

                      <h3 className="font-bold text-lg mt-6 mb-2">
                        Key Features:
                      </h3>
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
                      <h3 className="font-bold text-lg mb-4">
                        Pricing Options
                      </h3>
                      <div className="space-y-4">
                        <div className="p-4 border border-gray-200 rounded-lg bg-white">
                          <h4 className="font-semibold text-lg mb-2">
                            Base Model
                          </h4>
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
                        to={`/products/${product.id}`}
                        className="product-card group"
                      >
                        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
                          <img
                            src={product.mainImage}
                            alt={product.name}
                            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="font-semibold text-lg mb-1">
                          {product.name}
                        </h3>
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
                                3.5kVA - 20kVA+
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
                            specific energy requirements for homes, businesses,
                            farms, and industrial applications. From 3.5kVA to
                            over 20kVA, our custom solutions are engineered for
                            reliability and performance.
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                              <Wrench
                                className="text-lumey-orange mb-2"
                                size={28}
                              />
                              <h5 className="font-medium mb-1">Custom Built</h5>
                              <p className="text-sm text-gray-600">
                                Tailored to your exact requirements
                              </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                              <Zap
                                className="text-lumey-orange mb-2"
                                size={28}
                              />
                              <h5 className="font-medium mb-1">
                                High Capacity
                              </h5>
                              <p className="text-sm text-gray-600">
                                Power multiple appliances simultaneously
                              </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                              <Shield
                                className="text-lumey-orange mb-2"
                                size={28}
                              />
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
          ) : (
            <div className="section-container py-8">
              <MotionDiv
                {...getMotionProps({
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.5 },
                })}
                className="text-center mb-12"
              >
                <h1 className="heading-lg mb-4">Our Products</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  From compact home solutions to powerful business-grade energy
                  stations, Lumey Powerboxes keep you powered—no matter the
                  situation.
                </p>
              </MotionDiv>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                {products.map((product, index) => (
                  <MotionDiv
                    key={product.id}
                    {...getMotionProps({
                      initial: { opacity: 0, y: 20 },
                      animate: { opacity: 1, y: 0 },
                      transition: { duration: 0.5, delay: index * 0.1 },
                    })}
                    className="product-card group"
                  >
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
                      <Link to={`/products/${product.id}`}>
                        <img
                          src={product.mainImage}
                          alt={product.name}
                          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link to={`/products/${product.id}`} className="block">
                        <h2 className="font-bold text-xl mb-1">
                          {product.name}
                        </h2>
                      </Link>
                      <p className="text-gray-600 mb-2">
                        {product.capacity} | {product.power}
                      </p>
                      <p className="text-gray-700 mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center mb-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className={
                                    i < Math.floor(product.rating)
                                      ? "text-yellow-500 fill-yellow-500"
                                      : "text-gray-300 fill-gray-300"
                                  }
                                />
                              ))}
                            </div>
                            <span className="ml-1 text-xs text-gray-500">
                              ({product.reviewCount})
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            Over {product.soldCount} units sold
                          </span>
                        </div>
                        <div className="text-right flex flex-col items-end">
                          <p className="text-lumey-orange font-bold">
                            ₦{formatNumber(product.price)}
                          </p>
                          <p className="text-gray-500 line-through text-xs">
                            ₦{formatNumber(product.originalPrice)}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                        <Link
                          to={`/products/${product.id}`}
                          className="button-secondary py-2 text-center text-sm"
                        >
                          View Details
                        </Link>
                        <a
                          href={`https://wa.me/2348139743177?text=I'm%20interested%20in%20the%20${encodeURIComponent(
                            product.name
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="button-primary py-2 text-center text-sm"
                        >
                          Contact on WhatsApp
                        </a>
                      </div>
                    </div>
                  </MotionDiv>
                ))}
              </div>

              <div className="mt-16 mb-4">
                <h2 className="text-2xl font-bold mb-6">Compare All Models</h2>
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
                                3.5kVA - 20kVA+
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
                            specific energy requirements for homes, businesses,
                            farms, and industrial applications. From 3.5kVA to
                            over 20kVA, our custom solutions are engineered for
                            reliability and performance.
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                              <Wrench
                                className="text-lumey-orange mb-2"
                                size={28}
                              />
                              <h5 className="font-medium mb-1">Custom Built</h5>
                              <p className="text-sm text-gray-600">
                                Tailored to your exact requirements
                              </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                              <Zap
                                className="text-lumey-orange mb-2"
                                size={28}
                              />
                              <h5 className="font-medium mb-1">
                                High Capacity
                              </h5>
                              <p className="text-sm text-gray-600">
                                Power multiple appliances simultaneously
                              </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                              <Shield
                                className="text-lumey-orange mb-2"
                                size={28}
                              />
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
          )}
        </main>

        <Footer />
        <FloatingCTA />
      </MotionDiv>
    </AnimatePresence>
  );
};

export default ProductPage;
