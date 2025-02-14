"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface BloodSupply {
  type: string;
  level: number;
  status: "Critical" | "Low" | "Moderate" | "Sufficient";
}

export default function BloodSupplyIndicator() {
  const [bloodSupply, setBloodSupply] = useState<BloodSupply[]>([]);

  useEffect(() => {
    // In a real application, this would be an API call to fetch current blood supply levels
    const mockBloodSupply: BloodSupply[] = [
      { type: "A+", level: 70, status: "Moderate" },
      { type: "A-", level: 30, status: "Low" },
      { type: "B+", level: 50, status: "Moderate" },
      { type: "B-", level: 20, status: "Critical" },
      { type: "AB+", level: 80, status: "Sufficient" },
      { type: "AB-", level: 40, status: "Low" },
      { type: "O+", level: 60, status: "Moderate" },
      { type: "O-", level: 10, status: "Critical" },
    ];
    setBloodSupply(mockBloodSupply);
  }, []);

  const getStatusColor = (status: BloodSupply["status"]) => {
    switch (status) {
      case "Critical":
        return "bg-red-500";
      case "Low":
        return "bg-yellow-500";
      case "Moderate":
        return "bg-blue-500";
      case "Sufficient":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Blood Supply Levels</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bloodSupply.map((supply) => (
            <div key={supply.type} className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">{supply.type}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                    supply.status
                  )} text-white`}
                >
                  {supply.status}
                </span>
              </div>
              <Progress value={supply.level} className="w-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
