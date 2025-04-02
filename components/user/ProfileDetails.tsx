"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { getMyProfile } from "@/services/auth";
import { ProfileSettings } from "./ProfileSettings";
import BloodDropLoader from "../BloodDropLoader";
import { useTranslations } from "next-intl";
import moment from "moment";

export function ProfileDetails() {
  const t = useTranslations("Forms.profile");
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { data: session, update } = useSession();
  const router = useRouter();
  const { user } = session || {};

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.id) {
        try {
          const profile = await getMyProfile(user.id);
          const profileData = profile?.data;

          
          setUserData(profileData);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          toast.error("Failed to load profile data");
        }
      }
    };
    fetchUserProfile();
  }, [user?.id]);

  if (!user?.id) {
    toast.error("Please sign in");
    router.push("/auth/signin");
    return null;
  }

  if (!userData && !isEditing) {
    return <BloodDropLoader />;
  }

  const handleProfileUpdate = async (updatedData: any) => {
    // Update the local state
    setUserData({
      ...userData,
      ...updatedData,

    });

    // Update the session
    await update({
      ...session,
      user: {
        ...session?.user,
        ...updatedData,
      },
    });

    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">{t("title")}</h3>
      {isEditing ? (
        <ProfileSettings
          initialData={userData}
          onCancel={() => setIsEditing(false)}
          onSuccess={handleProfileUpdate}
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">{t("personalInfo")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={userData.image || "/placeholder-avatar.jpg"}
                  alt="Profile"
                  className="object-cover"
                />
                <AvatarFallback>
                  {userData.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">{t("labels.name")}</h3>
                <p>{userData.name || "Not provided"}</p>
              </div>
              <div>
                <h3 className="font-semibold">{t("labels.email")}</h3>
                <p>{userData.email || "Not provided"}</p>
              </div>
              <div>
                <h3 className="font-semibold">{t("labels.bloodGroup")}</h3>
                <p>{userData.blood || "Not provided"}</p>
              </div>
              <div>
                <h3 className="font-semibold">{t("labels.gender")}</h3>
                <p>{userData.gender || "Not provided"}</p>
              </div>
              <div>
                <h3 className="font-semibold">{t("labels.dateOfBirth")}</h3>
                <p>
                  {userData.dateOfBirth
                    ? moment(userData.dateOfBirth).format("LL")
                    : "Not provided"}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">{t("labels.lastDonation")}</h3>
                <p>
                  {userData.lastDonationDate
                    ? moment(userData.lastDonationDate).format("LL")
                    : "Not provided"}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">{t("labels.division")}</h3>
                <p>{userData.division || "Not provided"}</p>
              </div>
              <div>
                <h3 className="font-semibold">{t("labels.district")}</h3>
                <p>{userData.district || "Not provided"}</p>
              </div>
              <div>
                <h3 className="font-semibold">{t("labels.upazila")}</h3>
                <p>{userData.upazila || "Not provided"}</p>
              </div>
              <div>
                <h3 className="font-semibold">{t("labels.address")}</h3>
                <p>{userData.address || "Not provided"}</p>
              </div>
            </div>
            <Button onClick={() => setIsEditing(true)}>
              {t("buttons.update")}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
