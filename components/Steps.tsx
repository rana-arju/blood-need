"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "Become a Donor",
    description: "Register to become a blood donor and help save lives",
    href: "/be-a-donor",
    buttonText: "Register Now",
  },
  {
    number: "02",
    title: "Why Give Blood?",
    description: "Learn about the importance of blood donation",
    href: "/about",
    buttonText: "Learn More",
  },
  {
    number: "03",
    title: "How Donations Help",
    description: "Discover how your donation makes a difference",
    href: "/impact",
    buttonText: "See Impact",
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

export default function Steps() {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4 md:px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map((step) => (
            <motion.div key={step.number} variants={item}>
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardHeader>
                  <span className="text-4xl font-bold text-primary mb-4">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{step.description}</p>
                  <Button asChild>
                    <Link href={step.href}>{step.buttonText}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
