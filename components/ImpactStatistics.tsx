"use client";

import type React from "react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Users, Droplet, HeartPulse, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: string;
  delay: number;
}

const formatNumber = (num: number) => {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M"; // Millions
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K"; // Thousands
  return num.toLocaleString(); // Default formatting
};

const StatItem = ({ icon, value, label, color, delay }: StatItemProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepTime = duration / steps;
    const increment = value / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      setCount(Math.min(Math.round(increment * currentStep), value));

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="flex flex-col items-center p-6 rounded-xl bg-background border shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className={cn("p-4 rounded-full mb-4", color)}>{icon}</div>
      <h3 className="text-3xl md:text-4xl font-bold mb-2 text-red-500">
        {formatNumber(count)}
      </h3>
      <p className="text-muted-foreground text-center">{label}</p>
    </motion.div>
  );
};

interface ImpactStatisticsProps {
  users: number;
  donors: number;
  requests: number;
  events: number;
}

export default function ImpactStatistics() {
  const t = useTranslations("Statistics");
  const [data, setData] = useState<ImpactStatisticsProps>({
    users: 0,
    donors: 0,
    requests: 0,
    events: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/statistics`
        );
        const result = await response.json();
        setData(result?.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchData();
  }, []);
  /*
  const defaultStats = {
    users: 1578000, // 1.57M
    donors: 10450, // 10.4K
    requests: 123400, // 123.4K
    events: 320, // 320
  };
*/
  const finalStats = data;

  return (
    <section className="py-16 px-1 md:px-6 container mx-auto">
      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatItem
            icon={<Users className="h-8 w-8 text-white" />}
            value={finalStats.users}
            label={t("totalUsers")}
            color="bg-blue-500"
            delay={1}
          />
          <StatItem
            icon={<Droplet className="h-8 w-8 text-white" />}
            value={finalStats.donors}
            label={t("totalDonors")}
            color="bg-red-500"
            delay={2}
          />
          <StatItem
            icon={<HeartPulse className="h-8 w-8 text-white" />}
            value={finalStats.requests}
            label={t("totalRequests")}
            color="bg-purple-500"
            delay={3}
          />
          <StatItem
            icon={<Calendar className="h-8 w-8 text-white" />}
            value={finalStats.events}
            label={t("totalEvents")}
            color="bg-green-500"
            delay={4}
          />
        </div>
      </div>
    </section>
  );
}
