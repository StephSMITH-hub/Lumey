"use client"

import React from "react";
import { ChevronDown, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const faqs = [
  {
    question: "How long does a Lumey Powerbox last?",
    answer:
      "Depending on the model, you can enjoy uninterrupted power for hours or even days with our long-lasting lithium-ion batteries.",
  },
  {
    question: "Can I charge the Powerbox with both solar and grid electricity?",
    answer:
      "Yes! Our powerboxes support multiple charging options, such as solar, AC, and generator.",
  },
  {
    question: "Is there a warranty?",
    answer:
      "Yes! Every Lumey Powerbox comes with a 12-month warranty for peace of mind.",
  },
  {
    question: "How many devices can I power with a Lumey Powerbox?",
    answer:
      "This depends on the model you choose. Our smaller models can power essential devices like phones, laptops, and fans, while our larger models can power refrigerators, televisions, and other high-wattage appliances.",
  },
  {
    question: "Do you offer installation services?",
    answer:
      "Yes, we provide professional installation services for all our products. Our expert team will ensure your system is set up correctly for optimal performance.",
  },
  {
    question: "How long does it take to fully charge a Powerbox?",
    answer:
      "Charging time varies by model and charging method. Using solar panels typically takes 6-8 hours of good sunlight, while grid electricity can fully charge most models in 2-4 hours.",
  },
];

const FAQ = () => {
  return (
    <section id="faqs" className=" bg-gray-50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="heading-md mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-700">
            Find answers to common questions about our products and services.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border border-gray-200 bg-white rounded-lg mb-4 shadow-sm"
                >
                  <AccordionTrigger className="px-6 py-4 text-left font-poppins font-medium text-lg hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-2 text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <a href="#contact" className="button-primary flex items-center justify-center mx-auto gap-2 w-fit">
            <MessageSquare size={18} />
            Contact Us for More Questions
          </a>
        </div>
      </div>
    </section>
  );
};

