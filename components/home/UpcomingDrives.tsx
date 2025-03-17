"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import type { IBloodDrive } from "@/types/blood-drive";

import { useIsMobile } from "@/hooks/use-mobile";
import { getUpcomingBloodDrives } from "@/services/blood-drive";

export default function UpcomingDrives() {
  const t = useTranslations("Home.upcomingDrives");
  const [drives, setDrives] = useState<IBloodDrive[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDrive, setSelectedDrive] = useState<IBloodDrive | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    try {
      setLoading(true);
      const data = await getUpcomingBloodDrives(6);
      setDrives(data);
    } catch (error) {
      console.error("Error:", error);
      toast.error(t("fetchError"));
    } finally {
      setLoading(false);
    }
  };

  const getFullAddress = (drive: IBloodDrive) => {
    return `${drive.address}, ${drive.upazila}, ${drive.district}, ${drive.division}`;
  };

  if (loading) {
    return (
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Skeleton className="h-10 w-64 mx-auto mb-2" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (drives.length === 0) {
    return (
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-2">
            {t("title")}
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            {t("subtitle")}
          </p>
          <div className="text-center p-8 border border-dashed rounded-lg">
            <p className="text-muted-foreground">{t("noDrives")}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-2">
          {t("title")}
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          {t("subtitle")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drives.map((drive) => (
            <Card
              key={drive.id}
              className="hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              {drive.banner && (
                <div className="relative h-40 w-full">
                  <Image
                    src={
                      drive.banner ||
                      "https://res.cloudinary.com/db8l1ulfq/image/upload/v1742160785/drive-banner_mrp1ma.jpg"
                    }
                    alt={drive.title}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="line-clamp-2">{drive.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">
                      {format(new Date(drive.date), "PPP")}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="mr-2 h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span className="text-sm line-clamp-2 capitalize">
                      {getFullAddress(drive)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="text-sm line-clamp-1">
                      {t("organizedBy")} : {drive.organizer}
                    </span>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full"
                      onClick={() => setSelectedDrive(drive)}
                    >
                      {t("viewDetails")}
                    </Button>
                  </DialogTrigger>
                  {selectedDrive && (
                    <DialogContent
                      className={`${
                        isMobile ? "w-[95vw] " : "max-w-lg "
                      } max-h-screen overflow-y-auto`}
                    >
                      <DialogHeader>
                        <DialogTitle className="text-xl">
                          {selectedDrive.title}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        {selectedDrive.banner && (
                          <div className="relative h-60 w-full mb-4 rounded-md overflow-hidden">
                            <Image
                              src={
                                selectedDrive.banner ||
                                "https://res.cloudinary.com/db8l1ulfq/image/upload/v1742160785/drive-banner_mrp1ma.jpg"
                              }
                              alt={selectedDrive.title}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <Calendar className="mr-3 h-5 w-5 text-primary" />
                            <div>
                              <h4 className="font-medium">{t("date")}</h4>
                              <p>
                                {format(new Date(selectedDrive.date), "PPP")}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <MapPin className="mr-3 h-5 w-5 text-primary mt-0.5" />
                            <div>
                              <h4 className="font-medium">{t("location")}</h4>
                              <p>{getFullAddress(selectedDrive)}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Users className="mr-3 h-5 w-5 text-primary" />
                            <div>
                              <h4 className="font-medium">{t("organizer")}</h4>
                              <p>{selectedDrive.organizer}</p>
                            </div>
                          </div>
                        </div>

                    {  /*  <div className="mt-6">
                          <Button className="w-full">
                            {t("registerButton")}
                          </Button>
                        </div>
                        */
                        }
                      </div>
                    </DialogContent>
                  )}
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
