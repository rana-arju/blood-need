"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  MessageCircle,
  User,
  Heart,
  Clock,
  Activity,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { ShareButton } from "@/components/ShareButton";
import { getSingleDonor } from "@/services/beDonor";
import { extractFacebookUsername, getFacebookUrl } from "@/utils/socialMedia";
import Link from "next/link";
import { getLocationName } from "@/utils/locationUtils";

export default function DonorDetailPage() {
  const { id } = useParams();
  const [donor, setDonor] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDonorDetails = async () => {
      try {
        const data = await getSingleDonor(id as string);
        data.user.division = await getLocationName(
          "division",
          data.user.division
        );
        data.user.district = await getLocationName(
          "district",
          data.user.district
        );
        data.user.upazila = await getLocationName("upazila", data.user.upazila);
        setDonor(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load donor details"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonorDetails();
  }, [id]);

  if (isLoading) {
    return <DonorDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!donor) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Not Found</AlertTitle>
          <AlertDescription>
            The donor you're looking for doesn't exist or has been removed.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const user = donor.user;
  const lastDonation = user.lastDonationDate
    ? formatDistanceToNow(new Date(user.lastDonationDate), { addSuffix: true })
    : "No donation record";

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Calculate eligibility (assuming 3 months between donations)
  const isEligible = () => {
    if (!user.lastDonationDate) return true;
    const lastDonationDate = new Date(user.lastDonationDate);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return lastDonationDate < threeMonthsAgo;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-end mb-2">
                <ShareButton
                  url={`/donors/${id}`}
                  title={`Blood Donor: ${user.name} (${user.blood}) in ${
                    user.district || ""
                  }`}
                />
              </div>
              <Avatar className="h-24 w-24 mx-auto mb-4">
                {user?.image && (
                  <AvatarImage src={user.image} alt={user.name} />
                )}
                <AvatarFallback className="text-2xl">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <div className="flex justify-center mt-2">
                <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 text-lg px-3 py-1">
                  {user.blood}
                </Badge>
              </div>
              {isEligible() ? (
                <Badge className="bg-green-100 hover:bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 mt-2">
                  Eligible to donate
                </Badge>
              ) : (
                <Badge variant="outline" className="mt-2">
                  Not eligible yet
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <a href={`tel:${donor.phone}`} className="hover:underline">
                    {donor.phone}
                  </a>
                </div>
                {user.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <Link
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${user.email}&su=I%20Want%20Blood.%20Please%20help%20me.&body=I%20Want%20Blood.%20Please%20help%20me.`}
                      target="_blank"
                    >
                      {user.email}
                    </Link>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span>
                    {[user.address, user.upazila, user.district, user.division]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span>Last donation: {lastDonation}</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span>Gender: {user.gender || "Not specified"}</span>
                </div>
                <div className="pt-4">
                  <Button className="w-full" asChild>
                    <a
                      href={
                        donor.whatsappNumber
                          ? `https://wa.me/${donor.whatsappNumber.replace(
                              /\D/g,
                              ""
                            )}`
                          : `https://wa.me/${donor.phone.replace(/\D/g, "")}`
                      }
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Contact via WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="medical">Medical Info</TabsTrigger>
              <TabsTrigger value="history">Donation History</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-center">
                      Personal Details
                    </CardTitle>
                    <ShareButton
                      url={`/donors/${id}`}
                      title={`Blood Donor: ${user.name} (${user.blood}) in ${
                        user.district || ""
                      }`}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {user.dateOfBirth && (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="font-medium">Date of Birth</div>
                      <div>{format(new Date(user.dateOfBirth), "PPP")}</div>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">Emergency Contact</div>
                    <Link
                      href={`tel:${donor.emergencyContact}`}
                      className="hover:underline text-blue-600 dark:text-blue-400"
                    >
                      {donor.emergencyContact}
                    </Link>
                  </div>
                  {donor.whatsappNumber && (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="font-medium">WhatsApp</div>
                      <div>
                        <a
                          href={`https://wa.me/${donor.whatsappNumber.replace(
                            /\D/g,
                            ""
                          )}`}
                          className="hover:underline text-blue-600 dark:text-blue-400"
                        >
                          {donor.whatsappNumber}
                        </a>
                      </div>
                    </div>
                  )}
                  {donor.facebookId && (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="font-medium">Facebook</div>
                      <div>
                        <a
                          href={getFacebookUrl(donor.facebookId)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline text-blue-600 dark:text-blue-400"
                        >
                          @{extractFacebookUsername(donor.facebookId)}
                        </a>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">Member Since</div>
                    <div>{format(new Date(donor.createdAt), "PPP")}</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="medical" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Medical Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted p-4 rounded-lg text-center">
                      <Activity className="h-6 w-6 mx-auto mb-2" />
                      <div className="text-sm font-medium">Height</div>
                      <div className="text-xl mt-1">
                        {donor.height || "N/A"} cm
                      </div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg text-center">
                      <Activity className="h-6 w-6 mx-auto mb-2" />
                      <div className="text-sm font-medium">Weight</div>
                      <div className="text-xl mt-1">
                        {donor.weight || "N/A"} kg
                      </div>
                    </div>
                  </div>

                  {donor.medicalCondition && (
                    <div className="mt-4">
                      <h3 className="font-medium mb-2">Medical Conditions</h3>
                      <p className="text-sm bg-muted p-3 rounded">
                        {donor.medicalCondition}
                      </p>
                    </div>
                  )}

                  {donor.currentMedications && (
                    <div className="mt-4">
                      <h3 className="font-medium mb-2">Current Medications</h3>
                      <p className="text-sm bg-muted p-3 rounded">
                        {donor.currentMedications}
                      </p>
                    </div>
                  )}

                  {!donor.medicalCondition && !donor.currentMedications && (
                    <div className="mt-4 text-center text-muted-foreground">
                      <p>No additional medical information provided</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="history" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Donation History</CardTitle>
                </CardHeader>
                <CardContent>
                  {user.donationCount > 0 ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Heart className="h-5 w-5 text-red-500" />
                          <span className="font-medium">Total Donations</span>
                        </div>
                        <Badge variant="secondary">{user.donationCount}</Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-blue-500" />
                          <span className="font-medium">Last Donation</span>
                        </div>
                        <span>
                          {user.lastDonationDate
                            ? format(new Date(user.lastDonationDate), "PPP")
                            : "N/A"}
                        </span>
                      </div>

                      {/* We could add more detailed donation history here if available */}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <Heart className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                      <p>No donation history available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function DonorDetailSkeleton() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <Skeleton className="h-24 w-24 rounded-full mx-auto mb-4" />
              <Skeleton className="h-8 w-48 mx-auto" />
              <div className="flex justify-center mt-2">
                <Skeleton className="h-6 w-16" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-10 w-full mt-4" />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Skeleton className="h-10 w-full mb-4" />
          <Card>
            <CardHeader>
              <Skeleton className="h-7 w-48" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
