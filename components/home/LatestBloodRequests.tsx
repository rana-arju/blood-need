"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Droplet,
  MapPin,
  Calendar,
  Clock,
  Star,
  ExternalLink,
} from "lucide-react";
import { useTheme } from "next-themes";
import AddReviewModal from "./AddReviewModal";

interface BloodRequest {
  id: string;
  bloodType: string;
  location: string;
  requiredDate: string;
  requiredTime: string;
  urgency: string;
}

interface LatestBloodRequestsProps {
  requests: BloodRequest[];
}

export default function LatestBloodRequests({
  requests,
}: LatestBloodRequestsProps) {
  const t = useTranslations("Home.latestRequests");
  const { theme } = useTheme();

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-500 text-white";
      case "medium":
        return "bg-yellow-500 text-black";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
            {t("title")}
          </h2>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {requests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <CardContent className="flex-grow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="text-lg font-semibold">
                      <Droplet className="w-4 h-4 mr-1 text-primary" />
                      {request.bloodType}
                    </Badge>
                    <Badge
                      className={`${getUrgencyColor(
                        request.urgency
                      )} capitalize`}
                    >
                      {request.urgency}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>{request.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>{request.requiredDate}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>{request.requiredTime}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Link href={`/requests/${request.id}`}>
                    <Button className="w-full">View Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center space-x-4">
          <Button asChild size="lg">
            <Link href="/requests">
              {t("viewAllButton")}
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
