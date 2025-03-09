"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Heart,
  Clock,
  Users,
  Droplet,
  AlertCircle,
  Activity,
  ArrowRight,
  BarChart4,
} from "lucide-react";
import Image from "next/image";

export default function WhyGiveBlood() {
  const t = useTranslations("WhyGiveBlood");

  const reasons = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: t("reasons.save.title"),
      description: t("reasons.save.description"),
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: t("reasons.regular.title"),
      description: t("reasons.regular.description"),
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t("reasons.community.title"),
      description: t("reasons.community.description"),
    },
  ];

  const facts = [
    {
      stat: t("facts.accident.stat"),
      text: t("facts.accident.text"),
    },
    {
      stat: t("facts.surgery.stat"),
      text: t("facts.surgery.text"),
    },
    {
      stat: t("facts.cancer.stat"),
      text: t("facts.cancer.text"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/5 dark:to-background" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 md:w-64 md:h-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute left-0 bottom-0 w-40 h-40 md:w-80 md:h-80 rounded-full bg-primary/10 blur-3xl" />
        </div>
        <div className="container px-4 md:px-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center md:text-left"
            >
              <div className="inline-flex items-center justify-center p-2 px-3 mb-6 bg-primary/10 text-primary rounded-full text-sm font-medium">
                <Droplet className="w-4 h-4 mr-2" />
                {t("hero.badge")}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                {t("hero.title")}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" asChild>
                  <Link href="/be-donor">{t("hero.primary")}</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/donation-impact">{t("hero.secondary")}</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative hidden md:block"
            >
              <div className="relative h-[400px] w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-2xl transform rotate-3" />
                <div className="absolute inset-0 bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/db8l1ulfq/image/upload/v1741515755/blood-donotion-process_1_rokkko.webp"
                    alt={t("hero.imageAlt")}
                    width={500}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                        <BarChart4 className="w-5 h-5" />
                      </div>
                      <div className="text-sm font-medium">
                        {t("hero.stat.label")}
                      </div>
                    </div>
                    <div className="text-3xl font-bold mb-2">
                      {t("hero.stat.value")}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t("hero.stat.description")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reasons Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">{t("reasons.title")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("reasons.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="p-6 h-full border-t-4 border-t-primary hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                    {reason.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{reason.title}</h3>
                  <p className="text-muted-foreground">{reason.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facts Section */}
      <section className="py-16 md:py-24 bg-muted/30 dark:bg-muted/10">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">{t("facts.title")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("facts.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {facts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-md transition-all duration-300"
              >
                <div className="text-5xl font-bold text-primary mb-3">
                  {fact.stat}
                </div>
                <p className="text-muted-foreground">{fact.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Need Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-2 bg-primary/10 dark:bg-primary/5 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="w-10 h-10" />
                    </div>
                    <div className="text-4xl font-bold mb-2 text-primary">
                      {t("emergency.stat")}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t("emergency.statLabel")}
                    </p>
                  </div>
                </div>
                <div className="md:col-span-3 p-8">
                  <h3 className="text-2xl font-semibold mb-4">
                    {t("emergency.title")}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {t("emergency.description")}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mb-6">
                    <Activity className="w-4 h-4 mr-2" />
                    {t("emergency.update")}
                  </div>
                  <Button asChild>
                    <Link href="/be-donor" className="flex items-center">
                      {t("emergency.cta")}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
