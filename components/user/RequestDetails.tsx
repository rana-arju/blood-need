"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
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
  Heart,
  Share2,
  Users,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

import { BloodRequest, InterestedUser } from "@/types/bloodRequest";
import {
  cancelInterest,
  getBloodRequestById,
  showInterest,
} from "@/services/bloodRegister";
import {
  getDonationById,
  getMyDonationOffers,
  getUserDonations,
} from "@/services/donation";

interface BloodRequestDetailsProps {
  id: string;
}

export default function RequestDetails({ id }: BloodRequestDetailsProps) {
  const t = useTranslations("BloodRequestDetails");
  const { theme } = useTheme();
  const router = useRouter();
  const { data: session } = useSession();

  const [request, setRequest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [interestedUsers, setInterestedUsers] = useState<any>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isInterested, setIsInterested] = useState(false);
  const [interestLoading, setInterestLoading] = useState(false);

  useEffect(() => {
    const fetchBloodRequest = async () => {
      try {
        setLoading(true);

        const data = await getMyDonationOffers(session?.user?.id!, id);
        const res = await getBloodRequestById(id);
        setRequest(res.data);
        setInterestedUsers(data.data);

        /* // Check if current user is interested
        if (session?.user?.id) {
          const userInterested = data.interestedUsers?.some(
            (user: InterestedUser) => user.id === session.user.id
          );
          setIsInterested(userInterested || false);
        }
        */
      } catch (error) {
        console.error("Error fetching blood request:", error);
        toast.error(t("errorFetchingRequest"));
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBloodRequest();
    }
  }, [id, session?.user?.id, t]);

  const handleShowInterest = async () => {
    if (!session?.user) {
      toast.error(t("loginRequired"));
      router.push("/auth/signin");
      return;
    }

    try {
      setInterestLoading(true);
      if (isInterested) {
        await cancelInterest(id, session?.user?.id);
        setIsInterested(false);
        // Remove user from interested users list
        setInterestedUsers(
          interestedUsers.filter((user: any) => user.id !== session.user.id)
        );
        toast.success(t("interestCancelled"));
      } else {
        const res = await getMyDonationOffers(session.user.id, "");
        setIsInterested(true);
        // Add user to interested users list if not already there
        if (!interestedUsers.some((user: any) => user.id === session.user.id)) {
          const currentUser: InterestedUser = {
            id: session.user.id,
            name: session.user.name || "",
            image: session.user.image || "",
            blood: "",
            donorInfo: null, // This would be updated from the API response in a real implementation
          };
          setInterestedUsers([...interestedUsers, currentUser]);
        }
        toast.success(t("interestShown"));
      }
    } catch (error) {
      console.error("Error updating interest:", error);
      toast.error(
        isInterested ? t("errorCancellingInterest") : t("errorShowingInterest")
      );
    } finally {
      setInterestLoading(false);
    }
  };

  const handleUserClick = (user: InterestedUser) => {
    //setSelectedUser(user);
   // setIsUserDialogOpen(true);
   
  };

  const formatDate = (dateString?: string | Date) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "PPP");
    } catch (error) {
      return "Invalid date";
    }
  };

  const formatTime = (timeString?: string | Date) => {
    if (!timeString) return "N/A";
    try {
      return format(new Date(timeString), "p");
    } catch (error) {
      return "Invalid time";
    }
  };
  console.log("req asdfasd", interestedUsers);

  const shareRequest = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t("shareTitle"),
          text: `${t("shareText")}: ${request?.patientName} ${t(
            "needsBlood"
          )} ${request?.blood}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success(t("linkCopied"));
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-0 md:p-4 py-6 max-w-5xl">
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-8 w-64" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
              <div className="space-y-6">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">{t("requestNotFound")}</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            {t("requestNotFoundDescription")}
          </p>
          <Button asChild>
            <Link href="/dashboard/requests">{t("backToRequests")}</Link>
          </Button>
        </div>
      </div>
    );
  }
console.log("selected user", selectedUser);

  return (
    <div className="container mx-auto p-0 md:p-4 py-6 max-w-5xl">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" asChild className="h-10 w-10">
          <Link href="/dashboard/requests">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">{t("back")}</span>
          </Link>
        </Button>
        <h1 className="text-xl sm:text-2xl font-bold">
          {t("bloodRequestDetails")}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6 dark:border-gray-700">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <CardTitle className="text-xl md:text-2xl">
                    {t("requestFor")} {request.patientName}
                  </CardTitle>
                  <CardDescription>
                    {t("postedOn")} {formatDate(request.createdAt)}
                  </CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className="bg-red-500/10 text-red-700 dark:text-red-400 border-red-300 dark:border-red-800 px-3 py-1 text-sm"
                >
                  <Droplet className="h-4 w-4 mr-1" />
                  {request.blood}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      {t("patientInformation")}
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">
                            {t("patientName")}
                          </div>
                          <div className="text-base">{request.patientName}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Droplet className="h-5 w-5 text-red-500" />
                        <div>
                          <div className="text-sm font-medium">
                            {t("bloodType")}
                          </div>
                          <div className="text-base font-bold text-red-500">
                            {request.blood}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Activity className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">
                            {t("bloodAmount")}
                          </div>
                          <div className="text-base">
                            {request.bloodAmount} {t("units")}
                          </div>
                        </div>
                      </div>

                      {request.patientProblem && (
                        <div className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground mt-1" />
                          <div>
                            <div className="text-sm font-medium">
                              {t("patientProblem")}
                            </div>
                            <div className="text-base">
                              {request.patientProblem}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      {t("contactInformation")}
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">
                            {t("contactNumber")}
                          </div>
                          <div className="text-base">
                            {request.contactNumber}
                          </div>
                        </div>
                      </div>

                      {request.whatsappNumber && (
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="text-sm font-medium">
                              {t("whatsappNumber")}
                            </div>
                            <div className="text-base">
                              {request.whatsappNumber}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      {t("donationDetails")}
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center gap-3">
                        <Building className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">
                            {t("hospitalName")}
                          </div>
                          <div className="text-base">
                            {request.hospitalName}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
                        <div>
                          <div className="text-sm font-medium">
                            {t("location")}
                          </div>
                          <div className="text-base">
                            {request.address}, {request.upazila},{" "}
                            {request.district}, {request.division}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">
                            {t("requiredDate")}
                          </div>
                          <div className="text-base">
                            {formatDate(request.requiredDate)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">
                            {t("requiredTime")}
                          </div>
                          <div className="text-base">
                            {formatTime(request.requireTime)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center sm:justify-between">
                <Button
                  onClick={handleShowInterest}
                  disabled={interestLoading}
                  className={`${
                    isInterested
                      ? "bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-700 dark:hover:bg-yellow-800"
                      : "bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                  } text-white`}
                >
                  <Heart
                    className={`h-5 w-5 mr-2 ${
                      isInterested ? "fill-current" : ""
                    }`}
                  />
                  {isInterested ? t("cancelInterest") : t("showInterest")}
                </Button>
                <Button variant="outline" onClick={shareRequest}>
                  <Share2 className="h-5 w-5 mr-2" />
                  {t("shareRequest")}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:border-gray-700">
            <CardHeader>
              <CardTitle>{t("aboutRequester")}</CardTitle>
              <CardDescription>{t("requesterDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    className="object-cover"
                    src={request.user?.image || ""}
                    alt={request.user?.name || ""}
                  />
                  <AvatarFallback>
                    {request.user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{request.user?.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("memberSince")} {formatDate(request.user?.createdAt)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {t("interestedDonors")} ({interestedUsers.length})
              </CardTitle>
              <CardDescription>
                {t("interestedDonorsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {interestedUsers.length > 0 ? (
                <div className="space-y-4">
                  {interestedUsers.length === 0 ? (
                    <p className="text-center text-muted-foreground">
                      {t("noInterestedDonors")}
                    </p>
                  ) : (
                    interestedUsers.map((user: any) => (
                      <div
                        key={user.id}
                        className="flex items-center gap-3 p-3 rounded-lg border border-border dark:border-gray-700 hover:bg-accent/50 cursor-pointer transition-colors"
                        onClick={() => router.push(`/dashboard/requests/${id}/donors/${user.user.id}`)}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={user.user.image || ""}
                            alt={user.user.name}
                          />
                          <AvatarFallback>
                            {user.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">
                            {user.user.name}
                          </p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Droplet className="h-3 w-3 mr-1 text-red-500" />
                            <span>{user.user.blood || t("notSpecified")}</span>
                            {user.donorInfo && (
                              <>
                                <span className="mx-1">•</span>
                                <Badge
                                  variant="outline"
                                  className="text-[10px] h-4 px-1 border-green-300 dark:border-green-800 bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-400"
                                >
                                  {t("donor")}
                                </Badge>
                              </>
                            )}
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-3 opacity-50" />
                  <p className="text-muted-foreground">
                    {t("noInterestedDonors")}
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center border-t dark:border-gray-700 pt-4">
              <Button
                variant="outline"
                onClick={handleShowInterest}
                disabled={interestLoading}
              >
                <Heart
                  className={`h-4 w-4 mr-2 ${
                    isInterested ? "fill-current text-red-500" : ""
                  }`}
                />
                {isInterested ? t("youAreInterested") : t("showYourInterest")}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* User Details Dialog */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("donorDetails")}</DialogTitle>
            <DialogDescription>
              {t("donorDetailsDescription")}
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <ScrollArea className="max-h-[70vh]">
              <div className="space-y-6 p-1">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20 mb-3">
                    <AvatarImage
                      src={selectedUser.user.image || ""}
                      alt={selectedUser.user.name}
                    />
                    <AvatarFallback className="text-lg">
                      {selectedUser.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold">
                    {selectedUser.user.name}
                  </h3>
                  <div className="flex items-center mt-1">
                    <Badge className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800">
                      <Droplet className="h-3 w-3 mr-1" />
                      {selectedUser.user.blood || t("notSpecified")}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <Tabs defaultValue="contact">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="contact">
                      {t("contactInfo")}
                    </TabsTrigger>
                    <TabsTrigger
                      value="donor"
                      disabled={!selectedUser.donorInfo}
                    >
                      {t("donorInfo")}
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="contact" className="pt-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">
                          {t("contactMethods")}
                        </h4>
                        <p className="text-sm">{t("contactThroughPlatform")}</p>
                      </div>

                      <div className="flex justify-center">
                        <Button className="w-full">
                          <Phone className="h-4 w-4 mr-2" />
                          {t("contactNow")}
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  {selectedUser.donorInfo && (
                    <TabsContent value="donor" className="pt-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">
                            {t("donorProfile")}
                          </h4>

                          <div className="grid grid-cols-2 gap-3">
                            {selectedUser.donorInfo.height && (
                              <div className="p-2 bg-accent/50 rounded-md">
                                <p className="text-xs text-muted-foreground">
                                  {t("height")}
                                </p>
                                <p className="font-medium">
                                  {selectedUser.donorInfo.height} cm
                                </p>
                              </div>
                            )}

                            {selectedUser.donorInfo.weight && (
                              <div className="p-2 bg-accent/50 rounded-md">
                                <p className="text-xs text-muted-foreground">
                                  {t("weight")}
                                </p>
                                <p className="font-medium">
                                  {selectedUser.donorInfo.weight} kg
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {(selectedUser.donorInfo.medicalCondition ||
                          selectedUser.donorInfo.currentMedications) && (
                          <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                          >
                            {selectedUser.donorInfo.medicalCondition && (
                              <AccordionItem value="medical-condition">
                                <AccordionTrigger className="text-sm">
                                  {t("medicalCondition")}
                                </AccordionTrigger>
                                <AccordionContent>
                                  <p className="text-sm">
                                    {selectedUser.donorInfo.medicalCondition}
                                  </p>
                                </AccordionContent>
                              </AccordionItem>
                            )}

                            {selectedUser.donorInfo.currentMedications && (
                              <AccordionItem value="medications">
                                <AccordionTrigger className="text-sm">
                                  {t("currentMedications")}
                                </AccordionTrigger>
                                <AccordionContent>
                                  <p className="text-sm">
                                    {selectedUser.donorInfo.currentMedications}
                                  </p>
                                </AccordionContent>
                              </AccordionItem>
                            )}
                          </Accordion>
                        )}
                      </div>
                    </TabsContent>
                  )}
                </Tabs>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
