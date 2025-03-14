"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";

import Link from "next/link";
import { IAchievement } from "@/types/achievement.interface";
import { getMyAchievements } from "@/services/achivement";
import { useSession } from "next-auth/react";

export function UserAchievements() {
  const t = useTranslations("UserAchievements");
  const {data:session} = useSession()
  const { theme } = useTheme();
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
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [t]);

  // Get the highest achieved badge
  const currentBadge =
    achievements.find((a) => a.achieved)?.name || t("currentBadge.badge");

  // Find the next badge to achieve
  const nextBadgeIndex = achievements.findIndex((a) => !a.achieved);
  const nextBadge = nextBadgeIndex !== -1 ? achievements[nextBadgeIndex] : null;

  if (loading) {
    return <AchievementsLoading />;
  }

  return (
    <div className="space-y-6 p-1 md:p-4 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      <Card className="border dark:border-gray-700">
        <CardHeader>
          <CardTitle>{t("currentBadge.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Badge variant="secondary" className="text-lg py-2 px-4 w-fit">
              {currentBadge}
            </Badge>
            {nextBadge && (
              <span className="text-sm text-muted-foreground">
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
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className="border dark:border-gray-700"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                      <h3 className="font-semibold">{achievement.name}</h3>
                      {achievement.achieved && (
                        <Badge variant="default">
                          {t("achievementsList.completed")}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {achievement.description}
                    </p>
                    <Progress value={achievement.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">
                      {t("achievementsList.progress", {
                        percent: achievement.progress,
                      })}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border dark:border-gray-700">
          <CardContent className="pt-6 flex flex-col items-center justify-center text-center p-8 space-y-4">
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
    <div className="space-y-6 p-4 md:p-6 max-w-4xl mx-auto">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-2 w-full mb-2" />
                  <Skeleton className="h-3 w-20 mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
