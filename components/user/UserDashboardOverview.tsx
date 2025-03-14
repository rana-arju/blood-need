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
import { useIsMobile } from "@/hooks/use-mobile";
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
  BarChart,
  Bar,
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
  const isMobile = useIsMobile();
  const isSmallMobile = useIsMobile(400);
  const isDark = theme === "dark";

  const stats = [
    {
      title: t("overview.totalDonations"),
      value: "3",
      icon: <Droplet className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />,
      description: t("overview.lastDonation", { date: "2024-02-15" }),
    },
    {
      title: t("overview.livesSaved"),
      value: "9",
      icon: <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />,
      description: t("overview.impactDescription"),
    },
    {
      title: t("overview.nextEligible"),
      value: t("overview.eligibleNow"),
      icon: <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />,
      description: t("overview.eligibleDescription"),
    },
    {
      title: t("overview.donorRank"),
      value: "Silver",
      icon: <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />,
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
    <div className="space-y-4 sm:space-y-6 p-1 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
          {t("overview.welcome")}
        </h1>
        <div className="flex gap-2">
          <Button
            asChild
            size={isMobile ? "sm" : "default"}
            className="text-xs sm:text-sm h-8 sm:h-10"
          >
            <Link href="/donate-now">{t("overview.donateNow")}</Link>
          </Button>
          <Button
            variant="outline"
            asChild
            size={isMobile ? "sm" : "default"}
            className="text-xs sm:text-sm h-8 sm:h-10"
          >
            <Link href="/request-blood">{t("overview.requestBlood")}</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="overflow-hidden dark:border-gray-700">
            <CardHeader className="pb-1 sm:pb-2 px-3 py-3 sm:px-6 sm:py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs sm:text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className="p-1 bg-muted rounded-full">{stat.icon}</div>
              </div>
            </CardHeader>
            <CardContent className="px-3 pb-3 sm:px-6 sm:pb-4">
              <div className="text-base sm:text-2xl font-bold mb-1">
                {stat.value}
              </div>
              <CardDescription className="text-xs sm:text-sm">
                {stat.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="lg:col-span-2 dark:border-gray-700">
          <CardHeader className="px-3 py-3 sm:px-6 sm:py-4">
            <CardTitle className="text-base sm:text-lg">
              {t("overview.donationHistory")}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3 sm:px-6 sm:pb-4">
            <div className="h-[200px] sm:h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                {isMobile ? (
                  <BarChart
                    data={donationData}
                    margin={{
                      top: 5,
                      right: 5,
                      left: isSmallMobile ? -20 : -10,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={isDark ? "#374151" : "#e5e7eb"}
                    />
                    <XAxis
                      dataKey="month"
                      tick={{
                        fontSize: isSmallMobile ? 9 : 10,
                        fill: isDark ? "#9ca3af" : "#6b7280",
                      }}
                      tickMargin={5}
                    />
                    <YAxis
                      tick={{
                        fontSize: isSmallMobile ? 9 : 10,
                        fill: isDark ? "#9ca3af" : "#6b7280",
                      }}
                      width={isSmallMobile ? 25 : 30}
                      allowDecimals={false}
                      domain={[0, 1]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? "#1f2937" : "#ffffff",
                        borderColor: isDark ? "#374151" : "#e5e7eb",
                        color: isDark ? "#f9fafb" : "#111827",
                        fontSize: isSmallMobile ? 10 : 12,
                        padding: isSmallMobile ? "4px" : "6px",
                      }}
                    />
                    <Bar
                      dataKey="donations"
                      fill="#ef4444"
                      name={t("overview.donations")}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                ) : (
                  <LineChart data={donationData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={isDark ? "#374151" : "#e5e7eb"}
                    />
                    <XAxis
                      dataKey="month"
                      stroke={isDark ? "#9ca3af" : "#6b7280"}
                    />
                    <YAxis
                      stroke={isDark ? "#9ca3af" : "#6b7280"}
                      allowDecimals={false}
                      domain={[0, 1]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? "#1f2937" : "#ffffff",
                        borderColor: isDark ? "#374151" : "#e5e7eb",
                        color: isDark ? "#f9fafb" : "#111827",
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
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="dark:border-gray-700">
          <CardHeader className="px-3 py-3 sm:px-6 sm:py-4">
            <CardTitle className="text-base sm:text-lg">
              {t("overview.impact")}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3 sm:px-6 sm:pb-4">
            <div className="h-[200px] sm:h-[250px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={impactData}
                    cx="50%"
                    cy="50%"
                    innerRadius={isMobile ? 40 : 60}
                    outerRadius={isMobile ? 60 : 80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={!isSmallMobile}
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
                      backgroundColor: isDark ? "#1f2937" : "#ffffff",
                      borderColor: isDark ? "#374151" : "#e5e7eb",
                      color: isDark ? "#f9fafb" : "#111827",
                      fontSize: isMobile ? 11 : 14,
                      padding: isMobile ? "6px" : "10px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="dark:border-gray-700">
          <CardHeader className="px-3 py-3 sm:px-6 sm:py-4">
            <CardTitle className="text-base sm:text-lg">
              {t("overview.healthMetrics")}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3 sm:px-6 sm:pb-4">
            <div className="h-[180px] sm:h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                {isMobile ? (
                  <BarChart
                    data={healthData}
                    margin={{
                      top: 5,
                      right: 5,
                      left: isSmallMobile ? -20 : -10,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={isDark ? "#374151" : "#e5e7eb"}
                    />
                    <XAxis
                      dataKey="date"
                      tick={{
                        fontSize: isSmallMobile ? 9 : 10,
                        fill: isDark ? "#9ca3af" : "#6b7280",
                      }}
                      tickMargin={5}
                    />
                    <YAxis
                      tick={{
                        fontSize: isSmallMobile ? 9 : 10,
                        fill: isDark ? "#9ca3af" : "#6b7280",
                      }}
                      width={isSmallMobile ? 25 : 30}
                      domain={[12, 16]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? "#1f2937" : "#ffffff",
                        borderColor: isDark ? "#374151" : "#e5e7eb",
                        color: isDark ? "#f9fafb" : "#111827",
                        fontSize: isSmallMobile ? 10 : 12,
                        padding: isSmallMobile ? "4px" : "6px",
                      }}
                    />
                    <Bar
                      dataKey="hemoglobin"
                      fill="#3b82f6"
                      name={t("overview.hemoglobin")}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                ) : (
                  <LineChart data={healthData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={isDark ? "#374151" : "#e5e7eb"}
                    />
                    <XAxis
                      dataKey="date"
                      stroke={isDark ? "#9ca3af" : "#6b7280"}
                    />
                    <YAxis
                      stroke={isDark ? "#9ca3af" : "#6b7280"}
                      domain={[12, 16]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? "#1f2937" : "#ffffff",
                        borderColor: isDark ? "#374151" : "#e5e7eb",
                        color: isDark ? "#f9fafb" : "#111827",
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
                )}
              </ResponsiveContainer>
            </div>
            <div className="mt-3 sm:mt-4 text-center">
              <Button
                variant="outline"
                asChild
                size={isMobile ? "sm" : "default"}
                className="text-xs sm:text-sm h-8 sm:h-10"
              >
                <Link href="/user/health">
                  {t("overview.viewHealthDetails")}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="dark:border-gray-700">
          <Tabs defaultValue="upcoming">
            <CardHeader className="pb-0 px-3 py-3 sm:px-6 sm:py-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <CardTitle className="text-base sm:text-lg">
                  {t("overview.activities")}
                </CardTitle>
                <TabsList className="h-8 sm:h-10">
                  <TabsTrigger value="upcoming" className="text-xs sm:text-sm">
                    {t("tabs.upcoming")}
                  </TabsTrigger>
                  <TabsTrigger value="recent" className="text-xs sm:text-sm">
                    {t("tabs.recent")}
                  </TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent className="pt-4 sm:pt-6 px-3 pb-3 sm:px-6 sm:pb-4">
              <TabsContent
                value="upcoming"
                className="space-y-3 sm:space-y-4 mt-0"
              >
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg border border-border dark:border-gray-700"
                  >
                    <div className="p-1.5 sm:p-2 rounded-full bg-primary/10 dark:bg-primary/20">
                      {event.type === "donation" ? (
                        <Droplet className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-primary" />
                      ) : (
                        <Activity className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm sm:text-base truncate">
                        {event.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        <span>{event.date}</span>
                        <span className="hidden xs:inline">•</span>
                        <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent
                value="recent"
                className="space-y-3 sm:space-y-4 mt-0"
              >
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg border border-border dark:border-gray-700"
                  >
                    <div className="p-1.5 sm:p-2 rounded-full bg-primary/10 dark:bg-primary/20">
                      {activity.type === "donation" ? (
                        <Droplet className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-primary" />
                      ) : activity.type === "achievement" ? (
                        <Award className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-primary" />
                      ) : (
                        <Bell className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm truncate">
                        {activity.description}
                      </p>
                      <div className="flex items-center gap-1 sm:gap-2 text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
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
