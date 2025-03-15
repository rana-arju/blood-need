"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslations } from "next-intl";
import { getMyDonation } from "@/services/donation";
import { useSession } from "next-auth/react";

// Mock data based on the provided schema
const mockDonationData = [
  {
    id: "1",
    userId: "user1",
    bloodRequestId: "req1",
    status: "completed" as const,
    notes: "Donation completed successfully",
    createdAt: new Date("2023-12-15T10:30:00"),
    updatedAt: new Date("2023-12-15T14:45:00"),
    user: {
      id: "user1",
      name: "John Doe",
      image: "/placeholder.svg?height=40&width=40",
      blood: "A+",
      email: "john@example.com",
    },
    bloodRequest: {
      id: "req1",
      userId: "req_user1",
      patientName: "Alice Smith",
      blood: "A+",
      hospitalName: "City Hospital",
      contactNumber: "+1234567890",
      whatsappNumber: "+1234567890",
      bloodAmount: 2,
      division: "Dhaka",
      district: "Dhaka",
      upazila: "Mirpur",
      address: "123 Main St, Mirpur",
      requiredDate: new Date("2023-12-15"),
      requireTime: new Date("2023-12-15T09:00:00"),
      hemoglobin: 12,
      patientProblem: "Surgery",
      createdAt: new Date("2023-12-10"),
      updatedAt: new Date("2023-12-10"),
    },
  },
  {
    id: "2",
    userId: "user1",
    bloodRequestId: "req2",
    status: "pending" as const,
    notes: "Waiting for confirmation",
    createdAt: new Date("2023-12-20T09:15:00"),
    updatedAt: new Date("2023-12-20T09:15:00"),
    user: {
      id: "user1",
      name: "John Doe",
      image: "/placeholder.svg?height=40&width=40",
      blood: "A+",
      email: "john@example.com",
    },
    bloodRequest: {
      id: "req2",
      userId: "req_user2",
      patientName: "Bob Johnson",
      blood: "A+",
      hospitalName: "General Hospital",
      contactNumber: "+0987654321",
      whatsappNumber: null,
      bloodAmount: 1,
      division: "Dhaka",
      district: "Dhaka",
      upazila: "Gulshan",
      address: "456 Park Ave, Gulshan",
      requiredDate: new Date("2023-12-22"),
      requireTime: new Date("2023-12-22T14:00:00"),
      hemoglobin: 13,
      patientProblem: "Accident",
      createdAt: new Date("2023-12-18"),
      updatedAt: new Date("2023-12-18"),
    },
  },
  {
    id: "3",
    userId: "user1",
    bloodRequestId: "req3",
    status: "cancelled" as const,
    notes: "Patient recovered, donation no longer needed",
    createdAt: new Date("2023-11-05T11:20:00"),
    updatedAt: new Date("2023-11-07T16:30:00"),
    user: {
      id: "user1",
      name: "John Doe",
      image: "/placeholder.svg?height=40&width=40",
      blood: "A+",
      email: "john@example.com",
    },
    bloodRequest: {
      id: "req3",
      userId: "req_user3",
      patientName: "Charlie Brown",
      blood: "B+",
      hospitalName: "Medical Center",
      contactNumber: "+1122334455",
      whatsappNumber: "+1122334455",
      bloodAmount: 3,
      division: "Dhaka",
      district: "Dhaka",
      upazila: "Dhanmondi",
      address: "789 Lake View, Dhanmondi",
      requiredDate: new Date("2023-11-10"),
      requireTime: new Date("2023-11-10T11:00:00"),
      hemoglobin: 11,
      patientProblem: "Anemia",
      createdAt: new Date("2023-11-01"),
      updatedAt: new Date("2023-11-07"),
    },
  },
  {
    id: "4",
    userId: "user1",
    bloodRequestId: "req4",
    status: "completed" as const,
    notes: "Emergency donation",
    createdAt: new Date("2023-10-12T08:45:00"),
    updatedAt: new Date("2023-10-12T13:20:00"),
    user: {
      id: "user1",
      name: "John Doe",
      image: "/placeholder.svg?height=40&width=40",
      blood: "A+",
      email: "john@example.com",
    },
    bloodRequest: {
      id: "req4",
      userId: "req_user4",
      patientName: "David Wilson",
      blood: "O+",
      hospitalName: "Emergency Hospital",
      contactNumber: "+5566778899",
      whatsappNumber: null,
      bloodAmount: 2,
      division: "Dhaka",
      district: "Dhaka",
      upazila: "Uttara",
      address: "101 North Road, Uttara",
      requiredDate: new Date("2023-10-12"),
      requireTime: new Date("2023-10-12T07:00:00"),
      hemoglobin: 14,
      patientProblem: "Emergency Surgery",
      createdAt: new Date("2023-10-11"),
      updatedAt: new Date("2023-10-11"),
    },
  },
  {
    id: "5",
    userId: "user1",
    bloodRequestId: "req5",
    status: "completed" as const,
    notes: "Regular donation",
    createdAt: new Date("2023-09-25T10:00:00"),
    updatedAt: new Date("2023-09-25T14:30:00"),
    user: {
      id: "user1",
      name: "John Doe",
      image: "/placeholder.svg?height=40&width=40",
      blood: "A+",
      email: "john@example.com",
    },
    bloodRequest: {
      id: "req5",
      userId: "req_user5",
      patientName: "Eva Martinez",
      blood: "A-",
      hospitalName: "Community Hospital",
      contactNumber: "+1231231234",
      whatsappNumber: "+1231231234",
      bloodAmount: 1,
      division: "Dhaka",
      district: "Dhaka",
      upazila: "Mohammadpur",
      address: "202 West Street, Mohammadpur",
      requiredDate: new Date("2023-09-26"),
      requireTime: new Date("2023-09-26T11:30:00"),
      hemoglobin: 12,
      patientProblem: "Scheduled Surgery",
      createdAt: new Date("2023-09-20"),
      updatedAt: new Date("2023-09-20"),
    },
  },
];

// Types based on the schema
interface User {
  id: string;
  name: string;
  image: string | null;
  blood: string | null;
  email: string;
}

interface BloodRequest {
  id: string;
  userId: string;
  patientName: string;
  blood: string;
  hospitalName: string;
  contactNumber: string;
  whatsappNumber: string | null;
  bloodAmount: number;
  division: string;
  district: string;
  upazila: string;
  address: string;
  requiredDate: Date;
  requireTime: Date;
  hemoglobin?: number | null;
  patientProblem?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Donation {
  id: string;
  userId: string;
  bloodRequestId: string;
  status: "confirmed" | "pending" | "cancelled";
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  bloodRequest: BloodRequest;
}

export function UserDonationHistory() {
  const t = useTranslations("UserDonations");
  const { data: session } = useSession();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  // Colors for charts
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
    "#FF6B6B",
    "#6B66FF",
  ];
  const textColor = "#000000";
  const gridColor = "#e0e0e0";

  useEffect(() => {
    // Simulate API call with mock data
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/donations');
        // const data = await response.json();
        const res = await getMyDonation(session?.user?.id!);
        setTimeout(() => {
          setDonations(res?.data);
          // Calculate stats from mock data
          const completedCount = res?.data?.filter(
            (d: any) => d.status === "confirmed"
          ).length;
          const pendingCount = res?.data?.filter(
            (d: any) => d.status === "pending"
          ).length;
          const cancelledCount = res?.data?.filter(
            (d: any) => d.status === "cancelled"
          ).length;
          const selectedCount = res?.data?.filter(
            (d: any) => d.status === "selected"
          ).length;

          // Group by blood type
          const bloodTypeCount = res?.data.reduce((acc: any, donation: any) => {
            const bloodType = donation.bloodRequest.blood;

            if (donation.status === "confirmed") {
              acc[bloodType] =
                (acc[bloodType] || 0) + donation.bloodRequest.bloodAmount;
            }
            return acc;
          }, {} as Record<string, number>);

          // Group by month
          const sixMonthsAgo = new Date();
          sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);

          const donationsByMonth = [];
          for (let i = 0; i < 6; i++) {
            const month = new Date(sixMonthsAgo);
            month.setMonth(sixMonthsAgo.getMonth() + i);

            const monthName = month.toLocaleString("default", {
              month: "short",
            });
            const year = month.getFullYear();
            const monthKey = `${monthName} ${year}`;

            const monthStart = new Date(year, month.getMonth(), 1);
            const monthEnd = new Date(year, month.getMonth() + 1, 0);

            const monthDonations = res.data.filter((d: any) => {
              const donationDate = new Date(d.createdAt);
              return (
                d.status === "confirmed" &&
                donationDate >= monthStart &&
                donationDate <= monthEnd
              );
            });

            donationsByMonth.push({
              month: monthKey,
              count: monthDonations.length,
              units: monthDonations.reduce(
                (sum: any, d: any) => sum + d.bloodRequest.bloodAmount,
                0
              ),
            });
          }

          setStats({
            totalDonations: res.data?.length,
            completedDonations: completedCount,
            pendingDonations: pendingCount,
            selectedDonations: selectedCount,
            cancelledDonations: cancelledCount,
            donationsByBloodType: bloodTypeCount,
            donationsByMonth,
          });

          setLoading(false);
        }, 1000); // Simulate network delay
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load donation data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge variant="outline" className="bg-green-400 text-white">
            {t("donations.status.confirmed")}
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="secondary" className="bg-blue-400 text-white">
            {t("donations.status.pending")}
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="destructive">{t("donations.status.cancelled")}</Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Prepare data for blood type pie chart
  const prepareBloodTypeData = () => {
    if (!stats || !stats.donationsByBloodType) return [];

    return Object.entries(stats.donationsByBloodType).map(
      ([type, units], index) => ({
        name: type,
        value: units,
        color: COLORS[index % COLORS.length],
      })
    );
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return `${d.toLocaleString("default", {
      month: "short",
    })} ${d.getDate()}, ${d.getFullYear()}`;
  };

  const formatTime = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6 p-1 md:p-4 lg:p-8 max-w-6xl mx-auto">
      <div className="animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>
      </div>

      {loading ? (
        <>
          <Card className="w-full mb-6">
            <CardHeader>
              <Skeleton className="h-8 w-1/3" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-1/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-1/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-1/3" />
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Skeleton className="h-10 w-full mb-2" />
                <Skeleton className="h-10 w-full mb-2" />
                <Skeleton className="h-10 w-full mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          {/* Stats Cards */}
          {stats && (
            <div className="animate-fade-in delay-75">
              <Card className="w-full mb-6">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">
                    Donation Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Total Donations
                      </p>
                      <h3 className="text-2xl font-bold">
                        {stats.totalDonations}
                      </h3>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <h3 className="text-2xl font-bold">
                        {stats.completedDonations}
                      </h3>
                    </div>
                    <div className="bg-yellow-500/10 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Pending/Selected
                      </p>
                      <h3 className="text-2xl font-bold">
                        {stats.pendingDonations}/{stats.selectedDonations}
                      </h3>
                    </div>
                    <div className="bg-red-500/10 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">Cancelled</p>
                      <h3 className="text-2xl font-bold">
                        {stats.cancelledDonations}
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Charts */}
          {stats &&
            stats.donationsByMonth &&
            stats.donationsByMonth.length > 0 && (
              <div className="animate-fade-in delay-100 grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Monthly Donations Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg md:text-xl">
                      Monthly Donations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={stats.donationsByMonth}
                          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={gridColor}
                          />
                          <XAxis
                            dataKey="month"
                            angle={-45}
                            textAnchor="end"
                            tick={{ fill: textColor }}
                            height={60}
                          />
                          <YAxis tick={{ fill: textColor }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#fff",
                              color: textColor,
                              border: "1px solid #ddd",
                            }}
                          />
                          <Legend />
                          <Bar
                            dataKey="units"
                            name="Units Donated"
                            fill="#0088FE"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Blood Type Distribution Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg md:text-xl">
                      Blood Type Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={prepareBloodTypeData()}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({ name, percent }) =>
                              `${name}: ${(percent * 100).toFixed(0)}%`
                            }
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {prepareBloodTypeData().map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value) => [`${value} units`, "Amount"]}
                            contentStyle={{
                              backgroundColor: "#fff",
                              color: textColor,
                              border: "1px solid #ddd",
                            }}
                          />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

          {/* Donations Table */}
          <div className="animate-fade-in delay-150">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                  Your Donation History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto -mx-4 sm:-mx-0">
                  {donations.length > 0 ? (
                    <div className="inline-block min-w-full align-middle">
                      <div className="overflow-hidden sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-muted/50">
                            <tr>
                              <th
                                scope="col"
                                className="px-2 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Patient
                              </th>
                              <th
                                scope="col"
                                className="px-2 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
                              >
                                Hospital
                              </th>
                              <th
                                scope="col"
                                className="px-2 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Blood
                              </th>
                              <th
                                scope="col"
                                className="px-2 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                              >
                                Required Date
                              </th>
                              <th
                                scope="col"
                                className="px-2 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Status
                              </th>
                              <th
                                scope="col"
                                className="px-2 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell"
                              >
                                Donation Date
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {donations
                              .sort(
                                (a, b) =>
                                  new Date(b.createdAt).getTime() -
                                  new Date(a.createdAt).getTime()
                              )
                              .map((donation) => (
                                <tr
                                  key={donation.id}
                                  className="hover:bg-muted/50"
                                >
                                  <td className="px-2 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                      <div className="hidden sm:flex flex-shrink-0 h-10 w-10 mr-3">
                                        <Avatar className="h-8 w-8">
                                          <AvatarImage
                                            src={donation.user.image || ""}
                                            alt={donation.user.name}
                                          />
                                          <AvatarFallback>
                                            {donation.user.name.charAt(0)}
                                          </AvatarFallback>
                                        </Avatar>
                                      </div>
                                      <div className="ml-0 sm:ml-1">
                                        <div className="text-xs sm:text-sm font-medium text-gray-900">
                                          {donation.bloodRequest.patientName}
                                        </div>
                                        <div className="text-xs text-gray-500 hidden sm:block">
                                          {donation.bloodRequest
                                            .patientProblem || "Medical Need"}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-2 py-4 whitespace-nowrap hidden sm:table-cell">
                                    <div className="text-xs sm:text-sm text-gray-900">
                                      {donation.bloodRequest.hospitalName}
                                    </div>
                                    <div className="text-xs text-gray-500 hidden md:block">
                                      {donation.bloodRequest.address}
                                    </div>
                                  </td>
                                  <td className="px-2 py-4 whitespace-nowrap">
                                    <Badge
                                      variant="outline"
                                      className="font-bold text-xs"
                                    >
                                      {donation.bloodRequest.blood}
                                    </Badge>
                                    <span className="ml-1 text-xs sm:text-sm">
                                      {donation.bloodRequest.bloodAmount}
                                    </span>
                                  </td>
                                  <td className="px-2 py-4 whitespace-nowrap hidden md:table-cell">
                                    <div className="text-xs sm:text-sm text-gray-900">
                                      {formatDate(
                                        donation.bloodRequest.requiredDate
                                      )}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {formatTime(
                                        donation.bloodRequest.requireTime
                                      )}
                                    </div>
                                  </td>
                                  <td className="px-2 py-4 whitespace-nowrap">
                                    {getStatusBadge(donation.status)}
                                  </td>
                                  <td className="px-2 py-4 whitespace-nowrap hidden lg:table-cell">
                                    <div className="text-xs sm:text-sm text-gray-900">
                                      {formatDate(donation.createdAt)}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {formatTime(donation.createdAt)}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        {t("noDonations")}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
