"use client";

import { useState, useEffect } from "react";
import { Menu, Sun, Zap, X, MessageCircle, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./mobile_menu";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const Header = () => {
  const [scroll, setScroll] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const isHomePage = pathname === "/";

  const scrollToSection = (sectionId: any) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Home", href: isHomePage ? "#home" : "/" },
    {
      name: "About Us",
      href: isHomePage ? "#about" : "/#about",
      onClick: () => isHomePage && scrollToSection("about"),
    },
    { name: "Products", href: isHomePage ? "#products" : "/products" },
    // Commenting out load estimator as requested
    // { name: "Load Estimator", href: "/load-estimator" },
    { name: "Blog", href: "/blog" },
    { name: "Gallery", href: "/gallery" },
    { name: "Verify Products", href: "/verify-product" },
    {
      name: "FAQs",
      href: isHomePage ? "#faqs" : "/#faqs",
      onClick: () => isHomePage && scrollToSection("faqs"),
    },
    {
      name: "Contact Us",
      href: isHomePage ? "#contact" : "/#contact",
      onClick: () => isHomePage && scrollToSection("contact"),
    },
  ];

  return (
    <header
      className={cn(
        "fixed w-full z-50 transition-all duration-300 bg-white shadow-md pt-2",
        scroll ? "py-2" : "py-4"
      )}
    >
      <div className="  mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/Lumey_Favicon/4x/Lumey_Favicon_32x32@4x.png"
              alt="Lumey logo"
              className="rounded-full w-[50px] object-cover"
            />
          </Link>
        </div>

        <div className="flex space-x-2">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 mr-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={link.onClick}
                className={cn(
                  "text-gray-700 hover:text-lumey-orange transition-colors duration-300",
                  pathname === link.href
                    ? "text-lumey-orange font-semibold"
                    : ""
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/products" className="button-primary">
              Shop Now
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-md text-gray-700"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        links={navLinks}
        onClose={toggleMobileMenu}
      />

      {/* Header Tag Line - Desktop */}
      {/* <div className="hidden lg:block bg-gradient-to-r from-lumey-light_yellow to-lumey-yellow py-1 mt-2 w-full">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-xs text-center md:text-sm">
          <p className="flex items-center gap-1">
            <Sun size={14} className="inline" />
            Nigeria's No.1 Producer & Partner in Solar Energy Innovation
          </p>
          <p className="flex items-center gap-1">
            <Zap size={14} className="inline" />
            Solar Generators | Power Stations | Energy Storage Banks |{" "}
            <a
              className="flex items-center justify-center"
              href="https://wa.me/2348139743177"
              target="_blank"
            >
              <MessageCircle size={14} className="inline mr-1" />
              08139743177
            </a>
          </p>
        </div>
      </div> */}

      {/* Mobile Marquee - Added as requested */}
      <div className="bg-gradient-to-r from-lumey-light_yellow to-lumey-yellow py-1 mt-1 w-full overflow-hidden">
        <div className="marquee">
          <div className="marquee-content">
            <span className="whitespace-nowrap px-2">
              Welcome to Lumey Energy • Home to Nigeria's No.1 Indigenous Solar
              Solutions Provider • Solar Generators | Power Stations | Energy
              Storage Banks • Best in Price and Quality • Reach us today -
              08139743177 | 02013306061
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
