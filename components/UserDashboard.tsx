"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import BloodDropLoader from "./BloodDropLoader";

interface UserProfile {
  name: string;
  email: string;
  bloodType: string;
  donationCount: number;
  lastDonationDate: Date;
  rewardBadge: string;
}

interface Appointment {
  id: string;
  date: string;
  location: string;
  status: "upcoming" | "completed" | "cancelled";
}

export function UserDashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  useEffect(() => {
    fetchUserProfile();
    fetchAppointments();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("/api/user-profile");
      const data = await response.json();
      setProfile(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setLoading(false);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/appointments");
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update logic
    console.log("Profile updated");
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement password change logic
    console.log("Password changed");
  };

  const handleAppointmentCancel = async (appointmentId: string) => {
    // TODO: Implement appointment cancellation logic
    console.log("Appointment cancelled:", appointmentId);
  };

  if (loading) {
    return <BloodDropLoader />
  }

  if (!profile) {
    return <div>Error loading user profile</div>;
  }

  return (
    <div className="space-y-8">
      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
        User Dashboard
      </h3>
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src="/placeholder-avatar.jpg"
                      alt={profile.name}
                    />
                    <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button>Change Avatar</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bloodType">Blood Type</Label>
                    <Input
                      id="bloodType"
                      value={profile.bloodType}
                      onChange={(e) =>
                        setProfile({ ...profile, bloodType: e.target.value })
                      }
                    />
                  </div>
                </div>
                <Button type="submit">Update Profile</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="donations">
          <Card>
            <CardHeader>
              <CardTitle>Donation History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Donations:</span>
                  <span className="font-bold">{profile.donationCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Last Donation Date:</span>
                  <span className="font-bold">
                    {format(profile.lastDonationDate, "PPP")}
                  </span>
                </div>
                <div className="space-y-2">
                  <Label>Donation Progress</Label>
                  <Progress
                    value={(profile.donationCount / 10) * 100}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    {10 - (profile.donationCount % 10)} more donations until
                    your next badge!
                  </p>
                </div>
                <div>
                  <Label>Donation Calendar</Label>
                  <Calendar
                    mode="single"
                    selected={profile.lastDonationDate}
                    onSelect={(date) =>
                      date && setProfile({ ...profile, lastDonationDate: date })
                    }
                    className="rounded-md border shadow"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Your Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <p className="font-semibold">
                        {format(new Date(appointment.date), "PPP")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.location}
                      </p>
                    </div>
                    <div>
                      <Badge
                        variant={
                          appointment.status === "upcoming"
                            ? "default"
                            : appointment.status === "completed"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {appointment.status}
                      </Badge>
                      {appointment.status === "upcoming" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="ml-2"
                          onClick={() =>
                            handleAppointmentCancel(appointment.id)
                          }
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <Button>Schedule New Appointment</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="rewards">
          <Card>
            <CardHeader>
              <CardTitle>Rewards and Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-lg py-1 px-3">
                    {profile.rewardBadge}
                  </Badge>
                  <span className="text-muted-foreground">Current Badge</span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Available Badges:</h3>
                  <div className="flex space-x-2">
                    <Badge
                      variant="outline"
                      className={
                        profile.donationCount >= 5
                          ? "bg-primary text-primary-foreground"
                          : ""
                      }
                    >
                      Bronze Donor (5 donations)
                    </Badge>
                    <Badge
                      variant="outline"
                      className={
                        profile.donationCount >= 10
                          ? "bg-primary text-primary-foreground"
                          : ""
                      }
                    >
                      Silver Donor (10 donations)
                    </Badge>
                    <Badge
                      variant="outline"
                      className={
                        profile.donationCount >= 20
                          ? "bg-primary text-primary-foreground"
                          : ""
                      }
                    >
                      Gold Donor (20 donations)
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={password.current}
                    onChange={(e) =>
                      setPassword({ ...password, current: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={password.new}
                    onChange={(e) =>
                      setPassword({ ...password, new: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={password.confirm}
                    onChange={(e) =>
                      setPassword({ ...password, confirm: e.target.value })
                    }
                  />
                </div>
                <Button type="submit">Change Password</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
