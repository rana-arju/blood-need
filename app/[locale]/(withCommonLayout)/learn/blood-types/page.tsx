"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Check, X } from "lucide-react";
import BloodTypeChart from "@/components/education/BloodTypeChart";

export default function BloodTypesPage() {
  const t = useTranslations("education.content.bloodTypes");

  return (
    <div className="py-8 px-1 md:px-4 container mx-auto">
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
                <CardTitle className="text-lg sm:text-xl md:text-2xl">
                  {t("introduction")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6">
                  Your blood type is determined by the presence or absence of
                  certain antigens – substances that can trigger an immune
                  response if they are foreign to the body. There are four main
                  blood groups: A, B, AB, and O, which are determined by the
                  presence or absence of A and B antigens on red blood cells.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="relative bg-background rounded-lg p-4 border border-border shadow-sm text-center">
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">
                      38%
                    </div>
                    <div className="text-2xl font-bold text-red-500">A+</div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Most common
                    </p>
                  </div>

                  <div className="bg-background rounded-lg p-4 border border-border shadow-sm text-center">
                    <div className="text-2xl font-bold text-red-500">A-</div>
                    <p className="text-xs text-muted-foreground mt-2">
                      6% of population
                    </p>
                  </div>

                  <div className="bg-background rounded-lg p-4 border border-border shadow-sm text-center">
                    <div className="text-2xl font-bold text-blue-500">B+</div>
                    <p className="text-xs text-muted-foreground mt-2">
                      9% of population
                    </p>
                  </div>

                  <div className="bg-background rounded-lg p-4 border border-border shadow-sm text-center">
                    <div className="text-2xl font-bold text-blue-500">B-</div>
                    <p className="text-xs text-muted-foreground mt-2">
                      2% of population
                    </p>
                  </div>

                  <div className="bg-background rounded-lg p-4 border border-border shadow-sm text-center">
                    <div className="text-2xl font-bold text-purple-500">
                      AB+
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      3% of population
                    </p>
                  </div>

                  <div className="bg-background rounded-lg p-4 border border-border shadow-sm text-center">
                    <div className="text-2xl font-bold text-purple-500">
                      AB-
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      1% of population
                    </p>
                  </div>

                  <div className="bg-background rounded-lg p-4 border border-border shadow-sm text-center">
                    <div className="text-2xl font-bold text-green-500">O+</div>
                    <p className="text-xs text-muted-foreground mt-2">
                      34% of population
                    </p>
                  </div>

                  <div className="relative bg-background rounded-lg p-4 border border-border shadow-sm text-center">
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">
                      Universal
                    </div>
                    <div className="text-2xl font-bold text-green-500">O-</div>
                    <p className="text-xs text-muted-foreground mt-2">
                      7% of population
                    </p>
                  </div>
                </div>

                <Tabs defaultValue="compatibility">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="compatibility">
                      Compatibility
                    </TabsTrigger>
                    <TabsTrigger value="systems">Group Systems</TabsTrigger>
                  </TabsList>
                  <TabsContent value="compatibility" className="pt-4">
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-2">
                        Who can receive from whom?
                      </h3>
                      <div className="space-y-3 mt-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-red-100 dark:bg-red-900/20 text-red-500 font-bold p-2 rounded-lg w-10 h-10 flex items-center justify-center">
                            A+
                          </div>
                          <div className="text-sm">{t("types.aPositive")}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-red-100 dark:bg-red-900/20 text-red-500 font-bold p-2 rounded-lg w-10 h-10 flex items-center justify-center">
                            A-
                          </div>
                          <div className="text-sm">{t("types.aNegative")}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-500 font-bold p-2 rounded-lg w-10 h-10 flex items-center justify-center">
                            B+
                          </div>
                          <div className="text-sm">{t("types.bPositive")}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-500 font-bold p-2 rounded-lg w-10 h-10 flex items-center justify-center">
                            B-
                          </div>
                          <div className="text-sm">{t("types.bNegative")}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-purple-100 dark:bg-purple-900/20 text-purple-500 font-bold p-2 rounded-lg w-10 h-10 flex items-center justify-center">
                            AB+
                          </div>
                          <div className="text-sm">{t("types.abPositive")}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-purple-100 dark:bg-purple-900/20 text-purple-500 font-bold p-2 rounded-lg w-10 h-10 flex items-center justify-center">
                            AB-
                          </div>
                          <div className="text-sm">{t("types.abNegative")}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-green-100 dark:bg-green-900/20 text-green-500 font-bold p-2 rounded-lg w-10 h-10 flex items-center justify-center">
                            O+
                          </div>
                          <div className="text-sm">{t("types.oPositive")}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-green-100 dark:bg-green-900/20 text-green-500 font-bold p-2 rounded-lg w-10 h-10 flex items-center justify-center">
                            O-
                          </div>
                          <div className="text-sm">{t("types.oNegative")}</div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="systems" className="pt-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        Blood Group Systems
                      </h3>
                      <p className="text-sm mb-4">
                        While ABO is the most well-known, there are over 30
                        blood group systems. The most clinically significant
                        ones include:
                      </p>
                      <div className="space-y-4">
                        <div className="border border-border rounded-lg p-4">
                          <h4 className="font-medium">ABO System</h4>
                          <p className="text-sm text-muted-foreground">
                            Categorizes blood into A, B, AB, and O types based
                            on antigens present on red blood cells.
                          </p>
                        </div>
                        <div className="border border-border rounded-lg p-4">
                          <h4 className="font-medium">Rhesus (Rh) System</h4>
                          <p className="text-sm text-muted-foreground">
                            Determines if blood is positive or negative based on
                            the presence or absence of the D antigen.
                          </p>
                        </div>
                        <div className="border border-border rounded-lg p-4">
                          <h4 className="font-medium">Kell System</h4>
                          <p className="text-sm text-muted-foreground">
                            The third most important system in transfusion
                            medicine, with K being the most significant antigen.
                          </p>
                        </div>
                        <div className="border border-border rounded-lg p-4">
                          <h4 className="font-medium">Duffy System</h4>
                          <p className="text-sm text-muted-foreground">
                            Named after the patient in whom it was discovered,
                            important in certain populations.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
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
                <CardTitle>{t("rhFactor.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{t("rhFactor.description")}</p>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-medium text-lg mb-2 flex items-center gap-2">
                      <span className="text-red-500 text-sm">+</span> Rh
                      Positive
                    </h3>
                    <p className="text-sm">
                      People with Rh-positive blood have the Rh antigen on their
                      red blood cells. About 85% of people are Rh-positive.
                    </p>
                    <div className="mt-4 text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Can receive both Rh+ and Rh- blood</span>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Can donate to Rh+ recipients</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <X className="h-4 w-4 text-red-500" />
                        <span>Cannot donate to Rh- recipients</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-medium text-lg mb-2 flex items-center gap-2">
                      <span className="text-red-500 text-sm">−</span> Rh
                      Negative
                    </h3>
                    <p className="text-sm">
                      People with Rh-negative blood don't have the Rh antigen.
                      About 15% of people are Rh-negative.
                    </p>
                    <div className="mt-4 text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Can receive only Rh- blood</span>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Can donate to both Rh+ and Rh- recipients</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                        <span>Rh- pregnant women may need special care</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 mt-6">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    Medical Importance
                  </h3>
                  <p className="text-sm">
                    Rh factor is especially important during pregnancy. If an
                    Rh-negative woman is pregnant with an Rh-positive baby, her
                    body may produce antibodies against the baby's blood cells,
                    causing hemolytic disease of the newborn (HDN). This is
                    typically prevented with an injection of Rh immunoglobulin
                    (RhIg) during pregnancy and after delivery.
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
                <CardTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                  {t("compatibility.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6">{t("compatibility.description")}</p>

                <BloodTypeChart />

                <div className="mt-6 p-4 border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-900/30 rounded-lg">
                  <h3 className="font-medium flex items-center gap-2 text-amber-800 dark:text-amber-300">
                    <AlertCircle className="h-4 w-4" />
                    Important Note
                  </h3>
                  <p className="text-sm mt-2 text-amber-700 dark:text-amber-400">
                    While this chart shows general compatibility, in emergency
                    situations, medical professionals may make different
                    decisions based on specific circumstances. Always follow
                    medical advice regarding blood transfusions.
                  </p>
                </div>
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
                  Did You Know?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="bg-background rounded-lg p-3 border border-border shadow-sm">
                    <p className="text-sm">
                      <strong>Universal Donor:</strong> Blood type O-negative is
                      called the universal donor because it can be given to
                      patients of all blood types in emergencies.
                    </p>
                  </li>
                  <li className="bg-background rounded-lg p-3 border border-border shadow-sm">
                    <p className="text-sm">
                      <strong>Universal Recipient:</strong> Blood type
                      AB-positive is called the universal recipient because
                      people with this type can receive blood from all blood
                      types.
                    </p>
                  </li>
                  <li className="bg-background rounded-lg p-3 border border-border shadow-sm">
                    <p className="text-sm">
                      <strong>Genetic Inheritance:</strong> Your blood type is
                      inherited from your parents and remains the same
                      throughout your life.
                    </p>
                  </li>
                  <li className="bg-background rounded-lg p-3 border border-border shadow-sm">
                    <p className="text-sm">
                      <strong>Geographic Distribution:</strong> Blood type
                      distribution varies by region. Type O is common in Native
                      Americans and Hispanic populations, while B is more common
                      in Asian populations.
                    </p>
                  </li>
                  <li className="bg-background rounded-lg p-3 border border-border shadow-sm">
                    <p className="text-sm">
                      <strong>Blood Type Diet:</strong> Despite some popular
                      beliefs, there is no scientific evidence supporting the
                      idea that your blood type should determine your diet.
                    </p>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Blood Type Discovery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Karl Landsteiner discovered the ABO blood group system in
                  1901, for which he received the Nobel Prize in Physiology or
                  Medicine in 1930.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-0.5"></div>
                    <span className="text-sm">
                      Before this discovery, blood transfusions were extremely
                      dangerous
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-0.5"></div>
                    <span className="text-sm">
                      His work made modern transfusion medicine possible
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-0.5"></div>
                    <span className="text-sm">
                      The Rh factor was discovered later in 1940
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-0.5"></div>
                    <span className="text-sm">
                      Today, over 30 blood group systems have been identified
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
