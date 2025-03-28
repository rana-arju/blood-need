
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type React from "react";
import BottomNavigation from "@/components/BottomNavigation";
import ChatBot from "@/components/ChatBot";

export const metadata = {
  title: "Blood Donation Community",
  description: "Connect blood donors with those in need",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow mb-16 md:mb-0 pt-[66px]">{children}</main>
      <div className="fixed bottom-6 right-6">
      </div>
      <BottomNavigation />
      <Footer />
     
    </div>
  );
}
