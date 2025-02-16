"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const listItem = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export default function Welcome() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-lg overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blood%20donation%202.PNG-qBwi5zOwe68h3MK3Vcq4Fd5PFGtfFm.png"
                alt="Medical team"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-primary text-sm font-semibold mb-2">
              HELP THE PEOPLE IN NEED
            </h3>
            <h2 className="text-3xl font-bold mb-6">
              Welcome to Blood Donors Organization
            </h2>
            <p className="text-gray-600 mb-8">
              We are dedicated to making blood donation accessible and
              efficient. Join our community of donors and help save lives.
            </p>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 gap-4 mb-8"
            >
              {[
                "Good Service",
                "Help People",
                "Regular Test",
                "Blood Bank",
                "24h Service",
                "Health Check",
              ].map((text) => (
                <motion.div
                  key={text}
                  variants={listItem}
                  className="flex items-center gap-2"
                >
                  <Check className="text-primary" />
                  <span>{text}</span>
                </motion.div>
              ))}
            </motion.div>
            <Button className="bg-primary hover:bg-primary/90">
              Explore Now
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
