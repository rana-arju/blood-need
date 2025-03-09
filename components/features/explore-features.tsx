"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Droplet, Users, Bell, Calendar, MapPin, Activity } from "lucide-react";

export default function ExploreFeatures() {
  const t = useTranslations("Features");

  const features = [
    {
      icon: <Droplet className="w-6 h-6" />,
      title: t("virtualTest.title"),
      description: t("virtualTest.description"),
      link: "/virtual-test",
      color: "bg-red-500/10 text-red-500",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t("matching.title"),
      description: t("matching.description"),
      link: "/donor-matching",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: t("alerts.title"),
      description: t("alerts.description"),
      link: "/emergency-alerts",
      color: "bg-orange-500/10 text-orange-500",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: t("scheduling.title"),
      description: t("scheduling.description"),
      link: "/schedule",
      color: "bg-green-500/10 text-green-500",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t("locations.title"),
      description: t("locations.description"),
      link: "/donation-centers",
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: t("tracking.title"),
      description: t("tracking.description"),
      link: "/donation-tracking",
      color: "bg-pink-500/10 text-pink-500",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-2">
                <div className="p-6">
                  <div
                    className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  <Link href={feature.link}>
                    <Button
                      variant="outline"
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                    >
                      {t("learnMore")}
                    </Button>
                  </Link>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary rounded-lg transition-all duration-300" />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
