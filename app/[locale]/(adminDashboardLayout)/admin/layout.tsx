import type React from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100 mt-16">
      <Header />
      <Sidebar />
      <div className="flex-1 mb-16 md:mb-0 md:ml-64 relative">
        <main className="p-6">{children}</main>
      </div>
      <BottomNavigation />
    </div>
  );
}
