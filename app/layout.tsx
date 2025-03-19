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

import { PerformanceMonitoringInitializer } from "@/components/Monitor";
import { generateViewport } from "@/lib/viewport";
import PerformanceMonitoring from "@/components/PerformanceMonitoring";
import { Metadata } from "next";

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
  params: { locale },
}: RootLayoutProps) {
  const session = await getServerSession(authOptions);
  let messages;
  try {
    messages = await getMessages(locale as any);
  } catch {
    NotFound();
  }
  const organizationSchema = generateOrganizationSchema();
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />

        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://res.cloudinary.com"
          crossOrigin="anonymous"
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
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <SessionProvider session={session}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {/* Add performance monitoring */}
              <PerformanceMonitoring />
              <main>{children}</main>

              {/* Register service worker */}
              <Script
                id="register-sw"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
                    if ('serviceWorker' in navigator) {
                      window.addEventListener('load', function() {
                        navigator.serviceWorker.register('/custom-sw.js', { scope: '/' }).then(
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

              {/* Google Analytics */}
              <Script
                strategy="afterInteractive"
                src="https://www.googletagmanager.com/gtag/js?id=G-B3XRYK729L"
              />
              <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-B3XRYK729L', {
                      page_path: window.location.pathname,
                    });
                  `,
                }}
              />

              <Toaster richColors position="top-center" />
            </ThemeProvider>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    
    </html>
  );
}
