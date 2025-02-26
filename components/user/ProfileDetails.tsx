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
import { getLocationName } from "@/utils/locationUtils";

export function ProfileDetails() {
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

          // Convert location IDs to names
          profileData.divisionName = await getLocationName(
            "division",
            profileData.division
          );
          profileData.districtName = await getLocationName(
            "district",
            profileData.district
          );
          profileData.upazilaName = await getLocationName(
            "upazila",
            profileData.upazila
          );

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
    return <div>Loading...</div>;
  }

  const handleProfileUpdate = async (updatedData: any) => {
    // Update the local state
    setUserData({
      ...userData,
      ...updatedData,
      divisionName: await getLocationName("division", updatedData.division),
      districtName: await getLocationName("district", updatedData.district),
      upazilaName: await getLocationName("upazila", updatedData.upazila),
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
      <h1 className="text-3xl font-bold">Profile</h1>
      {isEditing ? (
        <ProfileSettings
          initialData={userData}
          onCancel={() => setIsEditing(false)}
          onSuccess={handleProfileUpdate}
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={userData.image || "/placeholder-avatar.jpg"}
                  alt="Profile"
                />
                <AvatarFallback>
                  {userData.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Name</h3>
                <p>{userData.name || "Not provided"}</p>
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p>{userData.email || "Not provided"}</p>
              </div>
              <div>
                <h3 className="font-semibold">Blood Group</h3>
                <p>{userData.blood || "Not provided"}</p>
              </div>
              <div>
                <h3 className="font-semibold">Gender</h3>
                <p>{userData.gender || "Not provided"}</p>
              </div>
              <div>
                <h3 className="font-semibold">Date of Birth</h3>
                <p>
                  {userData.dateOfBirth
                    ? new Date(userData.dateOfBirth).toLocaleDateString()
                    : "Not provided"}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Last Donation Date</h3>
                <p>
                  {userData.lastDonationDate
                    ? new Date(userData.lastDonationDate).toLocaleDateString()
                    : "Not provided"}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Division</h3>
                <p>{userData.divisionName || "Not provided"}</p>
              </div>
              <div>
                <h3 className="font-semibold">District</h3>
                <p>{userData.districtName || "Not provided"}</p>
              </div>
              <div>
                <h3 className="font-semibold">Upazila</h3>
                <p>{userData.upazilaName || "Not provided"}</p>
              </div>
              <div>
                <h3 className="font-semibold">Address</h3>
                <p>{userData.address || "Not provided"}</p>
              </div>
            </div>
            <Button onClick={() => setIsEditing(true)}>Update Profile</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
