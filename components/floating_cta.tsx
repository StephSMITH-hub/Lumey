"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageSquare, X } from "lucide-react";

export const FloatingCTA = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY + 50) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 10) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <AnimatePresence>
        {isVisible && (
          <div className="flex flex-col items-end">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-end space-y-3 "
            >
              <AnimatePresence>
                {isOpen ? (
                  <>
                    <motion.a
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      href="https://wa.me/2348139743177"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MessageSquare size={24} />
                    </motion.a>

                    <motion.a
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ delay: 0.1 }}
                      href="tel:+2348139743177"
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Phone size={24} />
                    </motion.a>
                  </>
                ) : null}
              </AnimatePresence>

              <motion.button
                onClick={toggleOpen}
                className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-colors ${
                  isOpen
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-lumey-yellow hover:bg-lumey-orange"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isOpen ? (
                  <X size={24} className="text-white" />
                ) : (
                  <div className="relative">
                    <MessageSquare size={24} className="text-black" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                  </div>
                )}
              </motion.button>
              <p className="text-black bg-white p-3 rounded-md">
                You need assistance? Talk to us
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
