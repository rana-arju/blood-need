"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ClipboardList,
  Stethoscope,
  Droplet,
  Coffee,
  ArrowRight,
} from "lucide-react";

export default function DonationProcess() {
  const t = useTranslations("DonationProcess");

  const steps = [
    {
      icon: <ClipboardList className="w-6 h-6" />,
      title: t("steps.registration.title"),
      description: t("steps.registration.description"),
      color: "bg-blue-500/10 text-blue-500",
      details: null,
      action: {
        text: t("steps.registration.action"),
        href: "/be-donor",
      },
    },
    {
      icon: <Stethoscope className="w-6 h-6" />,
      title: t("steps.screening.title"),
      description: t("steps.screening.description"),
      color: "bg-green-500/10 text-green-500",
      details: t.raw("steps.screening.details"), // Use t.raw() for array support
    },
    {
      icon: <Droplet className="w-6 h-6" />,
      title: t("steps.donation.title"),
      description: t("steps.donation.description"),
      color: "bg-red-500/10 text-red-500",
      duration: t("steps.donation.duration"),
      details: t.raw("steps.donation.details"), // Use t.raw()
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: t("steps.recovery.title"),
      description: t("steps.recovery.description"),
      color: "bg-amber-500/10 text-amber-500",
      details: t.raw("steps.recovery.details"), // Use t.raw()
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute hidden lg:block left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 z-0" />

          <div className="relative z-10 space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`flex flex-col lg:flex-row gap-8 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="w-full lg:w-1/2 flex justify-center">
                  <Card
                    className={`w-full max-w-lg p-6 relative overflow-hidden group hover:shadow-lg transition-all duration-300 ${
                      index % 2 === 0 ? "lg:mr-8" : "lg:ml-8"
                    }`}
                  >
                    <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${step.color}`}>
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {step.description}
                        </p>

                        {step.duration && (
                          <div className="text-sm font-medium text-primary mb-3">
                            {step.duration}
                          </div>
                        )}

                        {step.details && (
                          <ul className="space-y-2">
                            {step.details.map((detail: string, idx: number) => (
                              <li
                                key={idx}
                                className="flex items-center text-sm text-muted-foreground"
                              >
                                <ArrowRight className="w-4 h-4 mr-2 text-primary" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        )}

                        {step.action && (
                          <Button asChild className="mt-4">
                            <Link href={step.action.href}>
                              {step.action.text}
                              <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Step Number */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                  {index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
