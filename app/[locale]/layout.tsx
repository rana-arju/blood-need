
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type React from "react";
import BottomNavigation from "@/components/BottomNavigation";

export const metadata = {
  title: "Blood Donation Community",
  description: "Connect blood donors with those in need",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Blood Donation Community",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/api/og?title=Blood Donation Community&subtitle=Connect donors with those in need&type=default`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@blooddonationcom",
  },
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
