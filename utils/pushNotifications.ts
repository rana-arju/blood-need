"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";

// Define window interface for our custom properties
declare global {
  interface Window {
    swRegistration?: ServiceWorkerRegistration;
    swActivated?: boolean;
    notificationToastId?: string;
    fcmInitialized?: boolean; // Add global flag for FCM initialization
  }
}

// Check if push notifications are supported
export const isPushNotificationSupported = () => {
  return (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window
  );
};

// Check if notifications are enabled
export const areNotificationsEnabled = () => {
  if (!isPushNotificationSupported()) return false;

  return (
    Notification.permission === "granted" &&
    localStorage.getItem("notificationsEnabled") === "true"
  );
};

// Show a notification toast
export const showNotificationToast = (
  title: string,
  body?: string,
  url?: string
) => {
  // Clear previous toast if exists
  if (window.notificationToastId) {
    toast.dismiss(window.notificationToastId);
  }

  // Show new toast
  const toastId = toast.success(title, {
    description: body,
    action: url
      ? {
          label: "View",
          onClick: () => window.open(url, "_blank"),
        }
      : undefined,
  });

  // Store toast ID as string
  if (toastId !== undefined) {
    // Convert to string to fix TypeScript error
    window.notificationToastId = String(toastId);
  }
};

// Enable debug mode for service worker on localhost
export const enableServiceWorkerOnLocalhost = () => {
  if (
    typeof window !== "undefined" &&
    window.location.hostname === "localhost"
  ) {
    localStorage.setItem("enable_sw_on_localhost", "true");
    console.log("Service worker enabled on localhost");

    // Reload page to apply changes
    window.location.reload();
  }
};

// Disable debug mode for service worker on localhost
export const disableServiceWorkerOnLocalhost = () => {
  if (
    typeof window !== "undefined" &&
    window.location.hostname === "localhost"
  ) {
    localStorage.removeItem("enable_sw_on_localhost");
    console.log("Service worker disabled on localhost");

    // Unregister service workers
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });
    }

    // Reload page to apply changes
    window.location.reload();
  }
};

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase if not already initialized
const initializeFirebaseApp = () => {
  if (getApps().length === 0) {
    return initializeApp(firebaseConfig);
  } else {
    return getApp();
  }
};

// Get service worker registration
const getServiceWorkerRegistration =
  async (): Promise<ServiceWorkerRegistration | null> => {
    if (!("serviceWorker" in navigator)) {
      console.log("[SW] Service workers not supported");
      return null;
    }

    try {
      // First check if we already have a registration
      if (window.swRegistration) {
        return window.swRegistration;
      }

      // Check if service worker is already controlling the page
      if (navigator.serviceWorker.controller) {
        const registration = await navigator.serviceWorker.ready;
        window.swRegistration = registration;
        return registration;
      }

      // Register service worker if not already registered
      const registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js",
        {
          scope: "/",
        }
      );

      window.swRegistration = registration;
      return registration;
    } catch (error) {
      console.error("[SW] Error getting service worker registration:", error);
      return null;
    }
  };

// Hook for notification subscription
export function useNotificationSubscription() {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const tokenRequestInProgressRef = useRef<boolean>(false);
  const firebaseInitializedRef = useRef<boolean>(false);
  const messagingRef = useRef<any>(null);
  const hasShownSuccessToastRef = useRef<boolean>(false);

  // Check subscription status
  const checkSubscription = useCallback(async () => {
    if (!userId || typeof window === "undefined") return;

    try {
      // Check browser permission
      if (!("Notification" in window)) {
        return;
      }

      const permission = Notification.permission;
      const notificationsEnabled =
        localStorage.getItem("notificationsEnabled") === "true";

      setIsSubscribed(permission === "granted" && notificationsEnabled);

      // If subscribed, initialize Firebase and setup messaging
      if (permission === "granted" && notificationsEnabled) {
        await initializeFirebaseMessaging();
      }
    } catch (error) {
      console.error("Error checking subscription:", error);
    }
  }, [userId]);

  // Initialize Firebase Messaging
  const initializeFirebaseMessaging = async () => {
    // Use window-level flag to prevent multiple initializations across component instances
    if (window.fcmInitialized) {
      firebaseInitializedRef.current = true;
      return;
    }

    try {
      // Check if Firebase Messaging is supported
      if (!(await isSupported())) {
        console.log("Firebase Messaging is not supported in this browser");
        return;
      }

      // Initialize Firebase
      const app = initializeFirebaseApp();

      // Get service worker registration
      const swRegistration = await getServiceWorkerRegistration();
      if (!swRegistration) {
        console.error("No service worker registration available");
        return;
      }

      // Initialize messaging
      const messaging = getMessaging(app);
      messagingRef.current = messaging;
      firebaseInitializedRef.current = true;
      window.fcmInitialized = true;

      // Setup message listener for foreground notifications
      onMessage(messaging, (payload) => {
        console.log("Foreground message received:", payload);

        if (payload.notification) {
          // Prevent duplicate toasts
          if (window.notificationToastId) {
            toast.dismiss(window.notificationToastId);
          }

          const toastId = toast.success(
            payload.notification.title || "New Notification",
            {
              description: payload.notification.body,
              action: payload.data?.url
                ? {
                    label: "View",
                    onClick: () => window.open(payload?.data?.url, "_blank"),
                  }
                : undefined,
            }
          );

          // Convert to string to fix TypeScript error
          if (toastId !== undefined) {
            window.notificationToastId = String(toastId);
          }
        }
      });

      // Check for missed notifications
      if (userId) {
        checkMissedNotifications(userId);
      }
    } catch (error) {
      console.error("Error initializing Firebase Messaging:", error);
    }
  };

  // Check for missed notifications
  const checkMissedNotifications = async (userId: string) => {
    try {
      const response = await fetch("/api/notifications/check-missed", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to check missed notifications");
      }

      const data = await response.json();

      if (data.missedNotifications > 0) {
        toast.info(
          `You have ${data.missedNotifications} missed notifications`,
          {
            description: "Check your notification center to view them",
            action: {
              label: "View",
              onClick: () => (window.location.href = "/notifications"),
            },
          }
        );
      }
    } catch (error) {
      console.error("Error checking missed notifications:", error);
    }
  };

  // Subscribe to push notifications
  const subscribe = async (): Promise<boolean> => {
    if (!userId) {
      toast.error("You must be logged in to enable notifications");
      return false;
    }

    // Check if already subscribed
    if (isSubscribed) {
      console.log("Already subscribed to notifications");
      return true;
    }

    // Prevent multiple simultaneous subscription attempts
    if (isLoading || tokenRequestInProgressRef.current) {
      return false;
    }

    setIsLoading(true);
    tokenRequestInProgressRef.current = true;

    try {
      // Initialize Firebase if not already initialized
      if (!firebaseInitializedRef.current) {
        await initializeFirebaseMessaging();
      }

      // Get service worker registration
      const swRegistration = await getServiceWorkerRegistration();
      if (!swRegistration) {
        throw new Error("No service worker registration available");
      }

      // Request notification permission if not already granted
      // This will show the browser's native permission dialog
      if (Notification.permission !== "granted") {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          throw new Error("Notification permission denied");
        }
      }

      // Get FCM token
      if (!messagingRef.current) {
        const app = initializeFirebaseApp();
        messagingRef.current = getMessaging(app);
      }

      // Get token with retry mechanism
      let currentToken = null;
      let attempts = 0;
      const maxAttempts = 3;

      while (!currentToken && attempts < maxAttempts) {
        try {
          attempts++;
          console.log(`[FCM] Token attempt ${attempts}/${maxAttempts}`);

          currentToken = await getToken(messagingRef.current, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
            serviceWorkerRegistration: swRegistration,
          });

          if (!currentToken) {
            console.log("[FCM] No token received, waiting before retry");
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        } catch (error) {
          console.error(`[FCM] Token attempt ${attempts} failed:`, error);
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      if (!currentToken) {
        throw new Error("Failed to get FCM token after multiple attempts");
      }

      // Store token in localStorage for later unsubscribe
      localStorage.setItem("fcm_token", currentToken);

      // Register token with backend
      const response = await fetch("/api/notifications/register-device", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: currentToken,
          userId: userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register token with backend");
      }

      // Update state and localStorage
      localStorage.setItem("notificationsEnabled", "true");
      localStorage.setItem("notification-permission-interacted", "true");

      // Store the current timestamp to track when notifications were enabled
      const now = Date.now();
      localStorage.setItem("notification_subscription_time", now.toString());

      // Also store in sessionStorage to track this browser session
      sessionStorage.setItem("notification_success_shown", "true");

      setIsSubscribed(true);

      // Only show success message if we haven't shown it in this component instance
      // or if this is a new subscription (not a page refresh)
      if (
        !hasShownSuccessToastRef.current &&
        !sessionStorage.getItem("notification_success_shown_once")
      ) {
        //toast.success("Notifications enabled successfully");
        hasShownSuccessToastRef.current = true;
        sessionStorage.setItem("notification_success_shown_once", "true");
      }

      return true;
    } catch (error) {
      console.error("Error subscribing to notifications:", error);
      toast.error("Failed to enable notifications");
      return false;
    } finally {
      setIsLoading(false);
      tokenRequestInProgressRef.current = false;
    }
  };

  // Unsubscribe from push notifications
  const unsubscribe = async (): Promise<boolean> => {
    if (!userId) return false;

    setIsLoading(true);

    try {
      // Get service worker registration
      const swRegistration = await getServiceWorkerRegistration();
      if (!swRegistration) {
        throw new Error("No service worker registration available");
      }

      // Get current subscription
      const subscription = await swRegistration.pushManager.getSubscription();
      if (subscription) {
        // Unsubscribe locally
        await subscription.unsubscribe();
      }

      // Get stored FCM token
      const fcmToken = localStorage.getItem("fcm_token");

      if (fcmToken) {
        // Unregister token with backend
        const response = await fetch("/api/notifications/unregister-device", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: fcmToken,
            userId: userId,
          }),
        });

        if (!response.ok) {
          console.error("Failed to unregister token with backend");
        }

        // Remove token from localStorage
        localStorage.removeItem("fcm_token");
      }

      // Update state and localStorage
      localStorage.setItem("notificationsEnabled", "false");
      localStorage.removeItem("notification_subscription_time");
      sessionStorage.removeItem("notification_success_shown");
      sessionStorage.removeItem("notification_success_shown_once");
      hasShownSuccessToastRef.current = false;
      setIsSubscribed(false);

      toast.success("Notifications disabled");
      return true;
    } catch (error) {
      console.error("Error unsubscribing from notifications:", error);
      toast.error("Failed to disable notifications");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Check if we need to initialize on mount
  useEffect(() => {
    // Check if we've already shown the success toast in this session
    if (sessionStorage.getItem("notification_success_shown")) {
      hasShownSuccessToastRef.current = true;
    }

    checkSubscription();

    // Cleanup function
    return () => {
      // We don't reset window.fcmInitialized here because we want it to persist across component unmounts
    };
  }, [checkSubscription]);

  return { isSubscribed, isLoading, subscribe, unsubscribe, checkSubscription };
}
