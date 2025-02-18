"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type React from "react"; // Added import for React
import { useEffect } from "react";
import {
  registerBackgroundSync,
  subscribeToPushNotifications,
} from "@/utils/pushNotifications";

export default function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  useEffect(() => {
    subscribeToPushNotifications();
    registerBackgroundSync();
  }, []);
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
}
