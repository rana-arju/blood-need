"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserPlus, HelpCircle, Heart } from "lucide-react";

export default function DonationSteps() {
  const t = useTranslations("DonationSteps");

  const steps = [
    {
      number: "01",
      icon: <UserPlus className="w-8 h-8" />,
      title: t("steps.become.title"),
      description: t("steps.become.description"),
      link: "/be-donor",
      buttonText: t("steps.become.button"),
    },
    {
      number: "02",
      icon: <HelpCircle className="w-8 h-8" />,
      title: t("steps.why.title"),
      description: t("steps.why.description"),
      link: "/why-give-blood",
      buttonText: t("steps.why.button"),
    },
    {
      number: "03",
      icon: <Heart className="w-8 h-8" />,
      title: t("steps.impact.title"),
      description: t("steps.impact.description"),
      link: "/donation-impact",
      buttonText: t("steps.impact.button"),
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="relative h-full group hover:shadow-lg transition-all duration-300">
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      {step.icon}
                    </div>
                    <span className="text-3xl font-bold text-muted-foreground/20">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground mb-6 flex-grow">
                    {step.description}
                  </p>

                  <Button
                    asChild
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                  >
                    <Link href={step.link}>{step.buttonText}</Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
