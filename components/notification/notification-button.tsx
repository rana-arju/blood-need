"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { initializeFirebase, getFCMToken } from "@/lib/firebase";

export default function NotificationButton() {
  const [permissionState, setPermissionState] = useState<string | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // Check notification status on mount
  useEffect(() => {
    if (typeof window === "undefined" || !userId) return;

    if ("Notification" in window) {
      setPermissionState(Notification.permission);

      // Check if notifications are enabled in localStorage
      const enabled = localStorage.getItem("notificationsEnabled") === "true";
      setNotificationsEnabled(enabled && Notification.permission === "granted");
    }
  }, [userId]);

  // Handle enabling notifications
  const handleEnableNotifications = async () => {
    if (!userId) {
      toast.error("Please sign in to enable notifications");
      return;
    }

    setIsLoading(true);
    try {
      // Request browser permission
      const permission = await Notification.requestPermission();
      setPermissionState(permission);

      if (permission === "granted") {
        // Initialize Firebase and get token
        await initializeFirebase();
        const token = await getFCMToken(userId);

        if (token) {
          // Enable notifications in localStorage
          localStorage.setItem("notificationsEnabled", "true");
          setNotificationsEnabled(true);
          toast.success("Notifications enabled successfully");
        } else {
          toast.error("Failed to enable notifications");
        }
      } else {
        toast.error("Notification permission denied");
      }
    } catch (error) {
      console.error("Error enabling notifications:", error);
      toast.error("Failed to enable notifications");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle disabling notifications
  const handleDisableNotifications = async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      // Disable notifications in localStorage
      localStorage.setItem("notificationsEnabled", "false");
      setNotificationsEnabled(false);

      // Remove token from backend
      try {
        const token = localStorage.getItem("fcm_token");
        if (token) {
          await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/token/remove`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userId}`,
              },
              body: JSON.stringify({ token }),
            }
          );

          localStorage.removeItem("fcm_token");
        }
      } catch (error) {
        console.error("Error removing token:", error);
      }

      toast.success("Notifications disabled");
    } catch (error) {
      console.error("Error disabling notifications:", error);
      toast.error("Failed to disable notifications");
    } finally {
      setIsLoading(false);
    }
  };

  // Don't show if user is not logged in
  if (!userId) return null;

  // Don't show if permission is denied (we can't change it programmatically)
  if (permissionState === "denied") return null;

  return (
    <div className="flex items-center gap-2">
      {notificationsEnabled ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDisableNotifications}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <BellOff className="h-4 w-4" />
          <span className="hidden md:inline">Disable Notifications</span>
        </Button>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={handleEnableNotifications}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <Bell className="h-4 w-4" />
          <span className="hidden md:inline">Enable Notifications</span>
        </Button>
      )}
    </div>
  );
}
