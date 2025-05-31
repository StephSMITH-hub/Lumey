import React, { useState, useEffect } from "react";
import { MessageCircle, Phone, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300"
            >
              {showOptions ? <X size={24} /> : <MessageCircle size={24} />}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>You need assistance? Talk to us</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {showOptions && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-4 space-y-4 w-48">
          <a
            href="https://wa.me/2348139743177"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors"
          >
            <MessageCircle size={20} />
            <span>WhatsApp</span>
          </a>
          <a
            href="tel:+2348139743177"
            className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors"
          >
            <Phone size={20} />
            <span>Call Us</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default FloatingCTA; 