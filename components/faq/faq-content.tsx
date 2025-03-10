"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  Search,
  Droplet,
  Heart,
  Shield,
  HelpCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

export default function FaqContent() {
  const t = useTranslations("FAQ");
  const [searchQuery, setSearchQuery] = useState("");

  // Define FAQ categories and their questions
  const categories = [
    {
      id: "blood",
      icon: <Droplet className="h-5 w-5" />,
      title: t("categories.blood.title"),
      description: t("categories.blood.description"),
      questions: [
        {
          id: "blood-types",
          question: t("questions.blood.types.question"),
          answer: t("questions.blood.types.answer"),
        },
        {
          id: "blood-compatibility",
          question: t("questions.blood.compatibility.question"),
          answer: t("questions.blood.compatibility.answer"),
        },
        {
          id: "blood-universal",
          question: t("questions.blood.universal.question"),
          answer: t("questions.blood.universal.answer"),
        },
        {
          id: "blood-components",
          question: t("questions.blood.components.question"),
          answer: t("questions.blood.components.answer"),
        },
        {
          id: "blood-shelf-life",
          question: t("questions.blood.shelfLife.question"),
          answer: t("questions.blood.shelfLife.answer"),
        },
      ],
    },
    {
      id: "donation",
      icon: <Heart className="h-5 w-5" />,
      title: t("categories.donation.title"),
      description: t("categories.donation.description"),
      questions: [
        {
          id: "donation-eligible",
          question: t("questions.donation.eligible.question"),
          answer: t("questions.donation.eligible.answer"),
        },
        {
          id: "donation-frequency",
          question: t("questions.donation.frequency.question"),
          answer: t("questions.donation.frequency.answer"),
        },
        {
          id: "donation-process",
          question: t("questions.donation.process.question"),
          answer: t("questions.donation.process.answer"),
        },
        {
          id: "donation-preparation",
          question: t("questions.donation.preparation.question"),
          answer: t("questions.donation.preparation.answer"),
        },
        {
          id: "donation-after",
          question: t("questions.donation.after.question"),
          answer: t("questions.donation.after.answer"),
        },
        {
          id: "donation-benefits",
          question: t("questions.donation.benefits.question"),
          answer: t("questions.donation.benefits.answer"),
        },
      ],
    },
    {
      id: "website",
      icon: <Info className="h-5 w-5" />,
      title: t("categories.website.title"),
      description: t("categories.website.description"),
      questions: [
        {
          id: "website-register",
          question: t("questions.website.register.question"),
          answer: t("questions.website.register.answer"),
        },
        {
          id: "website-request",
          question: t("questions.website.request.question"),
          answer: t("questions.website.request.answer"),
        },
        {
          id: "website-verify",
          question: t("questions.website.verify.question"),
          answer: t("questions.website.verify.answer"),
        },
        {
          id: "website-notifications",
          question: t("questions.website.notifications.question"),
          answer: t("questions.website.notifications.answer"),
        },
      ],
    },
    {
      id: "privacy",
      icon: <Shield className="h-5 w-5" />,
      title: t("categories.privacy.title"),
      description: t("categories.privacy.description"),
      questions: [
        {
          id: "privacy-data",
          question: t("questions.privacy.data.question"),
          answer: t("questions.privacy.data.answer"),
        },
        {
          id: "privacy-sharing",
          question: t("questions.privacy.sharing.question"),
          answer: t("questions.privacy.sharing.answer"),
        },
        {
          id: "privacy-delete",
          question: t("questions.privacy.delete.question"),
          answer: t("questions.privacy.delete.answer"),
        },
        {
          id: "privacy-security",
          question: t("questions.privacy.security.question"),
          answer: t("questions.privacy.security.answer"),
        },
      ],
    },
    {
      id: "awareness",
      icon: <AlertTriangle className="h-5 w-5" />,
      title: t("categories.awareness.title"),
      description: t("categories.awareness.description"),
      questions: [
        {
          id: "awareness-fraud",
          question: t("questions.awareness.fraud.question"),
          answer: t("questions.awareness.fraud.answer"),
        },
        {
          id: "awareness-verify",
          question: t("questions.awareness.verify.question"),
          answer: t("questions.awareness.verify.answer"),
        },
        {
          id: "awareness-report",
          question: t("questions.awareness.report.question"),
          answer: t("questions.awareness.report.answer"),
        },
        {
          id: "awareness-community",
          question: t("questions.awareness.community.question"),
          answer: t("questions.awareness.community.answer"),
        },
      ],
    },
  ];

  // Filter questions based on search query
  const filteredCategories = categories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  // Get all questions for the "All" tab
  const allQuestions = categories
    .flatMap((category) =>
      category.questions.map((q) => ({
        ...q,
        category: category.id,
        categoryTitle: category.title,
        icon: category.icon,
      }))
    )
    .filter(
      (q) =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-2 px-3 mb-6 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <HelpCircle className="w-4 h-4 mr-2" />
            {t("badge")}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            {t("title")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">{t("subtitle")}</p>
        </motion.div>

        <div className="max-w-3xl mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="flex flex-wrap justify-center mb-16">
              <TabsTrigger value="all">{t("tabs.all")}</TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  <span className="flex items-center gap-2">
                    {category.icon}
                    {category.title}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" >
              {searchQuery && allQuestions.length === 0 ? (
                <div className="text-center py-12">
                  <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">{t("noResults")}</h3>
                  <p className="text-muted-foreground">{t("tryDifferent")}</p>
                </div>
              ) : (
                <Accordion type="single" collapsible className="w-full pt-14">
                  {allQuestions.map((question) => (
                    <AccordionItem key={question.id} value={question.id}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 text-primary">
                            {question.icon}
                          </div>
                          <div>
                            <span>{question.question}</span>
                            <span className="block text-xs text-muted-foreground mt-1">
                              {question.categoryTitle}
                            </span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-8">{question.answer}</div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </TabsContent>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <Card className="mb-8 mt-24 md:mt-8">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 p-2 rounded-full bg-primary/10 text-primary">
                        {category.icon}
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold mb-2">
                          {category.title}
                        </h2>
                        <p className="text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {category.questions.length === 0 ? (
                  <div className="text-center py-12">
                    <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">
                      {t("noResults")}
                    </h3>
                    <p className="text-muted-foreground">{t("tryDifferent")}</p>
                  </div>
                ) : (
                  <Accordion type="single" collapsible className="w-full mt-10">
                    {category.questions.map((question) => (
                      <AccordionItem key={question.id} value={question.id}>
                        <AccordionTrigger className="text-left">
                          {question.question}
                        </AccordionTrigger>
                        <AccordionContent>{question.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-12 bg-muted/30 dark:bg-muted/10 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">
              {t("stillHaveQuestions")}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t("contactDescription")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link href="/contact">{t("contactUs")}</Link>
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                asChild
              >
                <Link href="/awareness">
                  <Info className="h-4 w-4" />
                  {t("learnMore")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
