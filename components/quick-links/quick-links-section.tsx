"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  AlertTriangle,
  HelpCircle,
  Shield,
  Users,
  Award,
  TrendingUp,
  ArrowRight,
  ChartNoAxesCombined,
} from "lucide-react";
import { useTheme } from "next-themes";

export default function QuickLinksSection() {
  const t = useTranslations("QuickLinks");
  const { theme } = useTheme();

  const links = [
    {
      title: t("awareness.title"),
      description: t("awareness.description"),
      icon: <AlertTriangle className="w-6 h-6" />,
      href: "/awareness",
      color:
        "bg-orange-500/10 text-orange-500 dark:bg-orange-500/20 dark:text-orange-400",
      hoverColor: "group-hover:bg-orange-500 group-hover:text-white",
    },
    {
      title: t("faq.title"),
      description: t("faq.description"),
      icon: <HelpCircle className="w-6 h-6" />,
      href: "/faq",
      color:
        "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400",
      hoverColor: "group-hover:bg-blue-500 group-hover:text-white",
    },
    {
      title: t("privacy.title"),
      description: t("privacy.description"),
      icon: <Shield className="w-6 h-6" />,
      href: "/privacy",
      color:
        "bg-green-500/10 text-green-500 dark:bg-green-500/20 dark:text-green-400",
      hoverColor: "group-hover:bg-green-500 group-hover:text-white",
    },
    {
      title: t("about.title"),
      description: t("about.description"),
      icon: <Users className="w-6 h-6" />,
      href: "/about",
      color:
        "bg-purple-500/10 text-purple-500 dark:bg-purple-500/20 dark:text-purple-400",
      hoverColor: "group-hover:bg-purple-500 group-hover:text-white",
    },
    {
      title: t("whyDonate.title"),
      description: t("whyDonate.description"),
      icon: <Award className="w-6 h-6" />,
      href: "/why-give-blood",
      color:
        "bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-400",
      hoverColor: "group-hover:bg-amber-500 group-hover:text-white",
    },
    {
      title: t("impact.title"),
      description: t("impact.description"),
      icon: <ChartNoAxesCombined className="w-6 h-6" />,
      href: "/donation-impact",
      color:
        "bg-cyan-500/10 text-cyan-500 dark:bg-cyan-500/20 dark:text-cyan-400",
      hoverColor: "group-hover:bg-cyan-500 group-hover:text-white",
    },
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
    <section className="py-16 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center p-2 px-3 mb-4 bg-primary/10 text-primary rounded-full text-sm font-medium"
          >
            <Shield className="w-4 h-4 mr-2" />
            {t("badge")}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          >
            {t("title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {links.map((link, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link href={link.href} className="block h-full">
                <div className="group relative h-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent group-hover:from-transparent group-hover:to-primary/10 transition-all duration-300"></div>

                  <div className="p-6 flex flex-col h-full">
                    <div
                      className={`w-12 h-12 rounded-lg ${link.color} ${link.hoverColor} flex items-center justify-center mb-4 transition-all duration-300`}
                    >
                      {link.icon}
                    </div>

                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                      {link.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 flex-grow">
                      {link.description}
                    </p>

                    <div className="flex items-center text-sm font-medium text-primary mt-auto">
                      <span className="mr-2">{t("learnMore")}</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
