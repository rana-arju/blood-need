"use client";

import type React from "react";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";

import {
  getVapidKey,
  notificationService,
  registerFCMToken,
} from "@/services/notification";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

// Define TypeScript interfaces
export interface Notification {
  id: string;
  title: string;
  body: string;
  url?: string;
  isRead: boolean;
  createdAt: string;
  userId: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  permissionGranted: boolean | null;
  requestPermission: () => Promise<boolean>;
  loadNotifications: (page: number, limit: number) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  removeNotification: (id: string) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(
    null
  );

  // Check notification permission on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkPermission = async () => {
      if (!("Notification" in window)) {
        setPermissionGranted(false);
        return;
      }

      const permission = Notification.permission;
      setPermissionGranted(permission === "granted");

      if (permission === "granted" && userId) {
        await registerForPushNotifications();
      }
    };

    checkPermission();
  }, [userId]);

  // Register for push notifications
  const registerForPushNotifications = async () => {
    try {
      const isFirebaseSupported = await isSupported();

      if (!isFirebaseSupported) {
        console.warn("Firebase messaging is not supported in this browser");
        return;
      }

      const messaging = getMessaging();

      // Get VAPID key from backend
      const vapidKey = await getVapidKey();

      // Register service worker manually
      const swRegistration = await navigator.serviceWorker.register(
        "/custom-firebase-messaging-sw.js"
      );
      console.log("Service Worker registered successfully:", swRegistration);

      console.log("swRegistration", swRegistration);

      // Pass Firebase config to service worker
      if (swRegistration.active) {
        swRegistration.active.postMessage({
          type: "FIREBASE_CONFIG",
          config: {
            FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            FIREBASE_STORAGE_BUCKET:
              process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            FIREBASE_MESSAGING_SENDER_ID:
              process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
          },
        });
      }

      // Get registration token with custom service worker
      const currentToken = await getToken(messaging, {
        vapidKey,
        serviceWorkerRegistration: swRegistration,
      });

      if (currentToken && userId) {
        // Send the token to your server
        await registerFCMToken(currentToken, userId);
        console.log("FCM registration token registered:", currentToken);

        // Set up foreground message handler
        onMessage(messaging, (payload) => {
          console.log("Foreground message received:", payload);

          // Add the new notification to state
          if (payload.notification) {
            const newNotification: Notification = {
              id: payload.messageId || `temp-${Date.now()}`,
              title: payload.notification.title || "New Notification",
              body: payload.notification.body || "",
              url: payload.data?.url,
              isRead: false,
              createdAt: new Date().toISOString(),
              userId: userId || "current-user",
            };

            setNotifications((prev) => [newNotification, ...prev]);
            setUnreadCount((prev) => prev + 1);

            // Show toast
            toast.success(newNotification.title, {
              description: newNotification.body,
              action: newNotification.url ? (
                <a
                  href={newNotification.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-white px-3 py-2 rounded-md text-xs"
                >
                  View
                </a>
              ) : undefined,
            });
          }
        });
      } else {
        console.warn("No registration token available");
      }
    } catch (error) {
      console.error("Error registering for push notifications:", error);
    }
  };

  // Request notification permission
  const requestPermission = async (): Promise<boolean> => {
    if (!("Notification" in window)) {
      setPermissionGranted(false);
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      const granted = permission === "granted";
      setPermissionGranted(granted);

      if (granted && userId) {
        await registerForPushNotifications();
      }

      return granted;
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      setPermissionGranted(false);
      return false;
    }
  };

  // Load notifications from API
  const loadNotifications = useCallback(
    async (page: number, limit: number) => {
      if (!userId) {
        console.warn("Cannot load notifications: No user ID available");
        return;
      }

      try {
        setLoading(true);
        const response = await notificationService.getNotifications(
          page,
          limit,
          userId
        );

        if (page === 1) {
          setNotifications(response.notifications);
        } else {
          setNotifications((prev) => [...prev, ...response.notifications]);
        }

        setUnreadCount(response.unreadCount);
      } catch (error) {
        console.error("Error loading notifications:", error);
        toast.error("Failed to load notifications. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [userId, toast]
  );

  // Mark notification as read
  const markAsRead = useCallback(
    async (id: string) => {
      if (!userId) {
        console.warn("Cannot mark notification as read: No user ID available");
        return;
      }

      try {
        await notificationService.markAsRead(id, userId);

        setNotifications((prev) =>
          prev.map((notification) =>
            notification.id === id
              ? { ...notification, isRead: true }
              : notification
          )
        );

        setUnreadCount((prev) => Math.max(0, prev - 1));
      } catch (error) {
        console.error("Error marking notification as read:", error);
        toast.error("Failed to mark notification as read.");
      }
    },
    [userId, toast]
  );

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    if (!userId) {
      console.warn(
        "Cannot mark all notifications as read: No user ID available"
      );
      return;
    }

    try {
      await notificationService.markAllAsRead(userId);

      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, isRead: true }))
      );

      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      toast.error("Failed to mark all notifications as read.");
    }
  }, [userId, toast]);

  // Remove notification
  const removeNotification = useCallback(
    async (id: string) => {
      if (!userId) {
        console.warn("Cannot remove notification: No user ID available");
        return;
      }

      try {
        await notificationService.removeNotification(id, userId);

        const notificationToRemove = notifications.find((n) => n.id === id);
        setNotifications((prev) =>
          prev.filter((notification) => notification.id !== id)
        );

        if (notificationToRemove && !notificationToRemove.isRead) {
          setUnreadCount((prev) => Math.max(0, prev - 1));
        }
      } catch (error) {
        console.error("Error removing notification:", error);
        toast.error("Failed to remove notification.");
      }
    },
    [notifications, userId, toast]
  );

  // Create context value
  const contextValue: NotificationContextType = {
    notifications,
    unreadCount,
    loading,
    permissionGranted,
    requestPermission,
    loadNotifications,
    markAsRead,
    markAllAsRead,
    removeNotification,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
}

// Custom hook to use the notification context
export function useNotifications(): NotificationContextType {
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }

  return context;
}
