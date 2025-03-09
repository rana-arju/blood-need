"use client";

import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  Calendar,
  Droplet,
  Heart,
  TrendingUp,
  Users,
  Bell,
  Clock,
  Award,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data for charts
const donationData = [
  { month: "Jan", donations: 1 },
  { month: "Feb", donations: 0 },
  { month: "Mar", donations: 1 },
  { month: "Apr", donations: 0 },
  { month: "May", donations: 1 },
  { month: "Jun", donations: 0 },
];

const healthData = [
  { date: "Jan", hemoglobin: 14.2 },
  { date: "Feb", hemoglobin: 13.8 },
  { date: "Mar", hemoglobin: 14.0 },
  { date: "Apr", hemoglobin: 14.5 },
  { date: "May", hemoglobin: 14.3 },
  { date: "Jun", hemoglobin: 14.1 },
];

const impactData = [
  { name: "Lives Saved", value: 9 },
  { name: "Potential", value: 3 },
];

const COLORS = ["#ef4444", "#d1d5db"];

export function UserDashboardOverview() {
  const t = useTranslations("UserDashboard");
  const { theme } = useTheme();

  const stats = [
    {
      title: t("overview.totalDonations"),
      value: "3",
      icon: <Droplet className="h-5 w-5 text-red-500" />,
      description: t("overview.lastDonation", { date: "2024-02-15" }),
    },
    {
      title: t("overview.livesSaved"),
      value: "9",
      icon: <Heart className="h-5 w-5 text-red-500" />,
      description: t("overview.impactDescription"),
    },
    {
      title: t("overview.nextEligible"),
      value: t("overview.eligibleNow"),
      icon: <Calendar className="h-5 w-5 text-green-500" />,
      description: t("overview.eligibleDescription"),
    },
    {
      title: t("overview.donorRank"),
      value: "Silver",
      icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
      description: t("overview.rankDescription"),
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: t("events.bloodDrive"),
      date: "2024-03-15",
      location: t("events.cityHospital"),
      type: "donation",
    },
    {
      id: 2,
      title: t("events.healthCheckup"),
      date: "2024-03-22",
      location: t("events.medicalCenter"),
      type: "checkup",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "donation",
      date: "2024-02-15",
      description: t("activity.donationCompleted"),
    },
    {
      id: 2,
      type: "achievement",
      date: "2024-02-15",
      description: t("activity.achievementUnlocked"),
    },
    {
      id: 3,
      type: "request",
      date: "2024-01-20",
      description: t("activity.requestFulfilled"),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">
          {t("overview.welcome")}
        </h1>
        <div className="flex gap-2">
          <Button asChild size="sm">
            <Link href="/donate-now">{t("overview.donateNow")}</Link>
          </Button>
          <Button variant="outline" asChild size="sm">
            <Link href="/request-blood">{t("overview.requestBlood")}</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className="p-1 bg-muted rounded-full">{stat.icon}</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <CardDescription>{stat.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t("overview.donationHistory")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={donationData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={theme === "dark" ? "#374151" : "#e5e7eb"}
                  />
                  <XAxis
                    dataKey="month"
                    stroke={theme === "dark" ? "#9ca3af" : "#6b7280"}
                  />
                  <YAxis
                    stroke={theme === "dark" ? "#9ca3af" : "#6b7280"}
                    allowDecimals={false}
                    domain={[0, 1]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                      borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                      color: theme === "dark" ? "#f9fafb" : "#111827",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="donations"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("overview.impact")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={impactData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {impactData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                      borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                      color: theme === "dark" ? "#f9fafb" : "#111827",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("overview.healthMetrics")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={healthData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={theme === "dark" ? "#374151" : "#e5e7eb"}
                  />
                  <XAxis
                    dataKey="date"
                    stroke={theme === "dark" ? "#9ca3af" : "#6b7280"}
                  />
                  <YAxis
                    stroke={theme === "dark" ? "#9ca3af" : "#6b7280"}
                    domain={[12, 16]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                      borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                      color: theme === "dark" ? "#f9fafb" : "#111827",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="hemoglobin"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" asChild size="sm">
                <Link href="/user/health">
                  {t("overview.viewHealthDetails")}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <Tabs defaultValue="upcoming">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <CardTitle>{t("overview.activities")}</CardTitle>
                <TabsList>
                  <TabsTrigger value="upcoming">
                    {t("tabs.upcoming")}
                  </TabsTrigger>
                  <TabsTrigger value="recent">{t("tabs.recent")}</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <TabsContent value="upcoming" className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-4 p-3 rounded-lg border border-border"
                  >
                    <div className="p-2 rounded-full bg-primary/10">
                      {event.type === "donation" ? (
                        <Droplet className="h-5 w-5 text-primary" />
                      ) : (
                        <Activity className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{event.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{event.date}</span>
                        <span>•</span>
                        <Users className="h-3.5 w-3.5" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="recent" className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-3 rounded-lg border border-border"
                  >
                    <div className="p-2 rounded-full bg-primary/10">
                      {activity.type === "donation" ? (
                        <Droplet className="h-5 w-5 text-primary" />
                      ) : activity.type === "achievement" ? (
                        <Award className="h-5 w-5 text-primary" />
                      ) : (
                        <Bell className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{activity.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
