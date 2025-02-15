"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Droplet,
  Heart,
  Calendar,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockChartData = [
  { month: "Jan", donations: 65 },
  { month: "Feb", donations: 59 },
  { month: "Mar", donations: 80 },
  { month: "Apr", donations: 81 },
  { month: "May", donations: 56 },
  { month: "Jun", donations: 55 },
];

const stats = [
  { title: "Total Users", value: "1,234", icon: Users, change: "+12%" },
  { title: "Blood Requests", value: "56", icon: Droplet, change: "+8%" },
  { title: "Active Donors", value: "789", icon: Heart, change: "+23%" },
  { title: "Upcoming Drives", value: "12", icon: Calendar, change: "+15%" },
];

export function Overview() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">{stat.change}</span> from last
                month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Donation Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="donations"
                    stroke="hsl(var(--primary))"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <TrendingUp className="h-5 w-5 text-primary" />
                <div>
                  <h4 className="font-semibold">New Blood Drive</h4>
                  <p className="text-sm text-muted-foreground">
                    Schedule a new blood donation drive
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <div>
                  <h4 className="font-semibold">Emergency Requests</h4>
                  <p className="text-sm text-muted-foreground">
                    View and manage urgent blood requests
                  </p>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
