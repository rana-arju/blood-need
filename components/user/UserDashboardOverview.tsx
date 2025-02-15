"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Award, Activity, FileText } from "lucide-react";

export function UserDashboardOverview() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          icon={Heart}
          title="Total Donations"
          value="5"
          description="Last donation: 2 months ago"
        />
        <DashboardCard
          icon={Award}
          title="Current Badge"
          value="Silver Donor"
          description="3 more donations until Gold"
        />
        <DashboardCard
          icon={Activity}
          title="Health Status"
          value="Eligible"
          description="Next donation in 14 days"
        />
        <DashboardCard
          icon={FileText}
          title="Active Requests"
          value="1"
          description="2 requests completed"
        />
      </div>
    </div>
  );
}

function DashboardCard({
  icon: Icon,
  title,
  value,
  description,
}: {
  icon: any;
  title: string;
  value: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-2">{description}</p>
      </CardContent>
    </Card>
  );
}
