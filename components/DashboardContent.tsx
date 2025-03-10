"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function DashboardContent({ user }: { user: any }) {


  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xlfont-bold mb-6">
        Welcome, {user?.name}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
            Your Profile
          </h2>
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
            Quick Actions
          </h2>
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
            <Button className="w-full">Subscribe to Notifications</Button>
          </div>
        </div>
      </div>
      <Button onClick={() => signOut({ callbackUrl: "/" })} className="mt-8">
        Sign Out
      </Button>
    </div>
  );
}
