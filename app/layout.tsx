import "./globals.css";
import { Inter } from "next/font/google";
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

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blood Donation Community",
  description: "Connect blood donors with those in need",
  manifest: "/manifest.json",
  icons: [
    { rel: "apple-touch-icon", url: "/icons/icon.png" },
    { rel: "icon", url: "/icons/icon.png" },
  ],
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
  } catch (error) {
    NotFound();
  }
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ef4444" />
        <link rel="apple-touch-icon" href="/icons/icon.png" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <SessionProvider session={session}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <main>{children}</main>
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
              <Toaster richColors position="top-center" />
            </ThemeProvider>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
