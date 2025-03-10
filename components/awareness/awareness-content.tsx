"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  AlertTriangle,
  CheckCircle,
  Shield,
  Users,
  Heart,
  Share2,
  ExternalLink,
  Droplet,
  AlertCircle,
  Info,
} from "lucide-react";

export default function AwarenessContent() {
  const t = useTranslations("Awareness");

  const donorAwarenessItems = [
    {
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      title: t("donor.eligibility.title"),
      description: t("donor.eligibility.description"),
    },
    {
      icon: <Heart className="h-6 w-6 text-red-500" />,
      title: t("donor.benefits.title"),
      description: t("donor.benefits.description"),
    },
    {
      icon: <AlertCircle className="h-6 w-6 text-amber-500" />,
      title: t("donor.precautions.title"),
      description: t("donor.precautions.description"),
    },
    {
      icon: <Droplet className="h-6 w-6 text-blue-500" />,
      title: t("donor.process.title"),
      description: t("donor.process.description"),
    },
  ];

  const fraudPreventionItems = [
    {
      icon: <AlertTriangle className="h-6 w-6 text-red-500" />,
      title: t("fraud.signs.title"),
      description: t("fraud.signs.description"),
      points: [
        t("fraud.signs.points.urgent"),
        t("fraud.signs.points.pressure"),
        t("fraud.signs.points.payment"),
        t("fraud.signs.points.personal"),
        t("fraud.signs.points.inconsistent"),
      ],
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-500" />,
      title: t("fraud.protection.title"),
      description: t("fraud.protection.description"),
      points: [
        t("fraud.protection.points.verify"),
        t("fraud.protection.points.platform"),
        t("fraud.protection.points.information"),
        t("fraud.protection.points.report"),
        t("fraud.protection.points.direct"),
      ],
    },
    {
      icon: <Users className="h-6 w-6 text-green-500" />,
      title: t("fraud.community.title"),
      description: t("fraud.community.description"),
      points: [
        t("fraud.community.points.share"),
        t("fraud.community.points.educate"),
        t("fraud.community.points.support"),
        t("fraud.community.points.feedback"),
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-2 px-3 mb-6 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <Info className="w-4 h-4 mr-2" />
            {t("badge")}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            {t("title")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">{t("subtitle")}</p>
        </motion.div>

        <Tabs defaultValue="donor" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="donor">{t("tabs.donor")}</TabsTrigger>
            <TabsTrigger value="fraud">{t("tabs.fraud")}</TabsTrigger>
          </TabsList>

          <TabsContent value="donor" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {donorAwarenessItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="mt-1">{item.icon}</div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="bg-muted/30 dark:bg-muted/10 rounded-lg p-6 md:p-8 mt-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3 relative">
                  <div className="aspect-video relative rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=200&width=300"
                      alt={t("donor.cta.imageAlt")}
                      width={300}
                      height={200}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold mb-4">
                    {t("donor.cta.title")}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {t("donor.cta.description")}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button asChild>
                      <Link href="/be-donor">{t("donor.cta.primary")}</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/faq">{t("donor.cta.secondary")}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="fraud" className="space-y-8">
            {fraudPreventionItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex items-start gap-4 md:w-1/2">
                        <div className="mt-1">{item.icon}</div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <div className="md:w-1/2">
                        <ul className="space-y-2">
                          {item.points.map((point, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm"
                            >
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded-lg p-6 mt-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {t("fraud.report.title")}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {t("fraud.report.description")}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="destructive" asChild>
                      <Link href="/contact">{t("fraud.report.button")}</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      asChild
                    >
                      <Link href="/faq#fraud">
                        <Info className="h-4 w-4" />
                        {t("fraud.report.learn")}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 dark:bg-muted/10 rounded-lg p-6 md:p-8 mt-4">
              <h3 className="text-xl font-semibold mb-4">
                {t("fraud.share.title")}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t("fraud.share.description")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  {t("fraud.share.social")}
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link href={t("fraud.share.resourceUrl")} target="_blank">
                    <ExternalLink className="h-4 w-4" />
                    {t("fraud.share.resource")}
                  </Link>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
