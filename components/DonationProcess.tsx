"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Registration",
    description: "Complete the registration process",
  },
  {
    number: "02",
    title: "Screening Test",
    description: "Quick health screening",
  },
  {
    number: "03",
    title: "Donation",
    description: "Safe blood donation process",
  },
  {
    number: "04",
    title: "Rest & Refresh",
    description: "Take a moment to recover",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function DonationProcess() {
  return (
    <section className="py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-primary text-sm font-semibold mb-2">
            WHAT WE DO
          </h3>
          <h2 className="text-3xl font-bold">Donation Process</h2>
        </motion.div>
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200" />
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 relative"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={item}
                className="bg-white p-6 rounded-lg shadow-lg relative z-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mb-4"
                >
                  {step.number}
                </motion.div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
