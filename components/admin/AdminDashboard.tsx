"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Droplet, Heart, UserCheck, Star } from "lucide-react";

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard icon={Users} title="Total Users" value="1,234" />
        <DashboardCard icon={Droplet} title="Blood Requests" value="56" />
        <DashboardCard icon={Heart} title="Donors" value="789" />
        <DashboardCard icon={UserCheck} title="Volunteers" value="42" />
        <DashboardCard icon={Star} title="Reviews" value="312" />
      </div>
    </div>
  );
}

function DashboardCard({
  icon: Icon,
  title,
  value,
}: {
  icon: any;
  title: string;
  value: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
