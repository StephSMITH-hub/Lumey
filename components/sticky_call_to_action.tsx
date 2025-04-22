"use client"

import React, { useState, useEffect } from 'react';
import { Sun } from 'lucide-react';

export const StickyCallToAction = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = window.pageYOffset;
      if (scrollHeight > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-lumey-yellow to-lumey-orange py-3 z-40 shadow-lg transform transition-transform">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center gap-2 mb-3 sm:mb-0">
          <Sun className="h-6 w-6 text-black" />
          <p className="font-medium text-black text-center sm:text-left">
            Power Your World with Lumey Energy!<br className="sm:hidden" />
            <span className="text-sm">Say goodbye to power outages. Say hello to sustainable energy.</span>
          </p>
        </div>
        
        <a href="#products" className="bg-white text-lumey-dark py-2 px-6 rounded-lg shadow-md hover:bg-gray-100 transition-colors font-medium">
          Get Started Today
        </a>
      </div>
    </div>
  );
};

