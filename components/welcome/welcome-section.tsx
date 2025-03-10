"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { CheckCircle, Heart, Users, Target, Droplet } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function WelcomeSection() {
  const t = useTranslations("Welcome");
  const { theme } = useTheme();

  const features = [
    { icon: <CheckCircle className="w-5 h-5" />, text: t("features.service") },
    { icon: <Heart className="w-5 h-5" />, text: t("features.bloodBank") },
    { icon: <Users className="w-5 h-5" />, text: t("features.support") },
    { icon: <Target className="w-5 h-5" />, text: t("features.health") },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="w-full py-8 md:py-16 lg:py-24 bg-background overflow-hidden ">
      <div className=" px-2 md:px-6 container mx-auto">
        {/* Red accent bar at top */}
        <div className="w-full h-1 bg-primary mb-8 rounded-full"></div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center space-y-6"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-2 self-start">
              <Droplet className="w-4 h-4 mr-1" />
              {t("subtitle").split(".")[0]}
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter  text-primary">
              {t("title")}
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-[600px]">
              {t("subtitle").split(".")[1]
                ? t("subtitle").split(".")[1].trim()
                : ""}
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-center space-x-3 bg-background border border-border rounded-lg p-3 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {feature.icon}
                  </div>
                  <span className="font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/be-donor">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground text-base rounded-full px-8"
                >
                  {t("buttons.donate")}
                </Button>
              </Link>
              <Link href="/learn/blood-donation-101">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8"
                >
                  {t("buttons.learn")}
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 bg-card rounded-2xl shadow-lg overflow-hidden border border-border">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>

              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid w-full grid-cols-2 p-1 m-3 bg-muted rounded-lg">
                  <TabsTrigger
                    value="about"
                    className="rounded-md py-2 data-[state=active]:bg-background"
                  >
                    {t("tabs.about")}
                  </TabsTrigger>
                  <TabsTrigger
                    value="mission"
                    className="rounded-md py-2 data-[state=active]:bg-background"
                  >
                    {t("tabs.mission")}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="p-0">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Image
                          src="https://res.cloudinary.com/db8l1ulfq/image/upload/v1741438933/blood-donation_2_frfuzm.png"
                          alt="BloodNeed"
                          width={40}
                          height={40}
                          className="text-primary object-cover"
                        />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold">
                        {t("about.title")}
                      </h3>
                    </div>

                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                      {t("about.content")}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mt-6 text-center">
                      <div className="bg-background p-4 rounded-lg border border-border">
                        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                          5000+
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Donors
                        </div>
                      </div>
                      <div className="bg-background p-4 rounded-lg border border-border">
                        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                          10000+
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Lives Saved
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="mission" className="p-0">
                  <div className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-24 h-10 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                          <Target
                            height={25}
                            width={25}
                            className=" text-primary"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2">
                            {t("mission.title")}
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                            {t("mission.content")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 mt-6">
                        <div className="w-24 h-10 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                          <Heart
                            height={25}
                            width={25}
                            className=" text-primary"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2">
                            {t("vision.title")}
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                            {t("vision.content")}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-[1px] bg-border my-6"></div>

                    <div className="flex justify-center">
                      <Link href="/learn/blood-donation-101">
                        <Button variant="outline" className="rounded-full">
                          {t("buttons.learn")}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
