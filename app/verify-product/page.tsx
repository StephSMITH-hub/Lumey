"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  ShieldCheck,
  Clock,
  Calendar,
  MapPin,
  Package,
  User,
} from "lucide-react";
import Link from "next/link";

// Mock verification data - this would come from an API in a real app
const verificationDatabase = {
  "LM-550-2025-0012": {
    model: "Lumey Powerbox 550",
    serialNumber: "LM-550-2025-0012",
    manufactureDate: "February 15, 2025",
    purchaseDate: "March 20, 2025",
    warrantyStatus: "Valid",
    warrantyExpiry: "March 20, 2026",
    location: "Lagos, Nigeria",
    customerName: "John Adebayo",
    status: "authentic",
  },
  "LM-1200-2025-0045": {
    model: "Lumey Powerbox 1200",
    serialNumber: "LM-1200-2025-0045",
    manufactureDate: "January 10, 2025",
    purchaseDate: "February 5, 2025",
    warrantyStatus: "Valid",
    warrantyExpiry: "February 5, 2026",
    location: "Abuja, Nigeria",
    customerName: "Sarah Johnson",
    status: "authentic",
  },
  "LM-FAKE-2025-9999": {
    status: "counterfeit",
  },
  "LM-INVALID-0000": {
    status: "not_found",
  },
};

const VerifyProduct = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  // Define the motion props based on mobile status
  const getMotionProps = (initial: {
    initial: { opacity: number };
    animate: { opacity: number };
    exit: { opacity: number };
    transition: { duration: number };
  }) => {
    return isMobile ? {} : initial;
  };

  const handleVerify = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!serialNumber.trim()) {
      setError("Please enter a serial number");
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      ///@ts-expect-error an error is expected
      const result = verificationDatabase[serialNumber] || {
        status: "not_found",
      };
      setVerificationResult(result);
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderResultCard = () => {
    if (!verificationResult) return null;

    switch (verificationResult.status) {
      case "authentic":
        return (
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white border-2 border-green-200 p-6 rounded-lg shadow-lg max-w-md w-full mx-auto"
          >
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <h3 className="text-xl font-bold text-green-700">
                Authentic Product
              </h3>
            </div>

            <p className="text-gray-600 mb-6">
              This is a genuine Lumey Energy product with valid warranty
              coverage.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-lumey-orange mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-700">Product</h4>
                  <p>{verificationResult.model}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-lumey-orange mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-700">
                    Warranty Status
                  </h4>
                  <p className="text-green-600 font-medium">
                    {verificationResult.warrantyStatus} until{" "}
                    {verificationResult.warrantyExpiry}
                  </p>
                </div>
              </div>
              {/* 
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-lumey-orange mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-700">Purchase Date</h4>
                  <p>{verificationResult.purchaseDate}</p>
                </div>
              </div> */}

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-lumey-orange mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-700">
                    Registration Location
                  </h4>
                  <p>{verificationResult.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-lumey-orange mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-700">
                    Registered Owner
                  </h4>
                  <p>{verificationResult.customerName}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 bg-green-50 rounded-md text-sm text-gray-600">
              If you need assistance with this product, please{" "}
              <Link
                href="/#contact"
                className="text-lumey-orange hover:underline"
              >
                contact our support team
              </Link>
              .
            </div>
          </MotionDiv>
        );

      case "counterfeit":
        return (
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white border-2 border-red-200 p-6 rounded-lg shadow-lg max-w-md w-full mx-auto"
          >
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="h-8 w-8 text-red-500" />
              <h3 className="text-xl font-bold text-red-700">
                Counterfeit Alert
              </h3>
            </div>

            <p className="text-gray-600 mb-6">
              This serial number indicates a counterfeit product. This is not an
              authentic Lumey Energy product.
            </p>

            <div className="bg-red-50 p-4 rounded-md mb-6">
              <h4 className="font-semibold mb-2">What this means:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>This product was not manufactured by Lumey Energy</li>
                <li>It may not meet our quality and safety standards</li>
                <li>It is not covered by our warranty</li>
                <li>Performance and safety cannot be guaranteed</li>
              </ul>
            </div>

            <div className="text-center">
              <a href="#contact" className="button-primary">
                Report Counterfeit Product
              </a>
              <p className="mt-3 text-sm text-gray-600">
                Help us combat counterfeiting by reporting where you purchased
                this item.
              </p>
            </div>
          </MotionDiv>
        );

      case "not_found":
      default:
        return (
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white border-2 border-gray-200 p-6 rounded-lg shadow-lg max-w-md w-full mx-auto"
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-8 w-8 text-amber-500" />
              <h3 className="text-xl font-bold text-amber-700">
                Product Not Found
              </h3>
            </div>

            <p className="text-gray-600 mb-6">
              We couldn't find a product with the serial number "{serialNumber}"
              in our database.
            </p>

            <div className="bg-amber-50 p-4 rounded-md mb-6">
              <h4 className="font-semibold mb-2">This could be because:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>The serial number was entered incorrectly</li>
                <li>The product has not been registered in our system</li>
                <li>This may be a counterfeit product</li>
              </ul>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">
                Please double-check the serial number and try again, or contact
                our support team for assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setVerificationResult(null)}
                  className="button-secondary"
                >
                  Try Again
                </button>
                <a href="#contact" className="button-primary">
                  Contact Support
                </a>
              </div>
            </div>
          </MotionDiv>
        );
    }
  };

  const MotionDiv = isMobile ? "div" : motion.div;

  return (
    <div className="w-full overflow-x-hidden">
      <AnimatePresence mode="wait">
        <MotionDiv
          {...getMotionProps({
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            transition: { duration: 0.5 },
          })}
        >
          <main className="pt-28 md:pt-32 lg:pt-36">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-lumey-blue/20 to-lumey-lightblue/20 py-12 md:py-20">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto text-center">
                  <ShieldCheck className="w-16 h-16 mx-auto text-lumey-blue mb-4" />
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    Verify Your Lumey Product
                  </h1>
                  <p className="text-gray-700 mb-8">
                    Ensure your Lumey product is authentic and check its
                    warranty status by entering the serial number below.
                  </p>
                </div>
              </div>
            </section>

            {/* Verification Form */}
            <section className="py-12">
              <div className="container mx-auto px-4">
                {!verificationResult ? (
                  <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200"
                  >
                    <h2 className="text-xl font-bold mb-6 text-center">
                      Enter Product Serial Number
                    </h2>

                    <form onSubmit={handleVerify}>
                      <div className="mb-6">
                        <label
                          htmlFor="serial-number"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Serial Number
                        </label>
                        <div className="relative">
                          <input
                            id="serial-number"
                            type="text"
                            placeholder="e.g., LM-550-2025-0012"
                            value={serialNumber}
                            onChange={(e) =>
                              setSerialNumber(e.target.value.trim())
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lumey-yellow"
                          />
                          <Search
                            className="absolute right-3 top-3 text-gray-400"
                            size={20}
                          />
                        </div>
                        {error && (
                          <p className="mt-2 text-sm text-red-600">{error}</p>
                        )}
                        <p className="mt-2 text-xs text-gray-500">
                          The serial number can be found on the product label or
                          your purchase receipt.
                        </p>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="button-primary w-full flex items-center justify-center"
                      >
                        {isLoading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Verifying...
                          </>
                        ) : (
                          "Verify Product"
                        )}
                      </button>
                    </form>

                    <div className="mt-8 border-t border-gray-200 pt-6">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">
                        For demo purposes, try these serial numbers:
                      </h3>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>
                          <code className="bg-gray-100 p-1 rounded">
                            LM-550-2025-0012
                          </code>{" "}
                          - Authentic product
                        </li>
                        <li>
                          <code className="bg-gray-100 p-1 rounded">
                            LM-1200-2025-0045
                          </code>{" "}
                          - Authentic product
                        </li>
                        <li>
                          <code className="bg-gray-100 p-1 rounded">
                            LM-FAKE-2025-9999
                          </code>{" "}
                          - Counterfeit product
                        </li>
                        <li>
                          <code className="bg-gray-100 p-1 rounded">
                            LM-INVALID-0000
                          </code>{" "}
                          - Not found
                        </li>
                      </ul>
                    </div>
                  </MotionDiv>
                ) : (
                  <div className="max-w-md mx-auto">
                    {renderResultCard()}

                    <MotionDiv
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="mt-6 text-center"
                    >
                      <button
                        onClick={() => {
                          setVerificationResult(null);
                          setSerialNumber("");
                        }}
                        className="text-lumey-orange hover:text-lumey-yellow font-medium"
                      >
                        Verify Another Product
                      </button>
                    </MotionDiv>
                  </div>
                )}
              </div>
            </section>

            {/* Information Section */}
            <section className="py-12 bg-gray-50">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-2xl font-bold mb-8 text-center">
                    How Product Verification Works
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <div className="h-12 w-12 flex items-center justify-center bg-lumey-yellow/20 text-lumey-orange rounded-full mb-4">
                        <span className="font-bold text-xl">1</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        Find Your Serial Number
                      </h3>
                      <p className="text-gray-600">
                        Locate the serial number on your product label,
                        packaging, or purchase receipt.
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <div className="h-12 w-12 flex items-center justify-center bg-lumey-yellow/20 text-lumey-orange rounded-full mb-4">
                        <span className="font-bold text-xl">2</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        Enter & Verify
                      </h3>
                      <p className="text-gray-600">
                        Enter the serial number in our verification tool and
                        submit to check authenticity.
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <div className="h-12 w-12 flex items-center justify-center bg-lumey-yellow/20 text-lumey-orange rounded-full mb-4">
                        <span className="font-bold text-xl">3</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        View Results
                      </h3>
                      <p className="text-gray-600">
                        Get instant verification of your product's authenticity
                        and warranty status.
                      </p>
                    </div>
                  </div>

                  <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4">
                      Why Verify Your Product?
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>
                          Ensure you have a genuine Lumey product with full
                          warranty coverage
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>
                          Protect yourself from counterfeit products that may be
                          unsafe or unreliable
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>
                          Access your product's warranty information and support
                          services
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>
                          Help us combat counterfeiting and protect our
                          customers
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </MotionDiv>
      </AnimatePresence>
    </div>
  );
};

export default VerifyProduct;
