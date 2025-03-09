"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Shield, Lock, FileText, Clock, Mail } from "lucide-react";

export default function PrivacyPolicyContent() {
  const t = useTranslations("Privacy");
  const lastUpdated = t("lastUpdated");

  const sections = [
    {
      id: "information",
      icon: <FileText className="h-5 w-5 text-primary" />,
      title: t("sections.information.title"),
      content: t("sections.information.content"),
      subsections: [
        {
          title: t("sections.information.personal.title"),
          content: t("sections.information.personal.content"),
          examples: t("sections.information.personal.examples"),
        },
        {
          title: t("sections.information.usage.title"),
          content: t("sections.information.usage.content"),
          examples: t("sections.information.usage.examples"),
        },
        {
          title: t("sections.information.cookies.title"),
          content: t("sections.information.cookies.content"),
        },
      ],
    },
    {
      id: "use",
      icon: <Shield className="h-5 w-5 text-primary" />,
      title: t("sections.use.title"),
      content: t("sections.use.content"),
      list: [
        t("sections.use.purposes.service"),
        t("sections.use.purposes.improve"),
        t("sections.use.purposes.communicate"),
        t("sections.use.purposes.security"),
        t("sections.use.purposes.legal"),
      ],
    },
    {
      id: "sharing",
      icon: <Lock className="h-5 w-5 text-primary" />,
      title: t("sections.sharing.title"),
      content: t("sections.sharing.content"),
      subsections: [
        {
          title: t("sections.sharing.thirdParties.title"),
          content: t("sections.sharing.thirdParties.content"),
        },
        {
          title: t("sections.sharing.legal.title"),
          content: t("sections.sharing.legal.content"),
        },
        {
          title: t("sections.sharing.consent.title"),
          content: t("sections.sharing.consent.content"),
        },
      ],
    },
    {
      id: "security",
      icon: <Lock className="h-5 w-5 text-primary" />,
      title: t("sections.security.title"),
      content: t("sections.security.content"),
      list: [
        t("sections.security.measures.encryption"),
        t("sections.security.measures.access"),
        t("sections.security.measures.review"),
        t("sections.security.measures.servers"),
      ],
    },
    {
      id: "rights",
      icon: <FileText className="h-5 w-5 text-primary" />,
      title: t("sections.rights.title"),
      content: t("sections.rights.content"),
      list: [
        t("sections.rights.options.access"),
        t("sections.rights.options.correct"),
        t("sections.rights.options.delete"),
        t("sections.rights.options.restrict"),
        t("sections.rights.options.object"),
        t("sections.rights.options.portability"),
      ],
    },
    {
      id: "retention",
      icon: <Clock className="h-5 w-5 text-primary" />,
      title: t("sections.retention.title"),
      content: t("sections.retention.content"),
    },
    {
      id: "children",
      icon: <Shield className="h-5 w-5 text-primary" />,
      title: t("sections.children.title"),
      content: t("sections.children.content"),
    },
    {
      id: "changes",
      icon: <FileText className="h-5 w-5 text-primary" />,
      title: t("sections.changes.title"),
      content: t("sections.changes.content"),
    },
    {
      id: "contact",
      icon: <Mail className="h-5 w-5 text-primary" />,
      title: t("sections.contact.title"),
      content: t("sections.contact.content"),
      email: "privacy@blooddonationcommunity.org",
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
            <Shield className="w-4 h-4 mr-2" />
            {t("badge")}
          </div>
          <h1 className="text-4xl font-bold mb-4 tracking-tight">
            {t("title")}
          </h1>
          <p className="text-muted-foreground">
            {t("effectiveDate")} {lastUpdated}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-4">{t("introduction")}</p>
              <p className="text-muted-foreground">{t("commitment")}</p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card id={section.id} className="scroll-mt-20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      {section.icon}
                      <h2 className="text-2xl font-semibold">
                        {section.title}
                      </h2>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {section.content}
                    </p>

                    {section.list && (
                      <ul className="list-disc pl-6 space-y-2 mb-4">
                        {section.list.map((item, idx) => (
                          <li key={idx} className="text-muted-foreground">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.subsections && (
                      <Accordion type="single" collapsible className="mt-4">
                        {section.subsections.map((subsection, idx) => (
                          <AccordionItem key={idx} value={`item-${idx}`}>
                            <AccordionTrigger className="text-base font-medium">
                              {subsection.title}
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="text-muted-foreground mb-2">
                                {subsection.content}
                              </p>
                              {subsection.examples && (
                                <div className="bg-muted/30 dark:bg-muted/10 p-3 rounded-md text-sm">
                                  <strong>{t("example")}:</strong>{" "}
                                  {subsection.examples}
                                </div>
                              )}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    )}

                    {section.email && (
                      <div className="mt-4 bg-muted/30 dark:bg-muted/10 p-4 rounded-md">
                        <p className="text-sm font-medium">
                          {t("sections.contact.email")}
                        </p>
                        <a
                          href={`mailto:${section.email}`}
                          className="text-primary hover:underline"
                        >
                          {section.email}
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">{t("questions")}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild>
                <Link href="/contact">{t("contactUs")}</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/faq">{t("faq")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
