"use client";

import NotificationButton from "@/components/notification/notification-button";
import { NotificationList } from "@/components/notification/NotificationList";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/contexts/notification-context";
import { Bell } from "lucide-react";
import { useSession } from "next-auth/react";

export default function NotificationsPage() {
  const { permissionGranted, requestPermission, isLoading } =
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

      {isLoggedIn && permissionGranted === false && (
        <div className="bg-muted p-4 rounded-lg mb-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-primary/10 p-2">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Enable Notifications</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Get notified about blood donation requests, events, and
                important updates.
              </p>
              <Button
                className="mt-4"
                onClick={requestPermission}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
                    Enabling...
                  </>
                ) : (
                  "Enable Notifications"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
      <NotificationButton />

      <NotificationList />
    </div>
  );
}
