"use client"

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Facebook,
  Globe,
  Instagram,
  MapPin,
} from "lucide-react";

import { useRef } from "react";

const contactInfo = [
  {
    icon: <MapPin className="h-5 w-5" />,
    text: "Akure, Nigeria",
    link: "https://goo.gl/maps/Lagos",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    text: "www.lumeyenergy.com",
    link: "https://www.lumeyenergy.com",
  },
  {
    icon: <Phone className="h-5 w-5" />,
    text: "+2348139743177",
    link: "tel:+2348139743177",
  },
  {
    icon: <Mail className="h-5 w-5" />,
    text: "lumeyenergy@gmail.com",
    link: "mailto:lumeyenergy@gmail.com",
  },
];

const socialMedia = [
  {
    icon: <Instagram className="h-5 w-5" />,
    platform: "Instagram",
    handle: "@Lumey_Energy",
    link: "https://instagram.com/Lumey_Energy",
  },
  {
    icon: <Facebook className="h-5 w-5" />,
    platform: "Facebook",
    handle: "@Lumey_Energy",
    link: "https://facebook.com/Lumey_Energy",
  },
];

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      const whatsappMessage = `Hello, I'm ${formData.name} (${formData.email})\n\nSubject: ${formData.subject}\nMessage: ${formData.message}`;
      const whatsappLink = `https://wa.me/2348139743177?text=${encodeURIComponent(
        whatsappMessage
      )}`;
      window.open(whatsappLink, "_blank");

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="bg-gray-50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="heading-md mb-4 font-poppins">Contact Us</h2>
          <p className="text-lg text-gray-700">
            Have questions or need a custom solution? Reach out to our team and
            we'll get back to you shortly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-bold mb-6">Contact Information</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-lumey-yellow/20 p-3 rounded-full">
                  <Phone className="text-lumey-orange" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Phone</h4>
                  <p className="text-gray-600 mt-1">+234 813 974 3177</p>
                  <p className="text-gray-600">+234 703 654 2145</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-lumey-yellow/20 p-3 rounded-full">
                  <Mail className="text-lumey-orange" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600 mt-1">info@lumeyenergy.com</p>
                  <p className="text-gray-600">sales@lumeyenergy.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-lumey-yellow/20 p-3 rounded-full">
                  <MessageSquare className="text-lumey-orange" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">WhatsApp</h4>
                  <p className="text-gray-600 mt-1">+234 813 974 3177</p>
                  <a
                    href="https://wa.me/2348139743177"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lumey-orange hover:text-lumey-yellow mt-2 inline-block"
                  >
                    Message on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div> */}

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 bg-white p-8 rounded-xl shadow-lg"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Send Us a Message</h3>
              <div className="flex items-center text-sm text-gray-500">
                <Clock size={14} className="mr-1" />
                <span className="italic">We respond in about 5 minutes</span>
              </div>
            </div>

            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6">
                Thank you for your message! We'll get back to you shortly.
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lumey-yellow focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lumey-yellow focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lumey-yellow focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lumey-yellow focus:border-transparent"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button-primary w-full flex justify-center"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex underline items-center gap-3 text-gray-700 hover:text-lumey-orange transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-lumey-yellow/10 flex items-center justify-center text-lumey-orange">
                      {item.icon}
                    </div>
                    <span>{item.text}</span>
                  </a>
                ))}
              </div>

              <div className="mt-8">
                <h4 className="font-bold mb-4">Follow Us:</h4>
                <div className="flex gap-4">
                  {socialMedia.map((platform, index) => (
                    <a
                      key={index}
                      href={platform.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex underline items-center gap-2 text-gray-700 hover:text-lumey-orange transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-lumey-yellow/10 flex items-center justify-center text-lumey-orange">
                        {platform.icon}
                      </div>
                      <span>{platform.handle}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg h-64 flex-grow">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.0130955763874!2d5.182003374996504!3d7.250771713302731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10478f4e2a68f7f1%3A0x4dfbb22e0bcd76cc!2sAkure%2C%20Ondo%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1712733632761!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Location map"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

