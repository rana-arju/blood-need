"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Who can donate blood?",
    answer:
      "Most people can donate blood if they: Are at least 16 years old, weigh at least 110 pounds, and are in good health...",
  },
  {
    question: "How often can I donate blood?",
    answer:
      "You can donate whole blood every 56 days, platelets every 7 days, and plasma every 28 days...",
  },
  {
    question: "What should I do before donating blood?",
    answer:
      "Get plenty of sleep, eat a healthy meal, drink plenty of fluids, and bring a valid ID...",
  },
  // Add more FAQs
];

export function FaqAccordion() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8"
    >
      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </motion.div>
  );
}
