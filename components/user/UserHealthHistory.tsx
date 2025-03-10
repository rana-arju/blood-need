"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTheme } from "next-themes";

export function UserHealthHistory() {
  const t = useTranslations("UserHealth");
  const { theme } = useTheme();

  const mockHealthData = [
    { date: t("months.sep"), hemoglobin: 14.2, pressure: "120/80", weight: 70 },
    { date: t("months.oct"), hemoglobin: 13.8, pressure: "118/78", weight: 71 },
    { date: t("months.nov"), hemoglobin: 14.0, pressure: "122/82", weight: 70 },
    { date: t("months.dec"), hemoglobin: 14.5, pressure: "119/79", weight: 69 },
    { date: t("months.jan"), hemoglobin: 14.3, pressure: "121/81", weight: 70 },
  ];

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-4xl mx-auto">
      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
        {t("title")}
      </h3>

      <Card>
        <CardHeader>
          <CardTitle>{t("hemoglobin.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockHealthData}>
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
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  name={t("hemoglobin.label")}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("records.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("records.date")}</TableHead>
                  <TableHead>{t("records.hemoglobin")}</TableHead>
                  <TableHead>{t("records.bloodPressure")}</TableHead>
                  <TableHead>{t("records.weight")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockHealthData.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.hemoglobin} g/dL</TableCell>
                    <TableCell>{record.pressure}</TableCell>
                    <TableCell>{record.weight} kg</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
