"use client"

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { name: string; href: string; onClick?: () => void }[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, links }) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6 z-50"
        >
          <nav className="flex flex-col space-y-4">
            {links.map((link) => {
              // Determine if this link should use Link or 'a'
              const isHashLink = link.href.startsWith("#");
              const isExternalLink = link.href.startsWith("http");
              const linkProps = {
                onClick: () => {
                  if (link.onClick) link.onClick();
                  onClose();
                }
              };

              return isHashLink ? (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-lumey-yellow py-2 border-b border-gray-100 last:border-0"
                  onClick={linkProps.onClick}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "text-gray-700 hover:text-lumey-yellow py-2 border-b border-gray-100 last:border-0",
                    location.pathname === link.href
                      ? "text-lumey-orange font-semibold"
                      : ""
                  )}
                  onClick={linkProps.onClick}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="flex flex-col space-y-3 pt-4">
              <Link
                to="/products"
                className="button-primary w-fit text-center"
                onClick={onClose}
              >
                Shop Now
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

