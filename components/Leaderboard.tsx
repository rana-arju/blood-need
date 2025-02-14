"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  donations: number;
  badge: string;
}

const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    name: "John Doe",
    avatar: "/avatars/john.jpg",
    points: 1500,
    donations: 10,
    badge: "Platinum",
  },
  {
    rank: 2,
    name: "Jane Smith",
    avatar: "/avatars/jane.jpg",
    points: 1350,
    donations: 9,
    badge: "Gold",
  },
  {
    rank: 3,
    name: "Bob Johnson",
    avatar: "/avatars/bob.jpg",
    points: 1200,
    donations: 8,
    badge: "Silver",
  },
  {
    rank: 4,
    name: "Alice Brown",
    avatar: "/avatars/alice.jpg",
    points: 1050,
    donations: 7,
    badge: "Bronze",
  },
  {
    rank: 5,
    name: "Charlie Wilson",
    avatar: "/avatars/charlie.jpg",
    points: 900,
    donations: 6,
    badge: "Bronze",
  },
];

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly" | "allTime">(
    "weekly"
  );

  useEffect(() => {
    // In a real application, this would be an API call
    setLeaderboard(mockLeaderboard);
  }, []); // Removed timeframe dependency

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Donors</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          value={timeframe}
          onValueChange={(value) => setTimeframe(value as any)}
        >
          <TabsList className="mb-4">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="allTime">All Time</TabsTrigger>
          </TabsList>
          <TabsContent value={timeframe}>
            <ul className="space-y-4">
              {leaderboard.map((entry) => (
                <li key={entry.rank} className="flex items-center space-x-4">
                  <span className="text-2xl font-bold w-8">{entry.rank}</span>
                  <Avatar>
                    <AvatarImage src={entry.avatar} alt={entry.name} />
                    <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <p className="font-semibold">{entry.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {entry.points} points • {entry.donations} donations
                    </p>
                  </div>
                  <Badge>{entry.badge}</Badge>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
