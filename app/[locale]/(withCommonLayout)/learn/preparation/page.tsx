"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertCircle,
  Calendar,
  Clock,
  ThumbsUp,
  Utensils,
  Droplet,
  Moon,
  HeartPulse,
} from "lucide-react";

export default function PreparationPage() {
  const t = useTranslations("education.content.preparation");

  return (
    <div className="container mx-auto py-8 px-4">
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

      <div className="grid gap-8 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-3"
        >
          <Card className="mb-8 overflow-hidden border-2 border-muted">
            <div className="bg-primary/5 p-6">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
                  The Complete Preparation Guide
                </h2>
                <p className="text-muted-foreground">
                  Proper preparation ensures a successful donation experience.
                  Follow these guidelines before, during, and after your
                  donation to ensure your safety and comfort.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader className="bg-primary/5 pb-2">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Calendar className="text-primary h-5 w-5" />
                {t("beforeDonation.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full mt-0.5">
                    <Moon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium">{t("beforeDonation.sleep")}</p>
                    <p className="text-sm text-muted-foreground">
                      Being well-rested helps prevent dizziness during and after
                      donation.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-full mt-0.5">
                    <Utensils className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium">{t("beforeDonation.eat")}</p>
                    <p className="text-sm text-muted-foreground">
                      A healthy meal helps maintain your blood sugar levels
                      during donation.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="bg-cyan-100 dark:bg-cyan-900/20 p-2 rounded-full mt-0.5">
                    <Droplet className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-medium">{t("beforeDonation.drink")}</p>
                    <p className="text-sm text-muted-foreground">
                      Being well-hydrated makes it easier to find veins and
                      helps prevent dizziness.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-full mt-0.5">
                    <HeartPulse className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="font-medium">{t("beforeDonation.iron")}</p>
                    <p className="text-sm text-muted-foreground">
                      Foods like red meat, spinach, beans, and fortified cereals
                      can boost iron levels.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="bg-amber-100 dark:bg-amber-900/20 p-2 rounded-full mt-0.5">
                    <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="font-medium">{t("beforeDonation.avoid")}</p>
                    <p className="text-sm text-muted-foreground">
                      These can affect your hydration levels and the quality of
                      your donated blood.
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                <h3 className="font-medium mb-2">Iron-Rich Foods</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>Red meat</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>Spinach</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>Beans</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>Lentils</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>Tofu</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>Fortified cereals</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>Liver</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span>Dried fruits</span>
                  </div>
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
          <Card className="h-full">
            <CardHeader className="bg-primary/5 pb-2">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Clock className="text-primary h-5 w-5" />
                {t("dayOf.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                <li>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <p className="font-medium">{t("dayOf.wear")}</p>
                  </div>
                  <p className="text-sm text-muted-foreground pl-4">
                    Short sleeves or sleeves that can be easily rolled up make
                    the donation process easier.
                  </p>
                </li>

                <li>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <p className="font-medium">{t("dayOf.bring")}</p>
                  </div>
                  <p className="text-sm text-muted-foreground pl-4">
                    You'll need identification, and it's helpful to know what
                    medications you're taking.
                  </p>
                </li>

                <li>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <p className="font-medium">{t("dayOf.schedule")}</p>
                  </div>
                  <p className="text-sm text-muted-foreground pl-4">
                    This includes registration, screening, donation (about 10
                    minutes), and recovery time.
                  </p>
                </li>

                <li>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <p className="font-medium">{t("dayOf.relax")}</p>
                  </div>
                  <p className="text-sm text-muted-foreground pl-4">
                    Stress and anxiety can affect your blood pressure. Deep
                    breathing helps if you're nervous.
                  </p>
                </li>
              </ul>

              <div className="mt-6 p-4 border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-900/30 rounded-lg">
                <h3 className="font-medium flex items-center gap-2 text-amber-800 dark:text-amber-300">
                  <AlertCircle className="h-4 w-4" />
                  Time-based Eligibility
                </h3>
                <p className="text-sm mt-2 text-amber-700 dark:text-amber-400">
                  Remember that the minimum time between whole blood donations
                  is typically 8 weeks (56 days). For platelets and plasma, you
                  can donate more frequently.
                </p>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-3">What to Expect</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm font-medium">1. Registration</p>
                    <p className="text-xs text-muted-foreground">
                      Complete paperwork, show ID
                    </p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm font-medium">2. Health History</p>
                    <p className="text-xs text-muted-foreground">
                      Private interview about health history
                    </p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm font-medium">3. Mini-Physical</p>
                    <p className="text-xs text-muted-foreground">
                      Check temperature, pulse, blood pressure, hemoglobin
                    </p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm font-medium">4. Donation</p>
                    <p className="text-xs text-muted-foreground">
                      8-10 minutes for whole blood donation
                    </p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm font-medium">5. Refreshments</p>
                    <p className="text-xs text-muted-foreground">
                      Rest and enjoy snacks and drinks
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader className="bg-primary/5 pb-2">
              <CardTitle className="flex items-center gap-2 text-xl">
                <ThumbsUp className="text-primary h-5 w-5" />
                {t("afterDonation.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 text-xl font-bold text-primary">1</div>
                  <div>
                    <p className="font-medium">{t("afterDonation.rest")}</p>
                    <p className="text-sm text-muted-foreground">
                      This helps your body adjust to the volume change and
                      prevents lightheadedness.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="mt-0.5 text-xl font-bold text-primary">2</div>
                  <div>
                    <p className="font-medium">{t("afterDonation.hydrate")}</p>
                    <p className="text-sm text-muted-foreground">
                      Extra fluids help your body replace the donated blood
                      volume more quickly.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="mt-0.5 text-xl font-bold text-primary">3</div>
                  <div>
                    <p className="font-medium">{t("afterDonation.avoid")}</p>
                    <p className="text-sm text-muted-foreground">
                      Heavy lifting, intense exercise, or other strenuous
                      activities could cause dizziness.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="mt-0.5 text-xl font-bold text-primary">4</div>
                  <div>
                    <p className="font-medium">{t("afterDonation.eat")}</p>
                    <p className="text-sm text-muted-foreground">
                      Nutritious meals help replenish your body, and avoiding
                      alcohol prevents dehydration.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="mt-0.5 text-xl font-bold text-primary">5</div>
                  <div>
                    <p className="font-medium">{t("afterDonation.bandage")}</p>
                    <p className="text-sm text-muted-foreground">
                      This helps prevent bruising at the donation site.
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-lg">
                <h3 className="font-medium text-red-800 dark:text-red-400 mb-2">
                  When to Seek Help
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                  While rare, some donors may experience:
                </p>
                <ul className="space-y-2 text-sm text-red-700 dark:text-red-300">
                  <li className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>Prolonged dizziness or fainting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>Prolonged bleeding at donation site</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>Pain or swelling in arm</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>Tingling sensations or numbness</span>
                  </li>
                </ul>
                <p className="text-sm font-medium text-red-800 dark:text-red-400 mt-3">
                  If you experience any of these symptoms, contact the donation
                  center or seek medical attention.
                </p>
              </div>

              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 rounded-lg">
                <h3 className="font-medium text-green-800 dark:text-green-400 mb-2">
                  Recovery Timeline
                </h3>
                <ul className="space-y-3 text-green-700 dark:text-green-300">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>
                      Within 24 hours: Plasma volume returns to normal
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>
                      Within 48 hours: Most donors feel completely normal
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>2-4 weeks: Red blood cells fully replenished</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>8 weeks: Safe to donate whole blood again</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
