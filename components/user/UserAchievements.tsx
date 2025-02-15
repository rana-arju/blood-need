"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const mockAchievements = [
  {
    id: 1,
    name: "First Time Donor",
    description: "Complete your first blood donation",
    progress: 100,
    achieved: true,
  },
  {
    id: 2,
    name: "Regular Donor",
    description: "Donate blood 5 times",
    progress: 60,
    achieved: false,
  },
  {
    id: 3,
    name: "Silver Donor",
    description: "Donate blood 10 times",
    progress: 30,
    achieved: false,
  },
  // Add more achievements
];

export function UserAchievements() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Badge</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="text-lg py-2 px-4">
              Silver Donor
            </Badge>
            <span className="text-sm text-muted-foreground">
              3 more donations until Gold
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {mockAchievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{achievement.name}</h3>
                    {achievement.achieved && (
                      <Badge variant="default">Completed</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {achievement.description}
                  </p>
                  <Progress value={achievement.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    {achievement.progress}% Complete
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
