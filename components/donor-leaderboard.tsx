"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Trophy,
  Award,
  Heart,
  Droplet,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { TopDonor } from "@/services/donor-leaderboard";

export default function DonorLeaderboard({
  initialDonors,
}: {
  initialDonors: TopDonor[];
}) {
  const t = useTranslations("DonorLeaderboard");
  const [donors, setDonors] = useState<TopDonor[]>(initialDonors);
  const [loading, setLoading] = useState(false);

  // Fallback to client-side fetching if server-side data is not available
  useEffect(() => {
    if (initialDonors.length === 0) {
      setLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/donors/top?limit=6`)
        .then((res) => res.json())
        .then((data) => {
          setDonors(data.donors);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching top donors:", err);
          setLoading(false);
        });
    }
  }, [initialDonors]);
console.log("donors", donors);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Trophy className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Trophy className="w-5 h-5 text-amber-700" />;
      default:
        return <Award className="w-5 h-5 text-primary" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-muted/30 dark:bg-muted/10">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-2 px-3 mb-6 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <Heart className="w-4 h-4 mr-2" />
            {t("badge")}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {donors?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donors?.map((donor, index) => (
              <motion.div
                key={donor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                          <Image
                            src={
                              donor.image ||
                              "/placeholder.svg?height=100&width=100"
                            }
                            alt={donor.name}
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center">
                          {getRankIcon(donor.rank)}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{donor.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Droplet className="w-3 h-3 mr-1 text-primary" />
                          {donor.blood}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        {t("donations")}
                      </span>
                      <span className="text-sm font-bold">
                        {donor.donations}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(donor.donations / 25) * 100}%` }}
                      ></div>
                    </div>

                    <div className="mt-4 text-center">
                      <div className="text-xs text-muted-foreground">
                        {t("impact", { count: donor.donations * 3 })}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground mb-4">{t("noDonors")}</p>
          </div>
        )}

        <div className="text-center mt-10">
          <Button asChild>
            <Link href="/be-donor" className="flex items-center">
              {t("cta")}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
