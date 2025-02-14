"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface HealthData {
  bloodPressure: string;
  heartRate: number;
  hemoglobin: number;
  ironLevel: number;
  lastDonationDate: string;
  nextEligibleDate: string;
}

const mockHealthData: HealthData = {
  bloodPressure: "120/80",
  heartRate: 72,
  hemoglobin: 14.5,
  ironLevel: 80,
  lastDonationDate: "2023-05-15",
  nextEligibleDate: "2023-07-15",
};

const mockHealthHistory = [
  { date: "2023-01-01", hemoglobin: 13.8, ironLevel: 75 },
  { date: "2023-02-01", hemoglobin: 14.2, ironLevel: 78 },
  { date: "2023-03-01", hemoglobin: 14.0, ironLevel: 76 },
  { date: "2023-04-01", hemoglobin: 14.3, ironLevel: 79 },
  { date: "2023-05-01", hemoglobin: 14.5, ironLevel: 80 },
];

export default function HealthDashboard() {
  const [healthData, setHealthData] = useState<HealthData | null>(null);

  useEffect(() => {
    // In a real application, this would be an API call to fetch the user's health data
    setHealthData(mockHealthData);
  }, []);

  if (!healthData) {
    return <div>Loading...</div>;
  }

  const daysUntilNextDonation = Math.max(
    0,
    Math.floor(
      (new Date(healthData.nextEligibleDate).getTime() - new Date().getTime()) /
        (1000 * 3600 * 24)
    )
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Health Status</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Blood Pressure</h3>
            <p className="text-2xl">{healthData.bloodPressure} mmHg</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Heart Rate</h3>
            <p className="text-2xl">{healthData.heartRate} bpm</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Hemoglobin</h3>
            <p className="text-2xl">{healthData.hemoglobin} g/dL</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Iron Level</h3>
            <p className="text-2xl">{healthData.ironLevel}%</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Last Donation</h3>
            <p className="text-2xl">
              {new Date(healthData.lastDonationDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Next Eligible Donation</h3>
            <p className="text-2xl">
              {new Date(healthData.nextEligibleDate).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Donation Eligibility</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Progress
              value={((56 - daysUntilNextDonation) / 56) * 100}
              className="w-full"
            />
            <p>{daysUntilNextDonation} days until next eligible donation</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Health History</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="hemoglobin">
            <TabsList>
              <TabsTrigger value="hemoglobin">Hemoglobin</TabsTrigger>
              <TabsTrigger value="iron">Iron Level</TabsTrigger>
            </TabsList>
            <TabsContent value="hemoglobin">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockHealthHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="hemoglobin" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="iron">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockHealthHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="ironLevel" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Button>Schedule Next Donation</Button>
    </div>
  );
}
