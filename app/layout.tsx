import "./globals.css";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth/next";
import { ThemeProvider } from "@/components/theme-provider";
import SessionProvider from "@/components/SessionProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type React from "react";
import Script from "next/script";
import BottomNavigation from "@/components/BottomNavigation";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

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
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ef4444" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow mb-16 md:mb-0 pt-[72px]">
                {children}
              </main>
              <BottomNavigation />
              <Footer />
              <Toaster position="top-center" richColors />
            </div>
          </ThemeProvider>
        </SessionProvider>
        <Script
          id="register-sw"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('Service Worker registration successful with scope: ', registration.scope);
                    },
                    function(err) {
                      console.log('Service Worker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
