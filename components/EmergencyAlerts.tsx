"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, BellOff } from "lucide-react";

interface Alert {
  id: string;
  bloodType: string;
  location: string;
  urgency: "high" | "medium" | "low";
  message: string;
  timestamp: string;
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    bloodType: "O-",
    location: "Central Hospital",
    urgency: "high",
    message: "Urgent need for O- blood for emergency surgery",
    timestamp: "2023-06-15T10:30:00Z",
  },
  {
    id: "2",
    bloodType: "A+",
    location: "City Medical Center",
    urgency: "medium",
    message: "A+ blood needed for scheduled procedures",
    timestamp: "2023-06-15T09:45:00Z",
  },
  {
    id: "3",
    bloodType: "B-",
    location: "Community Clinic",
    urgency: "low",
    message: "Replenishing B- blood supply",
    timestamp: "2023-06-14T16:20:00Z",
  },
];

export default function EmergencyAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // In a real application, this would be an API call
    setAlerts(mockAlerts);
  }, []);

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    // In a real application, this would trigger a subscription to push notifications
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Emergency Blood Requests</CardTitle>
        <Button onClick={handleSubscribe} variant="outline" size="sm">
          {isSubscribed ? (
            <>
              <BellOff className="mr-2 h-4 w-4" /> Unsubscribe
            </>
          ) : (
            <>
              <Bell className="mr-2 h-4 w-4" /> Subscribe
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {alerts.map((alert) => (
            <li key={alert.id} className="border-b pb-4 last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">
                  {alert.bloodType} Blood Needed
                </h3>
                <Badge
                  variant={
                    alert.urgency === "high"
                      ? "destructive"
                      : alert.urgency === "medium"
                      ? "default"
                      : "secondary"
                  }
                >
                  {alert.urgency.charAt(0).toUpperCase() +
                    alert.urgency.slice(1)}{" "}
                  Urgency
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {alert.message}
              </p>
              <p className="text-sm">
                <strong>Location:</strong> {alert.location}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Posted on {new Date(alert.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
