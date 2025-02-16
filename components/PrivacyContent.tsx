"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const sections = [
  {
    title: "Information We Collect",
    content: "We collect information that you provide directly to us...",
  },
  {
    title: "How We Use Your Information",
    content:
      "We use the information we collect to operate and improve our services...",
  },
  {
    title: "Information Sharing",
    content:
      "We do not share your personal information with third parties except...",
  },
  // Add more sections
];

export function PrivacyContent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardContent className="p-6">
          <div className="prose dark:prose-invert max-w-none">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                <p className="text-muted-foreground">{section.content}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
