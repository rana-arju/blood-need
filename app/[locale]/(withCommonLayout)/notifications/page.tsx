"use client";

import NotificationButton from "@/components/notification/notification-button";
import { NotificationList } from "@/components/notification/NotificationList";
import { useNotifications } from "@/contexts/notification-context";
import { useSession } from "next-auth/react";

export default function NotificationsPage() {
  useNotifications();
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;

  return (
    <div className="custom-container mx-auto w-full max-w-4xl md:w-4xl py-8 px-2 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Notifications</h1>

      {!isLoggedIn && (
        <div className="bg-muted p-4 rounded-lg mb-6">
          <p className="text-center">
            Please log in to view and manage your notifications.
          </p>
        </div>
      )}

      <NotificationButton />

      <NotificationList />
    </div>
  );
}
