"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function UserAchievements() {
  const t = useTranslations("UserAchievements");

  const mockAchievements = [
    {
      id: 1,
      name: t("achievements.firstTime.name"),
      description: t("achievements.firstTime.description"),
      progress: 100,
      achieved: true,
    },
    {
      id: 2,
      name: t("achievements.regular.name"),
      description: t("achievements.regular.description"),
      progress: 60,
      achieved: false,
    },
    {
      id: 3,
      name: t("achievements.silver.name"),
      description: t("achievements.silver.description"),
      progress: 30,
      achieved: false,
    },
    {
      id: 4,
      name: t("achievements.gold.name"),
      description: t("achievements.gold.description"),
      progress: 15,
      achieved: false,
    },
  ];

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold">{t("title")}</h1>

      <Card>
        <CardHeader>
          <CardTitle>{t("currentBadge.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Badge variant="secondary" className="text-lg py-2 px-4 w-fit">
              {t("currentBadge.badge")}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {t("currentBadge.nextLevel")}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("achievementsList.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {mockAchievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
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
    </div>
  );
}
