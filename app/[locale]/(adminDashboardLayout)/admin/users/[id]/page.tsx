"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { getUserById } from "@/services/auth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Shield,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function UserDetailsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!session?.user?.id) return;

      try {
        setLoading(true);
        const userData = await getUserById(userId, session.user.id);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Failed to load user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, session?.user?.id]);

  // Redirect if not logged in
  useEffect(() => {
    if (!session?.user) {
      router.push("/auth/signin");
    }
  }, [session, router]);

  // Render role badge
  const renderRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge variant="secondary">Admin</Badge>;
      case "superadmin":
        return <Badge variant="destructive">Super Admin</Badge>;
      case "volunteer":
        return <Badge variant="outline">Volunteer</Badge>;
      default:
        return <Badge variant="default">User</Badge>;
    }
  };

  // Render status badge
  const renderStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge variant="default" className="bg-green-500">
        Active
      </Badge>
    ) : (
      <Badge variant="destructive">Blocked</Badge>
    );
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

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-2">User Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The user you're looking for doesn't exist or you don't have permission
          to view it.
        </p>
        <Button onClick={() => router.push("/admin/users")}>
          Back to Users List
        </Button>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push("/admin/users")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">User Details</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>Detailed information about the user</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-40 w-40">
                <AvatarImage
                  src={user.image || "/placeholder.svg?height=160&width=160"}
                  alt={user.name}
                />
                <AvatarFallback className="text-4xl">
                  {user.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-bold">{user.name || "No Name"}</h2>
                <div className="flex gap-2 mt-2">
                  {renderRoleBadge(user.role)}
                  {renderStatusBadge(user.status)}
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Email
                    </h3>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{user.email || "No Email"}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Phone
                    </h3>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{user.phone || "No Phone"}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Blood Type
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-red-500 font-bold">
                        {user.blood || "Not specified"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Location
                    </h3>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {user.address
                          ? `${user.address}, ${user.upazila}, ${user.district}, ${user.division}`
                          : "No Address"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Joined On
                    </h3>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(user.createdAt)}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Last Updated
                    </h3>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(user.updatedAt)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="font-medium">Additional Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
                    <User className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">Gender</div>
                      <div className="text-sm text-muted-foreground">
                        {user.gender || "Not specified"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">Date of Birth</div>
                      <div className="text-sm text-muted-foreground">
                        {user.dateOfBirth
                          ? formatDate(user.dateOfBirth)
                          : "Not specified"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">Last Donation</div>
                      <div className="text-sm text-muted-foreground">
                        {user.lastDonationDate
                          ? formatDate(user.lastDonationDate)
                          : "No donation record"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">Account Status</div>
                      <div className="flex items-center gap-1">
                        {user.status === "active" ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="text-sm">
                          {user.status === "active"
                            ? "Active Account"
                            : "Blocked Account"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => router.push("/admin/users")}>
          Back to Users List
        </Button>
        <Button
          variant="default"
          onClick={() => router.push(`/admin/users/${userId}/edit`)}
        >
          Edit User
        </Button>
      </div>
    </div>
  );
}
