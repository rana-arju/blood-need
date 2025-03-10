"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Droplet, Activity, ThumbsUp, Clock, User } from "lucide-react";

export default function BloodDonation101Page() {
  const t = useTranslations("education.content.basics");

  return (
    <div className="container mx-auto py-8 px-1 md:px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-primary">
          {t("title")}
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-5">
        <div className="md:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="text-primary h-5 w-5" />
                  {t("whatIsBloodDonation")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{t("whatIsBloodDonationContent")}</p>

                <div className="grid gap-4 md:grid-cols-3 mt-6">
                  <div className="bg-background rounded-lg p-4 border border-border shadow-sm">
                    <div className="flex items-center gap-2 mb-2 font-medium">
                      <Droplet className="text-red-500 h-4 w-4" />
                      {t("donationTypes.whole")}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t("donationTypes.wholeDescription")}
                    </p>
                  </div>

                  <div className="bg-background rounded-lg p-4 border border-border shadow-sm">
                    <div className="flex items-center gap-2 mb-2 font-medium">
                      <Droplet className="text-yellow-500 h-4 w-4" />
                      {t("donationTypes.plasma")}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t("donationTypes.plasmaDescription")}
                    </p>
                  </div>

                  <div className="bg-background rounded-lg p-4 border border-border shadow-sm">
                    <div className="flex items-center gap-2 mb-2 font-medium">
                      <Droplet className="text-blue-500 h-4 w-4" />
                      {t("donationTypes.platelets")}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t("donationTypes.plateletsDescription")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="text-primary h-5 w-5" />
                  {t("eligibility.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <span>{t("eligibility.age")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <span>{t("eligibility.weight")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <span>{t("eligibility.health")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <span>{t("eligibility.hemoglobin")}</span>
                  </li>
                </ul>

                <div className="bg-muted/50 p-4 rounded-lg mt-6">
                  <p className="text-sm">
                    <strong>Note:</strong> Eligibility criteria may vary
                    slightly between different blood donation centers and
                    countries. Always check with your local blood donation
                    center for the most accurate information.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="text-primary h-5 w-5" />
                  {t("process.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="relative border-l border-primary/30 ml-3 space-y-6">
                  <li className="mb-6 ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full -left-4 ring-4 ring-background text-primary">
                      1
                    </span>
                    <h3 className="font-medium leading-tight">
                      {t("process.registration").substring(3)}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      You'll need to fill out a form with your personal details
                      and answer some health-related questions.
                    </p>
                  </li>
                  <li className="mb-6 ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full -left-4 ring-4 ring-background text-primary">
                      2
                    </span>
                    <h3 className="font-medium leading-tight">
                      {t("process.screening").substring(3)}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      A healthcare professional will check your blood pressure,
                      pulse, temperature and hemoglobin levels.
                    </p>
                  </li>
                  <li className="mb-6 ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full -left-4 ring-4 ring-background text-primary">
                      3
                    </span>
                    <h3 className="font-medium leading-tight">
                      {t("process.donation").substring(3)}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      The actual donation is quick and almost painless. You'll
                      be seated comfortably while about 450ml of blood is
                      collected.
                    </p>
                  </li>
                  <li className="ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full -left-4 ring-4 ring-background text-primary">
                      4
                    </span>
                    <h3 className="font-medium leading-tight">
                      {t("process.recovery").substring(3)}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      After donating, you'll rest and enjoy light refreshments.
                      This helps your body start to replenish the donated blood.
                    </p>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="sticky top-24">
            <Card className="bg-primary/5 mb-6">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Blood Facts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Droplet className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        One donation can save up to 3 lives
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Different blood components can be used for different
                        medical treatments.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        Every 2 seconds someone needs blood
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Blood is needed for emergencies and for people who have
                        cancer, blood disorders, and other conditions.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        Red blood cells last 42 days
                      </p>
                      <p className="text-xs text-muted-foreground">
                        After donation, red cells can be stored for 42 days
                        while platelets last just 5 days.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <ThumbsUp className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        Most healthy adults can donate
                      </p>
                      <p className="text-xs text-muted-foreground">
                        If you're in good health, 18 or older (16 with parental
                        consent in most areas), and weigh at least 50kg, you're
                        likely eligible.
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Benefits of Donating
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Free health screening</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-sm">
                      Reduces risk of heart disease
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Burns calories</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Reduces iron stores</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Produces new blood cells</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-sm">
                      Provides a sense of contribution
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
