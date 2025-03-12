"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { format } from "date-fns";

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
  Heart,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { getDonorById } from "@/services/beDonor";
import Image from "next/image";

export default function DonorDetailsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const donorId = params.id as string;
  const [donor, setDonor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonor = async () => {
      try {
        setLoading(true);
        const donorData = await getDonorById(donorId);
        setDonor(donorData);
      } catch (error) {
        console.error("Error fetching donor:", error);
        toast.error("Failed to load donor details");
      } finally {
        setLoading(false);
      }
    };

    fetchDonor();
  }, [donorId]);

  // Redirect if not logged in
  useEffect(() => {
    if (!session?.user) {
      router.push("/auth/signin");
    }
  }, [session, router]);

  // Format date
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };

  // Calculate if donor is eligible (last donation was more than 3 months ago)
  const isEligible = (lastDonationDate: string | null | undefined) => {
    if (!lastDonationDate) return true;

    try {
      const lastDonation = new Date(lastDonationDate);
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

      return lastDonation < threeMonthsAgo;
    } catch (error) {
      return false;
    }
  };

  // Calculate next eligible date
  const getNextEligibleDate = (lastDonationDate: string | null | undefined) => {
    if (!lastDonationDate) return "Now";

    try {
      const lastDonation = new Date(lastDonationDate);
      const nextEligible = new Date(lastDonation);
      nextEligible.setMonth(lastDonation.getMonth() + 3);

      return format(nextEligible, "MMMM d, yyyy");
    } catch (error) {
      return "Unknown";
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

  if (!donor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-2">Donor Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The donor you're looking for doesn't exist or you don't have
          permission to view it.
        </p>
        <Button onClick={() => router.push("/admin/donors")}>
          Back to Donors List
        </Button>
      </div>
    );
  }
console.log(donor);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push("/admin/donors")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Donor Details</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Donor Profile</CardTitle>
          <CardDescription>
            Detailed information about the donor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24">
                {donor.user?.image ? (
                  <Image src={donor?.user?.image} alt={donor.user?.name} height={100} width={100} />
                ) : (
                  <AvatarFallback className="text-4xl">
                    {donor.user?.name?.charAt(0) || "D"}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-bold">
                  {donor.user?.name || "No Name"}
                </h2>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className="font-bold text-red-500">
                    {donor.user?.blood || "Unknown"}
                  </Badge>
                  {isEligible(donor.user?.lastDonationDate) ? (
                    <Badge variant="default" className="bg-green-500">
                      Eligible
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Not Eligible</Badge>
                  )}
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
                      <span>{donor.user?.email || "No Email"}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Phone
                    </h3>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{donor.phone || "No Phone"}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      WhatsApp
                    </h3>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{donor.whatsappNumber || "Not provided"}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Emergency Contact
                    </h3>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                      <span>{donor.emergencyContact || "Not provided"}</span>
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
                        {donor.user?.address
                          ? `${donor.user.address}, ${donor.user.upazila}, ${donor.user.district}, ${donor.user.division}`
                          : "No Address"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Last Donation
                    </h3>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(donor.user?.lastDonationDate)}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Next Eligible Date
                    </h3>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {getNextEligibleDate(donor.user?.lastDonationDate)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Total Donations
                    </h3>
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span>{donor.totalDonations || 0} donations</span>
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
                        {donor.user?.gender || "Not specified"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">Date of Birth</div>
                      <div className="text-sm text-muted-foreground">
                        {donor.user?.dateOfBirth
                          ? formatDate(donor.user.dateOfBirth)
                          : "Not specified"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">
                        Medical Condition
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {donor.medicalCondition || "None reported"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">
                        Current Medications
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {donor.currentMedications || "None reported"}
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
        <Button variant="outline" onClick={() => router.push("/admin/donors")}>
          Back to Donors List
        </Button>
        
      </div>
    </div>
  );
}
