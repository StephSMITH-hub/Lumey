"use client";

import React from "react";
import {
  Sun,
  ArrowUp,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
} from "lucide-react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";

const contactInfo = [
  // {
  //   icon: <MapPin className="h-5 w-5" />,
  //   text: "Akure, Nigeria",
  //   link: "#",
  // },
  {
    icon: <Phone className="h-5 w-5" />,
    text: "+2348139743177",
    link: "tel:+2348139743177",
  },
  {
    icon: <Phone className="h-5 w-5" />,
    text: "+2342013306061",
    link: "tel:+2342013306061",
  },

  {
    icon: <Mail className="h-5 w-5" />,
    text: "lumeyenergy@gmail.com",
    link: "mailto:lumeyenergy@gmail.com",
  },
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gray-900 text-white pt-6 pb-6">
      <div className="flex flex-col justify-center items-center w-screen ">
        <h4 className="font-semibold text-xl mb-3">
          Subscribe to our newsletter
        </h4>
        <div className="flex w-[80%]">
          <input
            type="email"
            placeholder="Your email"
            className="px-4 py-2 bg-gray-800 text-white rounded-l-lg w-full focus:outline-none"
          />
          <button className="bg-lumey-yellow text-black px-4 py-2 rounded-r-lg hover:bg-lumey-orange transition-colors">
            Subscribe
          </button>
        </div>
      </div>
      <div className="container mx-auto mt-5 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Sun className="h-8 w-8 text-lumey-yellow" />
              <span className="font-bold text-xl">Lumey Energy</span>
            </div>
            <p className="text-gray-400 mb-6">
              Nigeria's No.1 Producer & Partner in Solar Energy Innovation.
              Providing clean, reliable power solutions for homes and
              businesses.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61575857666532"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-lumey-yellow hover:text-black transition-colors"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com/lumeyenergy/"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-lumey-yellow hover:text-black transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="https://x.com/LumeyEnergy"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-lumey-yellow hover:text-black transition-colors"
              >
                <FaXTwitter />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#home"
                  className="text-gray-400 hover:text-lumey-yellow transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-lumey-yellow transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-400 hover:text-lumey-yellow transition-colors"
                >
                  Our Products
                </Link>
              </li>
              <li>
                <a
                  href="#custom"
                  className="text-gray-400 hover:text-lumey-yellow transition-colors"
                >
                  Custom Solutions
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-gray-400 hover:text-lumey-yellow transition-colors"
                >
                  Testimonials
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#faqs"
                  className="text-gray-400 hover:text-lumey-yellow transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-lumey-yellow transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <button className="text-gray-400 hover:text-lumey-yellow transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-lumey-yellow transition-colors">
                  Shipping & Returns
                </button>
              </li>
              <li>
                <button
                  // href="#"
                  className="text-gray-400 hover:text-lumey-yellow transition-colors"
                >
                  Warranty Information
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>

            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white hover:text-lumey-orange transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-lumey-yellow/10 flex items-center justify-center text-lumey-orange">
                    {item.icon}
                  </div>
                  <span>{item.text}</span>
                </a>
              ))}
            </div>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61575857666532"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-lumey-yellow hover:text-black transition-colors"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com/lumeyenergy/"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-lumey-yellow hover:text-black transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="https://x.com/LumeyEnergy"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-lumey-yellow hover:text-black transition-colors"
              >
                <FaXTwitter />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Lumey Energy. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 flex items-center gap-2 text-gray-400 hover:text-lumey-yellow transition-colors"
          >
            Back to top <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
