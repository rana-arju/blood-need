"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import type { IAchievement } from "@/types/achievement.interface";
import { getMyAchievements } from "@/services/achivement";
import { useSession } from "next-auth/react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Trophy } from "lucide-react";

export function UserAchievements() {
  const t = useTranslations("UserAchievements");
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const { data: session } = useSession();
  const [achievements, setAchievements] = useState<IAchievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const data = await getMyAchievements(session?.user.id!);
        setAchievements(data.data || []);
      } catch (error) {
        console.error("Error fetching achievements:", error);
        // Use mock data if API fails
        setAchievements([
          {
            id: "1",
            userId: "user1",
            name: t("achievements.firstTime.name"),
            description: t("achievements.firstTime.description"),
            progress: 100,
            achieved: true,
            badgeImage: "/badges/first-donation.png",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "2",
            userId: "user1",
            name: t("achievements.regular.name"),
            description: t("achievements.regular.description"),
            progress: 60,
            achieved: false,
            badgeImage: "/badges/regular-donor.png",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "3",
            userId: "user1",
            name: t("achievements.silver.name"),
            description: t("achievements.silver.description"),
            progress: 30,
            achieved: false,
            badgeImage: "/badges/silver-donor.png",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "4",
            userId: "user1",
            name: t("achievements.gold.name"),
            description: t("achievements.gold.description"),
            progress: 15,
            achieved: false,
            badgeImage: "/badges/gold-donor.png",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [t, session]);

  // Get the highest achieved badge
  const currentAchievement = achievements.find((a) => a.achieved);
  const currentBadge = currentAchievement?.name || t("currentBadge.badge");
  const currentBadgeImage = currentAchievement?.badgeImage;

  // Find the next badge to achieve
  const nextBadgeIndex = achievements.findIndex((a) => !a.achieved);
  const nextBadge = nextBadgeIndex !== -1 ? achievements[nextBadgeIndex] : null;

  if (loading) {
    return <AchievementsLoading />;
  }

  return (
    <div className="space-y-6 p-1 sm:p-2 md:p-4 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      <Card className="border dark:border-gray-700">
        <CardHeader>
          <CardTitle>{t("currentBadge.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-3">
              {currentBadgeImage ? (
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                  <Image
                    src={currentBadgeImage || "/placeholder.svg"}
                    alt={currentBadge}
                    fill
                    className="object-contain"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.currentTarget.src =
                        "/placeholder.svg?height=64&width=64";
                    }}
                  />
                </div>
              ) : (
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
              )}
              <Badge
                variant="secondary"
                className="text-sm sm:text-lg py-1 sm:py-2 px-2 sm:px-4 w-fit"
              >
                {currentBadge}
              </Badge>
            </div>
            {nextBadge && (
              <span className="text-sm text-muted-foreground mt-2 sm:mt-0">
                {t("currentBadge.nextLevel")}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {achievements.length > 0 ? (
        <Card className="border dark:border-gray-700">
          <CardHeader>
            <CardTitle>{t("achievementsList.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={cn(
                    "border dark:border-gray-700 overflow-hidden",
                    achievement.achieved && "border-primary dark:border-primary"
                  )}
                >
                  <div className="relative">
                    {achievement.achieved && (
                      <div className="absolute top-0 right-0 z-10">
                        <Badge variant="default" className="m-2">
                          {t("achievementsList.completed")}
                        </Badge>
                      </div>
                    )}
                    <div
                      className={cn(
                        "h-32 flex items-center justify-center p-4 bg-muted/50",
                        achievement.achieved ? "bg-primary/10" : ""
                      )}
                    >
                      {achievement.badgeImage ? (
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                          <Image
                            src={achievement.badgeImage || "/placeholder.svg"}
                            alt={achievement.name}
                            fill
                            className={cn(
                              "object-contain transition-all duration-300",
                              !achievement.achieved && "opacity-50 grayscale"
                            )}
                            onError={(e) => {
                              e.currentTarget.src =
                                "/placeholder.svg?height=96&width=96";
                            }}
                          />
                        </div>
                      ) : (
                        <div
                          className={cn(
                            "w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center",
                            achievement.achieved ? "bg-primary/20" : "bg-muted"
                          )}
                        >
                          <Trophy
                            className={cn(
                              "h-10 w-10 sm:h-12 sm:w-12",
                              achievement.achieved
                                ? "text-primary"
                                : "text-muted-foreground"
                            )}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-base sm:text-lg mb-1">
                      {achievement.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                      {achievement.description}
                    </p>
                    <div className="space-y-1">
                      <Progress
                        value={achievement.progress}
                        className="h-2"
                        color={achievement.achieved ? "bg-primary" : undefined}
                      />
                      <div className="flex justify-between items-center text-xs">
                        <p className="text-muted-foreground">
                          {t("achievementsList.progress", {
                            percent: achievement.progress,
                          })}
                        </p>
                        {achievement.achievedDate && (
                          <p className="text-muted-foreground">
                            {new Date(
                              achievement.achievedDate
                            ).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border dark:border-gray-700">
          <CardContent className="pt-6 flex flex-col items-center justify-center text-center p-8 space-y-4">
            <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mb-2">
              <Trophy className="h-10 w-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">{t("noAchievements")}</p>
            <Button asChild>
              <Link href="/be-a-donor">{t("startDonating")}</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function AchievementsLoading() {
  return (
    <div className="space-y-6 p-1 sm:p-2 md:p-4 max-w-4xl mx-auto">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-16 w-16 rounded-full" />
              <Skeleton className="h-10 w-32" />
            </div>
            <Skeleton className="h-4 w-48 mt-2 sm:mt-0" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <Skeleton className="h-32 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-2 w-full mb-2" />
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
