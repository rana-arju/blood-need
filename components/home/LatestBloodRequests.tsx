"use client";

import { useEffect, useState } from "react";
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
  ExternalLink,
  Hospital,
  AlertTriangle,
} from "lucide-react";
import { getAllBloodRequests } from "@/services/bloodRegister";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton";

interface BloodRequest {
  id: string;
  blood: string;
  location: string;
  requiredDate: string; // This is a full date
  requireTime: string; // This is just a time stored as a date
  address: string;
  hospitalName: string;
}

export default function LatestBloodRequests() {
  const t = useTranslations("Home.latestRequests");
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to properly combine requiredDate and requireTime
  const getCombinedDateTime = (requiredDate: string, requireTime: string) => {
    // Extract the date part from requiredDate
    const datePart = moment(requiredDate).format("YYYY-MM-DD");

    // Extract just the time part from requireTime (which is stored as 1970-01-01T{time})
    const timePart = moment(requireTime).format("HH:mm");

    // Combine them into a proper datetime string
    return moment(`${datePart} ${timePart}`, "YYYY-MM-DD HH:mm");
  };

  // Function to determine if a request is urgent based on time proximity
  const isUrgent = (requiredDate: string, requireTime: string) => {
    const now = moment();
    const requestDateTime = getCombinedDateTime(requiredDate, requireTime);
    const hoursUntilRequest = requestDateTime.diff(now, "hours");

    // Return true if the request is within 24 hours
    return hoursUntilRequest >= 0 && hoursUntilRequest <= 24;
  };

  // Function to get urgency level based on time proximity
  const getTimeUrgency = (requiredDate: string, requireTime: string) => {
    const now = moment();
    const requestDateTime = getCombinedDateTime(requiredDate, requireTime);
    const hoursUntilRequest = requestDateTime.diff(now, "hours");

    if (hoursUntilRequest < 0) {
      return "passed"; // Request time has passed
    } else if (hoursUntilRequest <= 6) {
      return "critical"; // Within 6 hours
    } else if (hoursUntilRequest <= 12) {
      return "high"; // Within 12 hours
    } else if (hoursUntilRequest <= 24) {
      return "medium"; // Within 24 hours
    } else {
      return "low"; // More than 24 hours
    }
  };

  // Function to get urgency badge color
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-600 text-white animate-pulse";
      case "high":
        return "bg-red-500 text-white";
      case "medium":
        return "bg-yellow-500 text-black";
      case "low":
        return "bg-green-500 text-white";
      case "passed":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  // Function to get urgency label
  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "Critical";
      case "high":
        return "High";
      case "medium":
        return "Medium";
      case "low":
        return "Low";
      case "passed":
        return "Passed";
      default:
        return "Unknown";
    }
  };

  // Function to get time proximity badge
  const getTimeProximityBadge = (requiredDate: string, requireTime: string) => {
    const timeUrgency = getTimeUrgency(requiredDate, requireTime);

    switch (timeUrgency) {
      case "critical":
        return (
          <Badge className="bg-red-600 text-white animate-pulse">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Within 6 hours
          </Badge>
        );
      case "high":
        return (
          <Badge className="bg-red-500 text-white">
            <Clock className="w-3 h-3 mr-1" />
            Within 12 hours
          </Badge>
        );
      case "medium":
        return (
          <Badge className="bg-yellow-500 text-black">
            <Clock className="w-3 h-3 mr-1" />
            Within 24 hours
          </Badge>
        );
      case "passed":
        return <Badge className="bg-gray-500 text-white">Time passed</Badge>;
      default:
        return (
          <Badge className="bg-green-500 text-white">
            <Clock className="w-3 h-3 mr-1" />
            Scheduled
          </Badge>
        );
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const res = await getAllBloodRequests({});

        // Sort requests by urgency and time proximity
        const sortedRequests = [...res.requests].sort((a, b) => {
          const aUrgencyLevel = getTimeUrgency(a.requiredDate, a.requireTime);
          const bUrgencyLevel = getTimeUrgency(b.requiredDate, b.requireTime);

          // Define urgency priority
          const urgencyPriority = {
            critical: 0,
            high: 1,
            medium: 2,
            low: 3,
            passed: 4,
          };

          // Sort by urgency level first
          return (
            urgencyPriority[aUrgencyLevel as keyof typeof urgencyPriority] -
            urgencyPriority[bUrgencyLevel as keyof typeof urgencyPriority]
          );
        });

        // Take only the first 6 most urgent requests
        setRequests(sortedRequests.slice(0, 6));
      } catch  {
        console.error("Error fetching blood requests:");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

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
          {loading ? (
            // Loading skeleton
            Array(6)
              .fill(0)
              .map((_, index) => (
                <Card key={index} className="h-full flex flex-col">
                  <CardContent className="flex-grow p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Skeleton className="h-8 w-20" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                      <div className="flex items-center">
                        <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                      <div className="flex items-center">
                        <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                      <div className="flex items-center">
                        <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Skeleton className="h-10 w-full" />
                  </CardFooter>
                </Card>
              ))
          ) : requests.length > 0 ? (
            requests.map((request, index) => {
              // Calculate urgency for each request
              const urgencyLevel = getTimeUrgency(
                request.requiredDate,
                request.requireTime
              );

              return (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={`h-full flex flex-col ${
                      urgencyLevel === "critical"
                        ? "border-red-500 shadow-md"
                        : ""
                    }`}
                  >
                    <CardContent className="flex-grow p-6">
                      <div className="flex justify-between items-start mb-4">
                        <Badge
                          variant="outline"
                          className="text-lg font-semibold"
                        >
                          <Droplet className="w-4 h-4 mr-1 text-primary" />
                          {request.blood}
                        </Badge>
                        <Badge
                          className={`${getUrgencyColor(
                            urgencyLevel
                          )} capitalize`}
                        >
                          {getUrgencyLabel(urgencyLevel)}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span>{request.address}</span>
                        </div>
                        <div className="flex items-center">
                          <Hospital className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span className="capitalize">
                            {request.hospitalName}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span>
                            {moment(request.requiredDate).format("ll")}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span>
                            {moment(request.requireTime).format("LT")}
                          </span>
                        </div>
                        <div className="mt-2">
                          {getTimeProximityBadge(
                            request.requiredDate,
                            request.requireTime
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Link href={`/requests/${request.id}`} className="w-full">
                        <Button className="w-full">View Details</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-3 text-center py-10">
              <p className="text-muted-foreground">
                No emergency blood requests at the moment
              </p>
            </div>
          )}
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
