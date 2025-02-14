"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Achievement {
  id: string;
  name: string;
  description: string;
  progress: number;
  total: number;
  achieved: boolean;
}

const mockAchievements: Achievement[] = [
  {
    id: "1",
    name: "First Time Donor",
    description: "Donate blood for the first time",
    progress: 1,
    total: 1,
    achieved: true,
  },
  {
    id: "2",
    name: "Regular Donor",
    description: "Donate blood 5 times",
    progress: 3,
    total: 5,
    achieved: false,
  },
  {
    id: "3",
    name: "Silver Savior",
    description: "Donate blood 10 times",
    progress: 3,
    total: 10,
    achieved: false,
  },
  {
    id: "4",
    name: "Golden Heart",
    description: "Donate blood 25 times",
    progress: 3,
    total: 25,
    achieved: false,
  },
  {
    id: "5",
    name: "Platinum Lifesaver",
    description: "Donate blood 50 times",
    progress: 3,
    total: 50,
    achieved: false,
  },
  {
    id: "6",
    name: "Type Collector",
    description: "Donate to recipients with all blood types",
    progress: 2,
    total: 8,
    achieved: false,
  },
];

export default function DonationAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    // In a real application, this would be an API call to fetch the user's achievements
    setAchievements(mockAchievements);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {achievements.map((achievement) => (
        <Card
          key={achievement.id}
          className={achievement.achieved ? "border-primary" : ""}
        >
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {achievement.name}
              {achievement.achieved && <Badge>Achieved</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{achievement.description}</p>
            <div className="space-y-2">
              <Progress
                value={(achievement.progress / achievement.total) * 100}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                Progress: {achievement.progress} / {achievement.total}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
