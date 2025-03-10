"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import BloodDonationQuiz from "@/components/education/BloodDonationQuiz";

export default function QuizPage() {
  const t = useTranslations("education");

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-primary">
          {t("tabs.quiz")}
        </h3>
        <p className="max-w-2xl mx-auto text-muted-foreground">
          Test your knowledge about blood donation with this interactive quiz.
          Learn important facts that every donor should know!
        </p>
        <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
      </motion.div>

      <BloodDonationQuiz />
    </div>
  );
}
