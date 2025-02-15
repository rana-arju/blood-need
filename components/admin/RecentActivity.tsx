"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const activities = [
  {
    id: 1,
    user: {
      name: "John Doe",
      image: "https://source.unsplash.com/random/100x100?face=1",
    },
    action: "registered as a donor",
    time: "2 minutes ago",
    type: "registration",
  },
  {
    id: 2,
    user: {
      name: "Jane Smith",
      image: "https://source.unsplash.com/random/100x100?face=2",
    },
    action: "requested blood type A+",
    time: "5 minutes ago",
    type: "request",
  },
  {
    id: 3,
    user: {
      name: "Mike Johnson",
      image: "https://source.unsplash.com/random/100x100?face=3",
    },
    action: "completed donation",
    time: "10 minutes ago",
    type: "donation",
  },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4">
              <Avatar>
                <AvatarImage
                  src={activity.user.image}
                  alt={activity.user.name}
                />
                <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{activity.user.name}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.action}
                </p>
              </div>
              <div className="text-right">
                <Badge
                  variant={
                    activity.type === "donation"
                      ? "default"
                      : activity.type === "request"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {activity.type}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
