"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Trophy, Award, Heart, Droplet, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface Donor {
  id: number;
  name: string;
  donations: number;
  bloodType: string;
  avatar: string;
  rank: number;
}

export default function DonorLeaderboard() {
  const t = useTranslations("DonorLeaderboard");

  const donors: Donor[] = [
    {
      id: 1,
      name: t("donors.1.name"),
      donations: 24,
      bloodType: "O+",
      avatar: "https://res.cloudinary.com/db8l1ulfq/image/upload/v1740566021/sygfps6phbgv3iozj7vy.jpg",
      rank: 1,
    },
    {
      id: 2,
      name: t("donors.2.name"),
      donations: 21,
      bloodType: "A-",
      avatar: "https://res.cloudinary.com/db8l1ulfq/image/upload/v1740566021/sygfps6phbgv3iozj7vy.jpg",
      rank: 2,
    },
    {
      id: 3,
      name: t("donors.3.name"),
      donations: 19,
      bloodType: "B+",
      avatar: "https://res.cloudinary.com/db8l1ulfq/image/upload/v1740566021/sygfps6phbgv3iozj7vy.jpg",
      rank: 3,
    },
    {
      id: 4,
      name: t("donors.4.name"),
      donations: 16,
      bloodType: "AB+",
      avatar: "https://res.cloudinary.com/db8l1ulfq/image/upload/v1740566021/sygfps6phbgv3iozj7vy.jpg",
      rank: 4,
    },
    {
      id: 5,
      name: t("donors.5.name"),
      donations: 14,
      bloodType: "O-",
      avatar: "https://res.cloudinary.com/db8l1ulfq/image/upload/v1740566021/sygfps6phbgv3iozj7vy.jpg",
      rank: 5,
    },
    {
      id: 6,
      name: t("donors.6.name"),
      donations: 12,
      bloodType: "A+",
      avatar: "https://res.cloudinary.com/db8l1ulfq/image/upload/v1740566021/sygfps6phbgv3iozj7vy.jpg",
      rank: 6,
    },
  ];

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donors.map((donor, index) => (
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
                          src={donor.avatar || "/placeholder.svg"}
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
                        {donor.bloodType}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      {t("donations")}
                    </span>
                    <span className="text-sm font-bold">{donor.donations}</span>
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
