"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type React from "react";
import { useEffect } from "react";
import { subscribeToPushNotifications } from "@/utils/pushNotifications";

export default function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  useEffect(() => {
    if (session?.user?.id) {
      subscribeToPushNotifications(session.user.id);
    }
  }, [session]);

  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
}
