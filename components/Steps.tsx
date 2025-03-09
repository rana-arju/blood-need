"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, HelpCircle, Heart, ArrowRight } from "lucide-react";

export default function DonationSteps() {
  const t = useTranslations("DonationSteps");

  const steps = [
    {
      number: "01",
      title: t("step1.title"),
      description: t("step1.description"),
      icon: <UserPlus className="w-6 h-6" />,
      action: {
        label: t("step1.action"),
        href: "/register-donor",
      },
    },
    {
      number: "02",
      title: t("step2.title"),
      description: t("step2.description"),
      icon: <HelpCircle className="w-6 h-6" />,
      action: {
        label: t("step2.action"),
        href: "/why-give-blood",
      },
    },
    {
      number: "03",
      title: t("step3.title"),
      description: t("step3.description"),
      icon: <Heart className="w-6 h-6" />,
      action: {
        label: t("step3.action"),
        href: "/donation-impact",
      },
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-2 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step) => (
          <Card
            key={step.number}
            className="relative overflow-hidden group hover:shadow-lg transition-shadow duration-300"
          >
            <div className="absolute top-4 right-4 text-4xl font-bold text-primary/10">
              {step.number}
            </div>
            <div className="p-6 space-y-4">
              <div className="p-3 bg-primary/5 rounded-full w-fit">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              <Button
                variant="ghost"
                className="group-hover:translate-x-2 transition-transform duration-300"
                asChild
              >
                <a href={step.action.href}>
                  {step.action.label}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
