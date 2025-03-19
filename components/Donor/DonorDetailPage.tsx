"use client";

import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
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
import { ShareButton } from "@/components/ShareButton";
import { extractFacebookUsername, getFacebookUrl } from "@/utils/socialMedia";
import Link from "next/link";

interface DonorDetailPageProps {
  donor: any;
}

export default function DonorDetailPage({ donor }: DonorDetailPageProps) {
  const t = useTranslations("Donors");
  const user = donor.user;

  const lastDonation = user.lastDonationDate
    ? formatDistanceToNow(new Date(user.lastDonationDate), { addSuffix: true })
    : t("noDonationRecord");

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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-end mb-2">
              <ShareButton
                url={`/donors/${donor.id}`}
                title={t("shareTitle", {
                  name: user.name,
                  bloodType: user.blood,
                  location: user.district || "",
                })}
              />
            </div>
            <Avatar className="h-24 w-24 mx-auto mb-4">
              {user?.image && (
                <AvatarImage
                  src={user.image}
                  alt={t("donorImageAlt", { name: user.name })}
                />
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
                {t("eligibleToDonate")}
              </Badge>
            ) : (
              <Badge variant="outline" className="mt-2">
                {t("notEligibleYet")}
              </Badge>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone
                  className="h-5 w-5 text-muted-foreground"
                  aria-hidden="true"
                />
                <a
                  href={`tel:${donor.phone}`}
                  className="hover:underline"
                  aria-label={t("callAriaLabel", { phone: donor.phone })}
                >
                  {donor.phone}
                </a>
              </div>
              {user.email && (
                <div className="flex items-center gap-3">
                  <Mail
                    className="h-5 w-5 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Link
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${
                      user.email
                    }&su=${encodeURIComponent(
                      t("emailSubject")
                    )}&body=${encodeURIComponent(t("emailBody"))}`}
                    target="_blank"
                    aria-label={t("emailAriaLabel", { email: user.email })}
                  >
                    {user.email}
                  </Link>
                </div>
              )}
              <div className="flex items-center gap-3">
                <MapPin
                  className="h-5 w-5 text-muted-foreground"
                  aria-hidden="true"
                />
                <span>
                  {[user.address, user.upazila, user.district, user.division]
                    .filter(Boolean)
                    .join(", ")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar
                  className="h-5 w-5 text-muted-foreground"
                  aria-hidden="true"
                />
                <span>
                  {t("lastDonation")}: {lastDonation}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <User
                  className="h-5 w-5 text-muted-foreground"
                  aria-hidden="true"
                />
                <span>
                  {t("gender")}: {" "}
                  {user.gender
                    ? user.gender
                    : t("notSpecified")}
                </span>
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
                    aria-label={t("whatsappAriaLabel", { name: user.name })}
                  >
                    <MessageCircle
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    {t("contactViaWhatsapp")}
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
            <TabsTrigger value="details">{t("tabs.details")}</TabsTrigger>
            <TabsTrigger value="medical">{t("tabs.medical")}</TabsTrigger>
            <TabsTrigger value="history">{t("tabs.history")}</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-center">
                    {t("personalDetails")}
                  </CardTitle>
                  <ShareButton
                    url={`/donors/${donor.id}`}
                    title={t("shareTitle", {
                      name: user.name,
                      bloodType: user.blood,
                      location: user.district || "",
                    })}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.dateOfBirth && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">{t("dateOfBirth")}</div>
                    <div>{format(new Date(user.dateOfBirth), "PPP")}</div>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-medium">{t("emergencyContact")}</div>
                  <Link
                    href={`tel:${donor.emergencyContact}`}
                    className="hover:underline text-blue-600 dark:text-blue-400"
                  >
                    {donor.emergencyContact}
                  </Link>
                </div>
                {donor.whatsappNumber && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">{t("whatsapp")}</div>
                    <div>
                      <a
                        href={`https://wa.me/${donor.whatsappNumber.replace(
                          /\D/g,
                          ""
                        )}`}
                        className="hover:underline text-blue-600 dark:text-blue-400"
                        aria-label={t("whatsappAriaLabel", { name: user.name })}
                      >
                        {donor.whatsappNumber}
                      </a>
                    </div>
                  </div>
                )}
                {donor.facebookId && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">{t("facebook")}</div>
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
                  <div className="font-medium">{t("memberSince")}</div>
                  <div>{format(new Date(donor.createdAt), "PPP")}</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="medical" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>{t("medicalInformation")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <Activity
                      className="h-6 w-6 mx-auto mb-2"
                      aria-hidden="true"
                    />
                    <div className="text-sm font-medium">{t("height")}</div>
                    <div className="text-xl mt-1">
                      {donor.height || t("notAvailable")}{" "}
                      {donor.height ? t("cm") : ""}
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <Activity
                      className="h-6 w-6 mx-auto mb-2"
                      aria-hidden="true"
                    />
                    <div className="text-sm font-medium">{t("weight")}</div>
                    <div className="text-xl mt-1">
                      {donor.weight || t("notAvailable")}{" "}
                      {donor.weight ? t("kg") : ""}
                    </div>
                  </div>
                </div>

                {donor.medicalCondition && (
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">
                      {t("medicalConditions")}
                    </h3>
                    <p className="text-sm bg-muted p-3 rounded">
                      {donor.medicalCondition}
                    </p>
                  </div>
                )}

                {donor.currentMedications && (
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">
                      {t("currentMedications")}
                    </h3>
                    <p className="text-sm bg-muted p-3 rounded">
                      {donor.currentMedications}
                    </p>
                  </div>
                )}

                {!donor.medicalCondition && !donor.currentMedications && (
                  <div className="mt-4 text-center text-muted-foreground">
                    <p>{t("noMedicalInfo")}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="history" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>{t("donationHistory")}</CardTitle>
              </CardHeader>
              <CardContent>
                {user.donationCount > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Heart
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                        <span className="font-medium">
                          {t("totalDonations")}
                        </span>
                      </div>
                      <Badge variant="secondary">{user.donationCount}</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock
                          className="h-5 w-5 text-blue-500"
                          aria-hidden="true"
                        />
                        <span className="font-medium">{t("lastDonation")}</span>
                      </div>
                      <span>
                        {user.lastDonationDate
                          ? format(new Date(user.lastDonationDate), "PPP")
                          : t("notAvailable")}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <Heart
                      className="h-12 w-12 mx-auto mb-3 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <p>{t("noDonationHistory")}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
