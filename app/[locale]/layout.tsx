
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type React from "react";
import BottomNavigation from "@/components/BottomNavigation";

export const metadata = {
  title: "Blood Donation Community",
  description: "Connect blood donors with those in need",
  manifest: "/manifest.json",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mb-16 md:mb-0 pt-[72px]">{children}</main>
      <BottomNavigation />
      <Footer />
    </div>
  );
}
