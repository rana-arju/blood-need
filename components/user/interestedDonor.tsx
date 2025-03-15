"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { formatDistanceToNow, format } from "date-fns";
import {
  Calendar,
  Phone,
  Mail,
  User,
  Droplet,
  Heart,
  Activity,
  Clock,
  AlertCircle,
  MessageCircle,
  UserCheck,
  UserX,
  CheckCircle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { DonorDetails } from "@/types/donor-details";
import { updateDonorStatus } from "@/services/bloodRegister";
import { StatusChangeDialog } from "./StatusChangeDialog";

interface InterestedDonorDetailsProps {
  donor: DonorDetails;
  requestId: string;
  userIsRequester: boolean;
}

export default function InterestedDonorDetails({
  donor,
  requestId,
  userIsRequester,
}: InterestedDonorDetailsProps) {
  const t = useTranslations("BloodRequestDetails.interestedDonorDetails");
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [status, setStatus] = useState<
    "pending" | "selected" | "confirmed" | "cancelled"
  >(donor.donationOffer.status);
  const [isOpen, setIsOpen] = useState(false);
  const handleStatusChange = async (
    newStatus: "pending" | "selected" | "confirmed" | "cancelled"
  ) => {
    if (newStatus === status) return;

    try {
      setIsUpdating(true);
      await updateDonorStatus(requestId, donor.id, newStatus);
      setStatus(newStatus);
      toast.success(t("statusUpdated"));
    } catch (error) {
      console.error("Error updating donor status:", error);
      toast.error(t("errorUpdatingStatus"));
    } finally {
      setIsUpdating(false);
    }
  };

  const handleStatusButtonClick = (
    newStatus: "selected" | "confirmed" | "cancelled"
  ) => {
    handleStatusChange(newStatus);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">{t("pending")}</Badge>;
      case "selected":
        return <Badge variant="secondary">{t("selected")}</Badge>;
      case "confirmed":
        return <Badge variant="default">{t("confirmed")}</Badge>;
      case "cancelled":
        return <Badge variant="destructive">{t("cancelled")}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  function calculateAge(dateOfBirth: string | Date): number {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // Adjust age if birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  }

  return (
    <div className="space-y-6 w-[300px] md:w-full">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-col md:flex-row">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                {donor.image ? (
                  <Image
                    src={donor.image}
                    alt={donor.name}
                    width={60}
                    height={60}
                    className="object-fit h-16 w-16"
                  />
                ) : (
                  <User className="h-8 w-8 opacity-50" />
                )}
              </div>
              <div>
                <CardTitle className="text-lg md:text-xl">
                  {donor.name}
                </CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <Droplet className="h-4 w-4" />
                  {donor.blood || t("notSpecified")}
                  <Separator orientation="vertical" className="h-4 mx-2" />
                  {getStatusBadge(status)}
                </CardDescription>
              </div>
            </div>
          

            {userIsRequester && (
              <StatusChangeDialog
                currentStatus={status}
                requestId={requestId}
                userId={donor.id}
                onStatusChange={setStatus}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
              />
            )}
            
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="personal">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="personal">{t("personalInfo")}</TabsTrigger>
              <TabsTrigger value="contact">{t("contactInfo")}</TabsTrigger>
              <TabsTrigger value="medical">{t("medicalInfo")}</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Droplet className="h-5 w-5 opacity-70" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("bloodType")}
                    </p>
                    <p className="font-medium">
                      {donor.blood || t("notSpecified")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 opacity-70" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("gender")}
                    </p>
                    <p className="font-medium">
                      {donor.gender || t("notSpecified")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 opacity-70" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t("age")}</p>
                    <p className="font-medium">
                      {donor.dateOfBirth
                        ? calculateAge(donor.dateOfBirth)
                        : t("notSpecified")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 opacity-70" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("donorSince")}
                    </p>
                    <p className="font-medium">
                      {donor.donorInfo?.createdAt
                        ? format(new Date(donor.donorInfo.createdAt), "PPP")
                        : t("notSpecified")}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 opacity-70" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{donor.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 opacity-70" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">
                      {donor.donorInfo?.phone || t("notSpecified")}
                    </p>
                  </div>
                </div>

                {donor.donorInfo?.whatsappNumber && (
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 opacity-70" />
                    <div>
                      <p className="text-sm text-muted-foreground">WhatsApp</p>
                      <p className="font-medium">
                        {donor.donorInfo.whatsappNumber}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 opacity-70" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("emergencyContact")}
                    </p>
                    <p className="font-medium">
                      {donor.donorInfo?.emergencyContact || t("notSpecified")}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="medical" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <Activity className="h-5 w-5 opacity-70 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("height")}
                    </p>
                    <p className="font-medium">
                      {donor.donorInfo?.height
                        ? `${donor.donorInfo.height} ${t("cm")}`
                        : t("notSpecified")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Activity className="h-5 w-5 opacity-70 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("weight")}
                    </p>
                    <p className="font-medium">
                      {donor.donorInfo?.weight
                        ? `${donor.donorInfo.weight} ${t("kg")}`
                        : t("notSpecified")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Heart className="h-5 w-5 opacity-70 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("medicalCondition")}
                    </p>
                    <p className="font-medium">
                      {donor.donorInfo?.medicalCondition || t("none")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Heart className="h-5 w-5 opacity-70 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("currentMedications")}
                    </p>
                    <p className="font-medium">
                      {donor.donorInfo?.currentMedications || t("none")}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-center bg-muted rounded-md p-4">
              <div className="flex flex-col items-center">
                <Clock className="h-6 w-6 mb-1 opacity-70" />
                <p className="text-sm text-muted-foreground">
                  {t("lastDonation")}
                </p>
                <p className="font-medium">
                  {donor.lastDonationDate
                    ? formatDistanceToNow(new Date(donor.lastDonationDate), {
                        addSuffix: true,
                      })
                    : t("notSpecified")}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center bg-muted rounded-md p-4">
              <div className="flex flex-col items-center">
                <Droplet className="h-6 w-6 mb-1 opacity-70" />
                <p className="text-sm text-muted-foreground">
                  {t("totalDonations")}
                </p>
                <p className="font-medium">
                  {donor.donorInfo?.totalDonations || 0}
                </p>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>

      {userIsRequester && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">
              {t("donorStatus")}
            </CardTitle>
            <CardDescription>{t("selectStatus")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              {status !== "selected" && (
                <Button
                  onClick={() => handleStatusButtonClick("selected")}
                  className="flex gap-2"
                  disabled={isUpdating}
                >
                  <UserCheck className="h-4 w-4" />
                  {t("selectThisDonor")}
                </Button>
              )}

              {status !== "confirmed" && status === "selected" && (
                <Button
                  onClick={() => handleStatusButtonClick("confirmed")}
                  className="flex gap-2"
                  variant="secondary"
                  disabled={isUpdating}
                >
                  <CheckCircle className="h-4 w-4" />
                  {t("confirmDonation")}
                </Button>
              )}

              {status !== "cancelled" && (
                <Button
                  onClick={() => handleStatusButtonClick("cancelled")}
                  className="flex gap-2"
                  variant="destructive"
                  disabled={isUpdating}
                >
                  <UserX className="h-4 w-4" />
                  {t("cancelSelection")}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Button
        variant="outline"
        className="w-full"
        onClick={() => router.back()}
      >
        {t("backToRequest")}
      </Button>
    </div>
  );
}
