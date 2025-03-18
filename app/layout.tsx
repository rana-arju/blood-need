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
import { baseViewport } from "@/lib/seo-config";
import { inter } from "@/lib/fonts";
import { generateOrganizationSchema } from "@/lib/schema";

import { initPerformanceMonitoring } from "@/utils/performance-monitoring";
import { PerformanceMonitoringInitializer } from "@/components/Monitor";

export const viewport = baseViewport;
export const metadata = {
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        <meta name="google" content="notranslate" />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_APP_URL}/${locale}`}
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />

        {/* Preconnect to critical domains */}
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

        {/* Preload critical resources */}
        <link rel="preload" href="/icons/icon.png" as="image" />
        <link rel="preload" href="/placeholder.svg" as="image" />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <SessionProvider session={session}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <main>{children}</main>

              {/* Preload critical resources */}
              <Script
                id="preload-resources"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
                    function preloadResources() {
                      // Preconnect to critical domains
                      const preconnectDomains = [
                        'https://fonts.googleapis.com',
                        'https://fonts.gstatic.com',
                        'https://res.cloudinary.com',
                      ];
                    
                      preconnectDomains.forEach(href => {
                        const link = document.createElement('link');
                        link.rel = 'preconnect';
                        link.href = href;
                        link.crossOrigin = 'anonymous';
                        document.head.appendChild(link);
                      });
                    }
                    
                    preloadResources();
                  `,
                }}
              />

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
      <PerformanceMonitoringInitializer />
    </html>
  );
}
