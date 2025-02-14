import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { UserDashboard } from "@/components/UserDashboard";
import { AdminDashboard } from "@/components/AdminDashboard";
import DonationReminder from "@/components/DonationReminder";
import DonationHistory from "@/components/DonationHistory";
import BloodSupplyIndicator from "@/components/BloodSupplyIndicator";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  console.log("Dashboard session:", session);

  if (!session) {
    console.log("No session, redirecting to sign in");
    redirect("/auth/signin");
  }

  const isAdmin = session.user.role === "admin";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome to your Dashboard</h1>
      <p className="mb-8">Hello, {session.user?.name}!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {isAdmin ? <AdminDashboard /> : <UserDashboard />}
        <DonationReminder />
        <DonationHistory />
        <BloodSupplyIndicator />
      </div>
    </div>
  );
}
