"use client";

import type React from "react";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { initializeApp, getApps } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";

import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { registerServiceWorker } from "@/utils/register-service-worker";

// Define window interface for our custom properties
declare global {
  interface Window {
    swRegistration?: ServiceWorkerRegistration;
    swActivated?: boolean;
    notificationToastId?: string;
  }
}

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
  notificationsEnabled: boolean | null;
  isLoading: boolean;
  enableNotifications: () => Promise<{ success: boolean; error?: any }>;
  disableNotifications: () => Promise<{ success: boolean; error?: any }>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(
    null
  );
  const [notificationsEnabled, setNotificationsEnabled] = useState<
    boolean | null
  >(null);
  const [swRegistration, setSwRegistration] =
    useState<ServiceWorkerRegistration | null>(null);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const registeringPromiseRef = useRef<Promise<any> | null>(null);
  const firebaseInitializedRef = useRef(false);
  const messagingRef = useRef<any>(null);

  // Initialize Firebase
  useEffect(() => {
    if (
      !firebaseInitializedRef.current &&
      typeof window !== "undefined" &&
      !getApps().length
    ) {
      try {
        initializeApp(firebaseConfig);
        firebaseInitializedRef.current = true;
        console.log("Firebase initialized");
      } catch (error) {
        console.error("Firebase init failed:", error);
      }
    }
  }, []);

  // Check permission status
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkPermission = async () => {
      if (!("Notification" in window)) {
        setPermissionGranted(false);
        return;
      }

      const permission = Notification.permission;
      const isGranted = permission === "granted";
      setPermissionGranted(isGranted);

      const stored = localStorage.getItem("notificationsEnabled");
      const isEnabled = isGranted && stored === "true";
      setNotificationsEnabled(isEnabled);

      const hasInteractedBefore = localStorage.getItem(
        "notification-permission-interacted"
      );
      if (hasInteractedBefore === "true" && !isGranted) {
        console.log("User previously denied permission");
        return;
      }

      if (isEnabled && userId) {
        await registerForPushNotifications();
      }
    };

    checkPermission();
  }, [userId]);

  // Register for push notifications
  const registerForPushNotifications = useCallback(async () => {
    if (!userId) return { success: false, error: "User not logged in" };
    if (registeringPromiseRef.current) {
      console.log("Registration already in progress");
      return registeringPromiseRef.current;
    }

    const register = async () => {
      try {
        // Check if FCM is supported
        if (!(await isSupported())) {
          return { success: false, error: "FCM not supported" };
        }

        // Register service worker
        const registration = await registerServiceWorker();
        if (!registration) throw new Error("SW registration failed");
        setSwRegistration(registration);

        // Initialize messaging
        const messaging = getMessaging();
        messagingRef.current = messaging;

        // Get FCM token
        const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
        if (!vapidKey) throw new Error("No VAPID key");

        let token: string | null = null;
        try {
          token = await getToken(messaging, {
            vapidKey,
            serviceWorkerRegistration: registration,
          });
        } catch (error) {
          console.error("Error getting token:", error);
          throw error;
        }

        if (!token) throw new Error("FCM token fetch failed");

        // Register token with backend
        await registerFCMToken(token, userId);

        setNotificationsEnabled(true);
        localStorage.setItem("notificationsEnabled", "true");

        // Set up foreground message handler
        onMessage(messaging, (payload) => {
          console.log("Foreground FCM message:", payload);
          if (payload.notification) {
            const newNotification: Notification = {
              id: payload.messageId || `temp-${Date.now()}`,
              title: payload.notification.title || "New Notification",
              body: payload.notification.body || "",
              url: payload.data?.url,
              isRead: false,
              createdAt: new Date().toISOString(),
              userId,
            };
            setNotifications((prev) => [newNotification, ...prev]);
            setUnreadCount((prev) => prev + 1);

            // Store the toast ID as a string
            const toastId = toast.success(newNotification.title, {
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

            // Convert to string if it's a number
            window.notificationToastId = toastId?.toString();
          }
        });

        return { success: true };
      } catch (error) {
        console.error("Push registration failed:", error);
        return { success: false, error };
      }
    };

    registeringPromiseRef.current = register().finally(() => {
      registeringPromiseRef.current = null;
    });

    return registeringPromiseRef.current;
  }, [userId]);

  // Register FCM token with backend
  const registerFCMToken = async (token: string, userId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/token/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userId}`,
          },
          body: JSON.stringify({ token }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register FCM token");
      }

      // Store token in localStorage for later use
      localStorage.setItem("fcm_token", token);

      return true;
    } catch (error) {
      console.error("Error registering FCM token:", error);
      return false;
    }
  };

  // Request notification permission
  const requestPermission = async (): Promise<boolean> => {
    if (!userId || typeof window === "undefined") return false;

    try {
      setIsLoading(true);

      if (isLoading) {
        console.log("Permission request already in progress");
        return false;
      }

      // Request browser permission
      const permission = await Notification.requestPermission();
      const granted = permission === "granted";
      setPermissionGranted(granted);

      if (granted) {
        // Register for push notifications
        const result = await registerForPushNotifications();
        if (result.success) {
          setNotificationsEnabled(true);
          localStorage.setItem("notificationsEnabled", "true");
          localStorage.setItem("notification-permission-interacted", "true");
          return true;
        }
      }

      setIsLoading(false);
      return granted;
    } catch (error) {
      console.error("Permission request error:", error);
      setIsLoading(false);
      return false;
    }
  };

  // Enable notifications
  const enableNotifications = () =>
    requestPermission().then((granted) => ({
      success: granted,
      error: granted ? undefined : "Permission denied",
    }));

  // Disable notifications
  const disableNotifications = async () => {
    if (!userId) return { success: false, error: "No user" };

    setIsLoading(true);
    try {
      setNotificationsEnabled(false);
      localStorage.setItem("notificationsEnabled", "false");

      if (swRegistration) {
        const subscription = await swRegistration.pushManager.getSubscription();
        if (subscription) await subscription.unsubscribe();
      }

      // Unregister from backend
      const fcmToken = localStorage.getItem("fcm_token");
      if (fcmToken) {
        try {
          await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/token/remove`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userId}`,
              },
              body: JSON.stringify({ token: fcmToken }),
            }
          );

          // Remove token from localStorage
          localStorage.removeItem("fcm_token");
        } catch (error) {
          console.error("Error unregistering token:", error);
        }
      }

      setIsLoading(false);
      return { success: true };
    } catch (error) {
      console.error("Disable notification error:", error);
      setIsLoading(false);
      return { success: false, error };
    }
  };

  // Load notifications from backend
  const loadNotifications = useCallback(
    async (page: number, limit: number) => {
      if (!userId) return;
      try {
        setLoading(true);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications?page=${page}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${userId}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }

        const data = await response.json();

        setNotifications((prev) =>
          page === 1 ? data.data : [...prev, ...data.data]
        );
        setUnreadCount(data.data.filter((n: any) => !n.isRead).length);
      } catch (error) {
        toast.error("Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    },
    [userId]
  );

  // Mark notification as read
  const markAsRead = useCallback(
    async (id: string) => {
      if (!userId) return;
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/read/${id}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${userId}`,
            },
          }
        );

        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      } catch (error) {
        toast.error("Error marking as read.");
      }
    },
    [userId]
  );

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    if (!userId) return;
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/read-all`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${userId}`,
          },
        }
      );

      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      toast.error("Error marking all as read.");
    }
  }, [userId]);

  // Remove notification
  const removeNotification = useCallback(
    async (id: string) => {
      if (!userId) return;
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${userId}`,
            },
          }
        );

        const toRemove = notifications.find((n) => n.id === id);
        setNotifications((prev) => prev.filter((n) => n.id !== id));
        if (toRemove && !toRemove.isRead) {
          setUnreadCount((prev) => Math.max(0, prev - 1));
        }
      } catch (error) {
        toast.error("Error removing notification.");
      }
    },
    [notifications, userId]
  );

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
    notificationsEnabled,
    isLoading,
    enableNotifications,
    disableNotifications,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      "useNotifications must be used within NotificationProvider"
    );
  return context;
}
