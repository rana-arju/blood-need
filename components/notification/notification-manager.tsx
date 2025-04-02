"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  initializeFirebase,
  getFCMToken,
  setupMessageListener,
  checkMissedNotifications,
} from "@/lib/firebase";
import NotificationPermissionDialog from "./notification-permission-dialog";

export default function NotificationManager() {
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);
  const [permissionState, setPermissionState] = useState<string | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  // Check notification permission and status on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Only check for logged in users
    if (status !== "authenticated" || !userId) return;

    // Check browser permission
    if ("Notification" in window) {
      setPermissionState(Notification.permission);

      // Check if notifications are enabled in localStorage
      const enabled = localStorage.getItem("notificationsEnabled") === "true";
      setNotificationsEnabled(enabled && Notification.permission === "granted");

      // If permission is granted but not enabled in localStorage, show dialog
      if (Notification.permission === "granted" && !enabled) {
        setShowPermissionDialog(true);
      }

      // If permission is not determined and not asked before, show dialog
      if (
        Notification.permission === "default" &&
        !localStorage.getItem("notificationDialogShown")
      ) {
        setShowPermissionDialog(true);
      }
    }
  }, [status, userId]);

  // Initialize Firebase and check for missed notifications when user logs in
  useEffect(() => {
    if (!userId) return;

    const initFirebase = async () => {
      await initializeFirebase();

      // If notifications are enabled, get token and setup listener
      if (notificationsEnabled) {
        await getFCMToken(userId);

        // Setup message listener
        setupMessageListener((payload:any) => {
          // Show toast notification
          toast(payload.notification.title, {
            description: payload.notification.body,
            action: payload.data?.url
              ? {
                  label: "View",
                  onClick: () => window.open(payload.data.url, "_blank"),
                }
              : undefined,
          });
        });

        // Check for missed notifications
        const result = await checkMissedNotifications(userId);
        if (result.missedNotifications > 0) {
          toast.info(
            `You have ${result.missedNotifications} missed notifications`,
            {
              description: "Check your notification center to view them",
              action: {
                label: "View",
                onClick: () => (window.location.href = "/notifications"),
              },
            }
          );
        }
      }
    };

    initFirebase();
  }, [userId, notificationsEnabled]);

  // Handle enabling notifications
  const handleEnableNotifications = async () => {
    if (!userId) return;

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
      // Mark dialog as shown
      localStorage.setItem("notificationDialogShown", "true");
      setShowPermissionDialog(false);
    }
  };

  // Handle skipping notifications
  const handleSkipNotifications = () => {
    localStorage.setItem("notificationDialogShown", "true");
    setShowPermissionDialog(false);
  };

  // Don't render anything if user is not logged in
  if (status !== "authenticated" || !userId) return null;

  return (
    <>
      <NotificationPermissionDialog
        isOpen={showPermissionDialog}
        onClose={() => setShowPermissionDialog(false)}
        onEnable={handleEnableNotifications}
        onSkip={handleSkipNotifications}
      />
    </>
  );
}
