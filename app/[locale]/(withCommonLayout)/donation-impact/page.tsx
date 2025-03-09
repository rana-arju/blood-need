"use client";

import type React from "react";
import { useEffect, useState } from "react";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  Users,
  Activity,
  Calendar,
  TrendingUp,
  Award,
  BarChart3,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Define types for our story data
interface Story {
  title: string;
  description: string;
  impact: string;
  location: string;
  image: string;
}

export default function DonationImpact() {
  const t = useTranslations("DonationImpact");
  // Use state to store the stories data to prevent hydration issues
  const [stories, setStories] = useState<Story[]>([]);

  // Initialize stories after component mounts to avoid hydration mismatch
  useEffect(() => {
    setStories([
      {
        title: t("stories.surgery.title"),
        description: t("stories.surgery.description"),
        impact: t("stories.surgery.impact"),
        location: t("stories.surgery.location"),
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        title: t("stories.accident.title"),
        description: t("stories.accident.description"),
        impact: t("stories.accident.impact"),
        location: t("stories.accident.location"),
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        title: t("stories.cancer.title"),
        description: t("stories.cancer.description"),
        impact: t("stories.cancer.impact"),
        location: t("stories.cancer.location"),
        image: "/placeholder.svg?height=100&width=100",
      },
    ]);
  }, [t]);

  const impacts = [
    {
      icon: <Heart className="w-6 h-6" />,
      stat: t("impacts.lives.stat"),
      title: t("impacts.lives.title"),
      description: t("impacts.lives.description"),
    },
    {
      icon: <Users className="w-6 h-6" />,
      stat: t("impacts.community.stat"),
      title: t("impacts.community.title"),
      description: t("impacts.community.description"),
    },
    {
      icon: <Activity className="w-6 h-6" />,
      stat: t("impacts.emergency.stat"),
      title: t("impacts.emergency.title"),
      description: t("impacts.emergency.description"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background dark:from-primary/5" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 w-60 h-60 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-0 bottom-0 w-60 h-60 rounded-full bg-primary/10 blur-3xl" />
        </div>
        <div className="container px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center p-2 px-3 mb-6 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <Heart className="w-4 h-4 mr-2" />
              {t("hero.badge")}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t("hero.subtitle")}
            </p>
            <Button size="lg" asChild>
              <Link href="/register-donor">{t("hero.cta")}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {impacts.map((impact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="p-6 text-center h-full border-t-4 border-t-primary hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                    {impact.icon}
                  </div>
                  <div className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
                    {impact.stat}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{impact.title}</h3>
                  <p className="text-muted-foreground">{impact.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 md:py-24 bg-muted/30 dark:bg-muted/10">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">{t("stories.title")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("stories.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary">
                        <Image
                          src={story.image || "/placeholder.svg"}
                          alt={story.title}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">
                          {story.title}
                        </h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3 mr-1" />
                          {story.location}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {story.description}
                    </p>
                    <div className="text-sm font-medium text-primary bg-primary/10 p-2 rounded-md inline-block">
                      {story.impact}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Tabs defaultValue="journey" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="journey">{t("tabs.journey")}</TabsTrigger>
                  <TabsTrigger value="stats">{t("tabs.stats")}</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="journey" className="space-y-4">
                <Card className="p-6">
                  <h3 className="text-2xl font-bold mb-6 text-center">
                    {t("timeline.title")}
                  </h3>
                  <div className="space-y-8">
                    <TimelineItem
                      icon={<Calendar className="w-5 h-5" />}
                      title={t("timeline.donation.title")}
                      description={t("timeline.donation.description")}
                      step="01"
                    />
                    <TimelineItem
                      icon={<TrendingUp className="w-5 h-5" />}
                      title={t("timeline.processing.title")}
                      description={t("timeline.processing.description")}
                      step="02"
                    />
                    <TimelineItem
                      icon={<Award className="w-5 h-5" />}
                      title={t("timeline.impact.title")}
                      description={t("timeline.impact.description")}
                      step="03"
                    />
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="stats">
                <Card className="p-6">
                  <h3 className="text-2xl font-bold mb-6 text-center">
                    {t("stats.title")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {t("stats.monthly.label")}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {t("stats.monthly.value")}
                        </span>
                      </div>
                      <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {t("stats.yearly.label")}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {t("stats.yearly.value")}
                        </span>
                      </div>
                      <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                          <BarChart3 className="w-10 h-10" />
                        </div>
                        <div className="text-4xl font-bold mb-2">
                          {t("stats.total.value")}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {t("stats.total.label")}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function TimelineItem({
  icon,
  title,
  description,
  step,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  step: string;
}) {
  return (
    <div className="flex items-start space-x-4">
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
          {step}
        </div>
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-lg mb-1">{title}</h4>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
