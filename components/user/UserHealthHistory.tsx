"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { format } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AlertCircle, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as z from "zod";
import { cn } from "@/lib/utils";
import {
  addHealthRecord,
  deleteHealthRecord,
  type DonorInfo,
  getUserDonorInfo,
  getUserHealthRecords,
  type HealthRecord,
  type HealthRecordFormData,
  updateHealthRecord,
} from "@/services/health-record";
import { useSession } from "next-auth/react";

// Form schema for health record
const healthRecordSchema = z.object({
  date: z.string().min(1, { message: "Date is required" }),
  hemoglobin: z.coerce.number().min(1, { message: "Hemoglobin is required" }),
  bloodPressure: z.string().min(1, { message: "Blood pressure is required" }),
  weight: z.coerce.number().min(1, { message: "Weight is required" }),
  height: z.coerce.number().min(1, { message: "Height is required" }),
  pulse: z.coerce.number().optional(),
  notes: z.string().optional(),
});

export function UserHealthHistory() {
  const t = useTranslations("UserHealth");
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const isSmallMobile = useIsMobile(400);
  const isDark = theme === "dark";
  const { data: session } = useSession();
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  const [donorInfo, setDonorInfo] = useState<DonorInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<HealthRecord | null>(null);
  const [formData, setFormData] = useState<HealthRecordFormData>({
    date: format(new Date(), "yyyy-MM-dd"),
    hemoglobin: 14,
    bloodPressure: "120/80",
    weight: 70,
    height: 175,
    pulse: 72,
    notes: "",
  });
  const [activeTab, setActiveTab] = useState("hemoglobin");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch health records and donor info in parallel
        const [recordsResponse, donorResponse] = await Promise.all([
          getUserHealthRecords(session?.user.id!),
          getUserDonorInfo(session?.user.id!).catch(() => null), // Don't fail if donor info isn't available
        ]);

        setHealthRecords(recordsResponse.data);
        setDonorInfo(donorResponse ? donorResponse.data : null);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error(t("errorFetch"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [t, session?.user.id]);

  const validateForm = (data: HealthRecordFormData) => {
    try {
      healthRecordSchema.parse(data);
      setFormErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0].toString()] = err.message;
          }
        });
        setFormErrors(errors);
      }
      return false;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "hemoglobin" ||
        name === "weight" ||
        name === "height" ||
        name === "pulse"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const handleAddRecord = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm(formData)) {
      return;
    }

    try {
      setSubmitting(true);
      const newRecord = await addHealthRecord(formData, session?.user.id!);

      // Update the local state with the new record
      setHealthRecords((prev) => [newRecord, ...prev]);
      setIsAddDialogOpen(false);

      // Reset form data
      setFormData({
        date: format(new Date(), "yyyy-MM-dd"),
        hemoglobin: 14,
        bloodPressure: "120/80",
        weight: 70,
        height: 175,
        pulse: 72,
        notes: "",
      });

      toast.success(t("successAdd"));
    } catch (error) {
      console.error("Failed to add health record:", error);
      toast.error(t("errorAdd"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentRecord) return;

    if (!validateForm(formData)) {
      return;
    }

    try {
      setSubmitting(true);
      const updatedRecord = await updateHealthRecord(
        currentRecord.id,
        formData,
        session?.user.id!
      );

      // Update the local state with the updated record
      setHealthRecords((prev) =>
        prev.map((record) =>
          record.id === currentRecord.id ? updatedRecord : record
        )
      );

      setIsEditDialogOpen(false);
      toast.success(t("successUpdate"));
    } catch (error) {
      console.error("Failed to update health record:", error);
      toast.error(t("errorUpdate"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteRecord = async (id: string) => {
    if (!confirm(t("confirmDelete"))) return;

    try {
      await deleteHealthRecord(id, session?.user.id!);

      // Update the local state by removing the deleted record
      setHealthRecords((prev) => prev.filter((record) => record.id !== id));

      toast.success(t("successDelete"));
    } catch (error) {
      console.error("Failed to delete health record:", error);
      toast.error(t("errorDelete"));
    }
  };

  const openEditDialog = (record: HealthRecord) => {
    setCurrentRecord(record);
    setFormData({
      date: format(new Date(record.date), "yyyy-MM-dd"),
      hemoglobin: record.hemoglobin,
      bloodPressure: record.bloodPressure,
      weight: record.weight,
      height: record.height || 0,
      pulse: record.pulse || 0,
      notes: record.notes || "",
    });
    setIsEditDialogOpen(true);
  };

  // Prepare chart data
  const chartData = healthRecords
    ?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((record) => ({
      date: format(new Date(record.date), isSmallMobile ? "MM/dd" : "MMM dd"),
      hemoglobin: record.hemoglobin,
      weight: record.weight,
      pulse: record.pulse || 0,
      bloodPressure: Number.parseInt(record.bloodPressure.split("/")[0]), // Just use systolic for charting
    }));

  // Prepare bar chart data for mobile
  const barChartData = healthRecords
    ?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5) // Only show the 5 most recent records
    .map((record) => ({
      date: format(new Date(record.date), isSmallMobile ? "MM/dd" : "MMM dd"),
      hemoglobin: record.hemoglobin,
      weight: record.weight,
      pulse: record.pulse || 0,
      bloodPressure: Number.parseInt(record.bloodPressure.split("/")[0]), // Just use systolic for charting
    }))
    .reverse(); // Reverse to show oldest to newest (left to right)

  // Chart colors
  const chartColors = {
    hemoglobin: "#8884d8",
    weight: "#82ca9d",
    pulse: "#ffc658",
    bloodPressure: "#ff8042",
  };

  return (
    <div className="space-y-4 p-1 sm:p-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
              {t("title")}
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              {t("subtitle")}
            </p>
          </div>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            size={isMobile ? "sm" : "default"}
            className="mt-2 sm:mt-0"
          >
            {t("addRecord")}
          </Button>
        </div>
      </motion.div>

      {loading ? (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[200px] w-full" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          {/* Donor Info Card */}
          {donorInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="mb-4 dark:border-gray-700">
                <CardHeader className="px-3 py-3 sm:px-6 sm:py-4">
                  <CardTitle className="text-base sm:text-lg">
                    {t("donorInfo")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-3 pb-3 sm:px-6 sm:pb-4">
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
                    <div className="bg-primary/10 dark:bg-primary/20 p-2 sm:p-3 rounded-lg">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {t("height")}
                      </p>
                      <p className="text-sm sm:text-base font-medium">
                        {donorInfo.height
                          ? `${donorInfo.height} cm`
                          : t("notProvided")}
                      </p>
                    </div>
                    <div className="bg-primary/10 dark:bg-primary/20 p-2 sm:p-3 rounded-lg">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {t("weightTitle")}
                      </p>
                      <p className="text-sm sm:text-base font-medium">
                        {donorInfo.weight
                          ? `${donorInfo.weight} kg`
                          : t("notProvided")}
                      </p>
                    </div>
                    <div className="bg-primary/10 dark:bg-primary/20 p-2 sm:p-3 rounded-lg">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {t("medicalCondition")}
                      </p>
                      <p className="text-sm sm:text-base font-medium truncate">
                        {donorInfo.medicalCondition || t("none")}
                      </p>
                    </div>
                    <div className="bg-primary/10 dark:bg-primary/20 p-2 sm:p-3 rounded-lg">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {t("currentMedications")}
                      </p>
                      <p className="text-sm sm:text-base font-medium truncate">
                        {donorInfo.currentMedications || t("none")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Health Metrics Charts */}
          {healthRecords.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="mb-4 dark:border-gray-700">
                <CardHeader className="px-3 py-3 sm:px-6 sm:py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <CardTitle className="text-base sm:text-lg">
                      {t("healthMetrics")}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="px-3 pb-3 sm:px-6 sm:pb-4">
                  {isMobile ? (
                    // Mobile view with tabs and bar charts
                    <Tabs
                      value={activeTab}
                      onValueChange={setActiveTab}
                      className="w-full"
                    >
                      <TabsList className="grid grid-cols-2 w-full mb-4">
                        <TabsTrigger value="hemoglobin" className="text-xs">
                          {t("hemoglobin.title")}
                        </TabsTrigger>
                        <TabsTrigger value="weight" className="text-xs">
                          {t("weight.title")}
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="hemoglobin" className="mt-0">
                        <div className="h-[250px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={barChartData}
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
                                  backgroundColor: isDark
                                    ? "#1f2937"
                                    : "#ffffff",
                                  borderColor: isDark ? "#374151" : "#e5e7eb",
                                  color: isDark ? "#f9fafb" : "#111827",
                                  fontSize: isSmallMobile ? 10 : 12,
                                  padding: isSmallMobile ? "4px" : "6px",
                                }}
                              />
                              <Bar
                                dataKey="hemoglobin"
                                fill={chartColors.hemoglobin}
                                name={t("hemoglobin.label")}
                                radius={[4, 4, 0, 0]}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </TabsContent>
                      <TabsContent value="weight" className="mt-0">
                        <div className="h-[250px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={barChartData}
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
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: isDark
                                    ? "#1f2937"
                                    : "#ffffff",
                                  borderColor: isDark ? "#374151" : "#e5e7eb",
                                  color: isDark ? "#f9fafb" : "#111827",
                                  fontSize: isSmallMobile ? 10 : 12,
                                  padding: isSmallMobile ? "4px" : "6px",
                                }}
                              />
                              <Bar
                                dataKey="weight"
                                fill={chartColors.weight}
                                name={t("weight.label")}
                                radius={[4, 4, 0, 0]}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </TabsContent>
                    </Tabs>
                  ) : (
                    // Desktop view with line charts
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={chartData}
                            margin={{
                              top: 5,
                              right: 20,
                              left: 0,
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
                                fontSize: 12,
                                fill: isDark ? "#9ca3af" : "#6b7280",
                              }}
                            />
                            <YAxis
                              tick={{
                                fontSize: 12,
                                fill: isDark ? "#9ca3af" : "#6b7280",
                              }}
                              domain={[12, 16]}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: isDark ? "#1f2937" : "#ffffff",
                                borderColor: isDark ? "#374151" : "#e5e7eb",
                                color: isDark ? "#f9fafb" : "#111827",
                              }}
                            />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="hemoglobin"
                              stroke={chartColors.hemoglobin}
                              strokeWidth={2}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6 }}
                              name={t("hemoglobin.label")}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={chartData}
                            margin={{
                              top: 5,
                              right: 20,
                              left: 0,
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
                                fontSize: 12,
                                fill: isDark ? "#9ca3af" : "#6b7280",
                              }}
                            />
                            <YAxis
                              tick={{
                                fontSize: 12,
                                fill: isDark ? "#9ca3af" : "#6b7280",
                              }}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: isDark ? "#1f2937" : "#ffffff",
                                borderColor: isDark ? "#374151" : "#e5e7eb",
                                color: isDark ? "#f9fafb" : "#111827",
                              }}
                            />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="weight"
                              stroke={chartColors.weight}
                              strokeWidth={2}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6 }}
                              name={t("weight.label")}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Health Records List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="dark:border-gray-700">
              <CardHeader className="px-3 py-3 sm:px-6 sm:py-4">
                <CardTitle className="text-base sm:text-lg">
                  {t("records.title")}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-3 sm:px-6 sm:pb-4">
                {healthRecords.length > 0 ? (
                  isMobile ? (
                    // Mobile card view
                    <div className="space-y-3">
                      {healthRecords
                        .sort(
                          (a, b) =>
                            new Date(b.date).getTime() -
                            new Date(a.date).getTime()
                        )
                        .map((record) => (
                          <Card
                            key={record.id}
                            className="overflow-hidden dark:border-gray-700"
                          >
                            <div className="p-3">
                              <div className="flex justify-between items-start mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {format(
                                    new Date(record.date),
                                    "MMM dd, yyyy"
                                  )}
                                </Badge>
                                <div className="flex space-x-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => openEditDialog(record)}
                                  >
                                    <Edit className="h-3.5 w-3.5" />
                                    <span className="sr-only">{t("edit")}</span>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 text-destructive"
                                    onClick={() =>
                                      handleDeleteRecord(record.id)
                                    }
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    <span className="sr-only">
                                      {t("delete")}
                                    </span>
                                  </Button>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                  <p className="text-muted-foreground">
                                    {t("records.hemoglobin")}
                                  </p>
                                  <p className="font-medium">
                                    {record.hemoglobin} g/dL
                                  </p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">
                                    {t("records.bloodPressure")}
                                  </p>
                                  <p className="font-medium">
                                    {record.bloodPressure}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">
                                    {t("records.weight")}
                                  </p>
                                  <p className="font-medium">
                                    {record.weight} kg
                                  </p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">
                                    {t("records.height")}
                                  </p>
                                  <p className="font-medium">
                                    {record.height || "-"} cm
                                  </p>
                                </div>
                              </div>
                              {record.notes && (
                                <div className="mt-2 text-xs">
                                  <p className="text-muted-foreground">
                                    {t("records.notes")}
                                  </p>
                                  <p className="mt-1">{record.notes}</p>
                                </div>
                              )}
                            </div>
                          </Card>
                        ))}
                    </div>
                  ) : (
                    // Desktop table view
                    <div className="overflow-x-auto -mx-3 sm:-mx-0">
                      <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-muted/50">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                                >
                                  {t("records.date")}
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                                >
                                  {t("records.hemoglobin")}
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                                >
                                  {t("records.bloodPressure")}
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                                >
                                  {t("records.weight")}
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                                >
                                  {t("records.height")}
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                                >
                                  {t("records.actions")}
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-card divide-y divide-gray-200 dark:divide-gray-700">
                              {healthRecords
                                .sort(
                                  (a, b) =>
                                    new Date(b.date).getTime() -
                                    new Date(a.date).getTime()
                                )
                                .map((record) => (
                                  <tr
                                    key={record.id}
                                    className="hover:bg-muted/50"
                                  >
                                    <td className="px-3 py-4 whitespace-nowrap text-sm">
                                      {format(
                                        new Date(record.date),
                                        "MMM dd, yyyy"
                                      )}
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm">
                                      {record.hemoglobin} g/dL
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm">
                                      {record.bloodPressure}
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm">
                                      {record.weight} kg
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm">
                                      {record.height || "-"} cm
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap text-sm">
                                      <div className="flex space-x-2">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => openEditDialog(record)}
                                        >
                                          {t("edit")}
                                        </Button>
                                        <Button
                                          variant="destructive"
                                          size="sm"
                                          onClick={() =>
                                            handleDeleteRecord(record.id)
                                          }
                                        >
                                          {t("delete")}
                                        </Button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="text-center py-6">
                    <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">{t("noRecords")}</p>
                    <Button
                      className="mt-4"
                      size={isMobile ? "sm" : "default"}
                      onClick={() => setIsAddDialogOpen(true)}
                    >
                      {t("addFirstRecord")}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}

      {/* Add Health Record Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px] p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>{t("addRecord")}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddRecord}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-xs sm:text-sm">
                    {t("records.date")}
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className={cn(
                      "text-xs sm:text-sm h-8 sm:h-10",
                      formErrors.date && "border-destructive"
                    )}
                  />
                  {formErrors.date && (
                    <p className="text-xs text-destructive">
                      {formErrors.date}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hemoglobin" className="text-xs sm:text-sm">
                    {t("records.hemoglobin")} (g/dL)
                  </Label>
                  <Input
                    id="hemoglobin"
                    name="hemoglobin"
                    type="number"
                    step="0.1"
                    value={formData.hemoglobin}
                    onChange={handleInputChange}
                    required
                    className={cn(
                      "text-xs sm:text-sm h-8 sm:h-10",
                      formErrors.hemoglobin && "border-destructive"
                    )}
                  />
                  {formErrors.hemoglobin && (
                    <p className="text-xs text-destructive">
                      {formErrors.hemoglobin}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bloodPressure" className="text-xs sm:text-sm">
                    {t("records.bloodPressure")}
                  </Label>
                  <Input
                    id="bloodPressure"
                    name="bloodPressure"
                    placeholder="120/80"
                    value={formData.bloodPressure}
                    onChange={handleInputChange}
                    required
                    className={cn(
                      "text-xs sm:text-sm h-8 sm:h-10",
                      formErrors.bloodPressure && "border-destructive"
                    )}
                  />
                  {formErrors.bloodPressure && (
                    <p className="text-xs text-destructive">
                      {formErrors.bloodPressure}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-xs sm:text-sm">
                    {t("records.weight")} (kg)
                  </Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    step="0.1"
                    value={formData.weight}
                    onChange={handleInputChange}
                    required
                    className={cn(
                      "text-xs sm:text-sm h-8 sm:h-10",
                      formErrors.weight && "border-destructive"
                    )}
                  />
                  {formErrors.weight && (
                    <p className="text-xs text-destructive">
                      {formErrors.weight}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height" className="text-xs sm:text-sm">
                    {t("records.height")} (cm)
                  </Label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    value={formData.height}
                    onChange={handleInputChange}
                    className={cn(
                      "text-xs sm:text-sm h-8 sm:h-10",
                      formErrors.height && "border-destructive"
                    )}
                  />
                  {formErrors.height && (
                    <p className="text-xs text-destructive">
                      {formErrors.height}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pulse" className="text-xs sm:text-sm">
                    {t("records.pulse")} (bpm)
                  </Label>
                  <Input
                    id="pulse"
                    name="pulse"
                    type="number"
                    value={formData.pulse}
                    onChange={handleInputChange}
                    className="text-xs sm:text-sm h-8 sm:h-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-xs sm:text-sm">
                  {t("records.notes")}
                </Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="text-xs sm:text-sm"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
                size={isMobile ? "sm" : "default"}
                className="text-xs sm:text-sm h-8 sm:h-10"
              >
                {t("cancel")}
              </Button>
              <Button
                type="submit"
                size={isMobile ? "sm" : "default"}
                className="text-xs sm:text-sm h-8 sm:h-10"
                disabled={submitting}
              >
                {submitting ? t("saving") : t("save")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Health Record Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px] p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>{t("editRecord")}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditRecord}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-date" className="text-xs sm:text-sm">
                    {t("records.date")}
                  </Label>
                  <Input
                    id="edit-date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className={cn(
                      "text-xs sm:text-sm h-8 sm:h-10",
                      formErrors.date && "border-destructive"
                    )}
                  />
                  {formErrors.date && (
                    <p className="text-xs text-destructive">
                      {formErrors.date}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="edit-hemoglobin"
                    className="text-xs sm:text-sm"
                  >
                    {t("records.hemoglobin")} (g/dL)
                  </Label>
                  <Input
                    id="edit-hemoglobin"
                    name="hemoglobin"
                    type="number"
                    step="0.1"
                    value={formData.hemoglobin}
                    onChange={handleInputChange}
                    required
                    className={cn(
                      "text-xs sm:text-sm h-8 sm:h-10",
                      formErrors.hemoglobin && "border-destructive"
                    )}
                  />
                  {formErrors.hemoglobin && (
                    <p className="text-xs text-destructive">
                      {formErrors.hemoglobin}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="edit-bloodPressure"
                    className="text-xs sm:text-sm"
                  >
                    {t("records.bloodPressure")}
                  </Label>
                  <Input
                    id="edit-bloodPressure"
                    name="bloodPressure"
                    placeholder="120/80"
                    value={formData.bloodPressure}
                    onChange={handleInputChange}
                    required
                    className={cn(
                      "text-xs sm:text-sm h-8 sm:h-10",
                      formErrors.bloodPressure && "border-destructive"
                    )}
                  />
                  {formErrors.bloodPressure && (
                    <p className="text-xs text-destructive">
                      {formErrors.bloodPressure}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-weight" className="text-xs sm:text-sm">
                    {t("records.weight")} (kg)
                  </Label>
                  <Input
                    id="edit-weight"
                    name="weight"
                    type="number"
                    step="0.1"
                    value={formData.weight}
                    onChange={handleInputChange}
                    required
                    className={cn(
                      "text-xs sm:text-sm h-8 sm:h-10",
                      formErrors.weight && "border-destructive"
                    )}
                  />
                  {formErrors.weight && (
                    <p className="text-xs text-destructive">
                      {formErrors.weight}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-height" className="text-xs sm:text-sm">
                    {t("records.height")} (cm)
                  </Label>
                  <Input
                    id="edit-height"
                    name="height"
                    type="number"
                    value={formData.height}
                    onChange={handleInputChange}
                    className={cn(
                      "text-xs sm:text-sm h-8 sm:h-10",
                      formErrors.height && "border-destructive"
                    )}
                  />
                  {formErrors.height && (
                    <p className="text-xs text-destructive">
                      {formErrors.height}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-pulse" className="text-xs sm:text-sm">
                    {t("records.pulse")} (bpm)
                  </Label>
                  <Input
                    id="edit-pulse"
                    name="pulse"
                    type="number"
                    value={formData.pulse}
                    onChange={handleInputChange}
                    className="text-xs sm:text-sm h-8 sm:h-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-notes" className="text-xs sm:text-sm">
                  {t("records.notes")}
                </Label>
                <Textarea
                  id="edit-notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="text-xs sm:text-sm"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                size={isMobile ? "sm" : "default"}
                className="text-xs sm:text-sm h-8 sm:h-10"
              >
                {t("cancel")}
              </Button>
              <Button
                type="submit"
                size={isMobile ? "sm" : "default"}
                className="text-xs sm:text-sm h-8 sm:h-10"
                disabled={submitting}
              >
                {submitting ? t("saving") : t("save")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
