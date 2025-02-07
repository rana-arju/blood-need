"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { subscribeToPushNotifications } from "@/utils/notifications";

export default function DashboardContent({ user }: { user: any }) {
  const handleSubscribe = async () => {
    await subscribeToPushNotifications();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
          <p>
            <strong>Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Role:</strong> {user?.role}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <Link href="/blood-request">
              <Button className="w-full">Request Blood</Button>
            </Link>
            <Link href="/donate">
              <Button className="w-full">Donate Blood</Button>
            </Link>
            <Link href="/blood-requests">
              <Button className="w-full">View Blood Requests</Button>
            </Link>
            <Button onClick={handleSubscribe} className="w-full">
              Subscribe to Notifications
            </Button>
          </div>
        </div>
      </div>
      <Button onClick={() => signOut({ callbackUrl: "/" })} className="mt-8">
        Sign Out
      </Button>
    </div>
  );
}
