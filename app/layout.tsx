import "./globals.css";
import "../styles/swiper-custom.css";
import { getServerSession } from "next-auth/next";
import type React from "react";
import Script from "next/script";
import { authOptions } from "./api/auth/[...nextauth]/options";
import SessionProvider from "@/components/SessionProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { getMessages } from "next-intl/server";
import NotFound from "./not-found";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "sonner";

import { inter } from "@/lib/fonts";
import { generateOrganizationSchema } from "@/lib/schema";

import { generateViewport } from "@/lib/viewport";
import PerformanceMonitoring from "@/components/PerformanceMonitoring";
import type { Metadata } from "next";
import { Suspense } from "react";
import LoadingDrop from "@/components/LoadingDrop";
import { ContactWidget } from "@/components/contact/ContactWidget";
import { NotificationProvider } from "@/contexts/notification-context";

export const viewport = generateViewport();

export const metadata: Metadata = {
  title: "Blood Need - Blood Donation Community",
  description:
    "Connect blood donors with those in need, save lives through our blood donation community platform.",
};
interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;
  const [session, messages] = await Promise.all([
    getServerSession(authOptions),
    getMessages(locale as any).catch(() => null), // Prevent errors from breaking the page
  ]);

  if (!messages) return <NotFound />;

  const organizationSchema = generateOrganizationSchema();
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        />

        {/* Add structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <meta name="google" content="notranslate" />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_APP_URL}/${locale}`}
        />
        <meta
          name="viewport"
          content="maximum-scale=5, minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=yes, viewport-fit=cover"
        />
        {/* Register service worker early */}
        <Script
          id="register-sw"
          strategy="beforeInteractive"
          src="/registerSW.js"
        />
      </head>
      <body className={inter.className}>
        <Suspense fallback={<LoadingDrop />}>
          <NextIntlClientProvider messages={messages}>
            <SessionProvider session={session}>
              <NotificationProvider>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                >
                  {/* Add performance monitoring */}
                  <PerformanceMonitoring />
                  <main>{children}</main>

                  <Toaster richColors position="top-center" />
                  {/* Contact Widget */}
                  <ContactWidget
                    phoneNumber="+8801881220413"
                    facebookPage="techdictionary"
                    whatsappNumber="+8801881220413"
                  />
                </ThemeProvider>
              </NotificationProvider>
            </SessionProvider>
          </NextIntlClientProvider>
        </Suspense>

      </body>
    </html>
  );
}
