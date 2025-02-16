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

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blood Donation Community",
  description: "Connect blood donors with those in need",
  manifest: "/manifest.json",
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
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
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
            </ThemeProvider>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
