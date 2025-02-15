import type React from "react";
import { UserSidebar } from "@/components/user/UserSidebar";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100 mt-16">
      <Header />
      <UserSidebar />
      <div className="flex-1 md:ml-64 relative">
        <main className="p-6">{children}</main>
      </div>
      <BottomNavigation />
    </div>
  );
}
