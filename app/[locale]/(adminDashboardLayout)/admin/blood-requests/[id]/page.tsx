"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Droplet,
  User,
  Building,
  FileText,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { BloodRequest, getBloodRequestById, updateBloodRequest } from "@/services/bloodRegister";



export default function BloodRequestDetailsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const requestId = params.id as string;
  const [request, setRequest] = useState<BloodRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBloodRequest = async () => {
      try {
        setLoading(true);
        const response = await getBloodRequestById(requestId);
        setRequest(response.data);
      } catch (error) {
        console.error("Error fetching blood request:", error);
        toast.error("Failed to load blood request details");
      } finally {
        setLoading(false);
      }
    };

    fetchBloodRequest();
  }, [requestId]);

  // Redirect if not logged in
  useEffect(() => {
    if (!session?.user) {
      router.push("/auth/signin");
    }
  }, [session, router]);

  // Handle status change
  /*
  const handleStatusChange = async (
    status: "pending" | "fulfilled" | "cancelled"
  ) => {
    if (!session?.user?.id || !request) return;

    try {
      const response = await updateBloodRequest(
        requestId,
        { status },
        session.user.id
      );
      setRequest(response.data);
      toast.success(`Blood request marked as ${status}`);
    } catch (error) {
      console.error("Error updating blood request status:", error);
      toast.error("Failed to update blood request status");
    }
  };
*/
  // Render status badge
  const renderStatusBadge = (status?: string) => {
    switch (status) {
      case "fulfilled":
        return (
          <Badge
            variant="outline"
            className="bg-green-500/10 text-green-700 border-green-300"
          >
            Fulfilled
          </Badge>
        );
      case "cancelled":
        return (
          <Badge
            variant="outline"
            className="bg-red-500/10 text-red-700 border-red-300"
          >
            Cancelled
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="bg-yellow-500/10 text-blue-700 border-blue-300"
          >
            Pending
          </Badge>
        );
    }
  };

  // Format date
  const formatDate = (dateString?: string | Date) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "PPP");
    } catch (error) {
      return "Invalid date";
    }
  };

  // Format time
  const formatTime = (timeString?: string | Date) => {
    if (!timeString) return "N/A";
    try {
      return format(new Date(timeString), "p");
    } catch (error) {
      return "Invalid time";
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" disabled>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Skeleton className="h-8 w-64" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-72" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center gap-4">
                <Skeleton className="h-40 w-40 rounded-full" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex-1 space-y-6">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-2">Blood Request Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The blood request you're looking for doesn't exist or you don't have
          permission to view it.
        </p>
        <Button onClick={() => router.push("/admin/blood-requests")}>
          Back to Blood Requests
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-10">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push("/admin/blood-requests")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
          Blood Request Details
        </h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                Blood Request for{" "}
                <span className="text-primary">{request.patientName}</span>
              </CardTitle>
              <CardDescription>Request ID: {request.id}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {renderStatusBadge("pending")}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Patient Information
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Patient Name</div>
                      <div className="text-sm">{request.patientName}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Droplet className="h-5 w-5 text-red-500" />
                    <div>
                      <div className="text-sm font-medium">Blood Type</div>
                      <div className="text-sm font-bold text-red-500">
                        {request.blood}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Blood Amount</div>
                      <div className="text-sm">{request.bloodAmount} units</div>
                    </div>
                  </div>

                  {request.patientProblem && (
                    <div className="flex items-start gap-2">
                      <FileText className="h-5 w-5 text-muted-foreground mt-1" />
                      <div>
                        <div className="text-sm font-medium">
                          Patient Problem
                        </div>
                        <div className="text-sm">{request.patientProblem}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Contact Number</div>
                      <div className="text-sm">{request.contactNumber}</div>
                    </div>
                  </div>

                  {request.whatsappNumber && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">
                          WhatsApp Number
                        </div>
                        <div className="text-sm">{request.whatsappNumber}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Donation Details</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Hospital Name</div>
                      <div className="text-sm">{request.hospitalName}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Location</div>
                      <div className="text-sm">
                        {request.address
                          ? `${request.address}, ${request.upazila}, ${request.district}, ${request.division}`
                          : `${request.upazila}, ${request.district}, ${request.division}`}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Required Date</div>
                      <div className="text-sm">
                        {formatDate(request.requiredDate)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Required Time</div>
                      <div className="text-sm">
                        {formatTime(request.requireTime)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4">Request Status</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Request Date</div>
                      <div className="text-sm">
                        {formatDate(request.createdAt)}
                      </div>
                    </div>
                  </div>

                  {/*     <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Current Status</div>
                      <div className="text-sm">
                        {renderStatusBadge(request.status)}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button
                      size="sm"
                      variant={
                        request.status === "pending" ? "default" : "outline"
                      }
                      onClick={() => handleStatusChange("pending")}
                      disabled={request.status === "pending"}
                    >
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Mark as Pending
                    </Button>
                    <Button
                      size="sm"
                      variant={
                        request.status === "fulfilled" ? "default" : "outline"
                      }
                      onClick={() => handleStatusChange("fulfilled")}
                      disabled={request.status === "fulfilled"}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Fulfilled
                    </Button>
                    <Button
                      size="sm"
                      variant={
                        request.status === "cancelled" ? "default" : "outline"
                      }
                      onClick={() => handleStatusChange("cancelled")}
                      disabled={request.status === "cancelled"}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Mark as Cancelled
                    </Button>
                  </div>
                  */}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => router.push("/admin/blood-requests")}
        >
          Back to Blood Requests
        </Button>
      </div>
    </div>
  );
}
