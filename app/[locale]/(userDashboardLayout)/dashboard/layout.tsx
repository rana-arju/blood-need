import type React from "react";
import { UserSidebar } from "@/components/user/UserSidebar";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { ThemeProvider } from "@/components/theme-provider";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen bg-background dark:bg-background mt-16">
        <Header />
        <UserSidebar />
        <div className="flex-1 mb-16 md:mb-0 md:ml-64 relative">
          <main className="p-4 md:p-6">{children}</main>
        </div>
        <BottomNavigation />
      </div>
    </ThemeProvider>
  );
}
