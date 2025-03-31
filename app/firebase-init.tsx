"use client";

import { useEffect, useState, useRef } from "react";
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

// Define the window interface to include our custom properties
declare global {
  interface Window {
    swRegistration?: ServiceWorkerRegistration;
    swActivated?: boolean;
    firebaseConfig?: any;
  }
}

export default function FirebaseInit() {
  const { data: session, status } = useSession();
  const [serviceWorkerReady, setServiceWorkerReady] = useState(false);
  const firebaseInitializedRef = useRef(false);
  const messagingRef = useRef<any>(null);
  const tokenRequestInProgressRef = useRef(false);

  // Wait for service worker to be activated
  useEffect(() => {
    const handleSwActivated = (event: Event) => {
      console.log("[FCM] Service worker activated event received", event);
      setServiceWorkerReady(true);
    };

    window.addEventListener("swActivated", handleSwActivated);

    // Check if service worker is already controlling the page
    if (navigator.serviceWorker?.controller) {
      console.log("[FCM] Service worker is already controlling the page");
      setServiceWorkerReady(true);
    }

    // Also check if service worker is ready
    navigator.serviceWorker?.ready
      .then(() => {
        console.log("[FCM] Service worker is ready");
        setServiceWorkerReady(true);
      })
      .catch((err) => {
        console.error("[FCM] Error checking if service worker is ready:", err);
      });

    return () => {
      window.removeEventListener("swActivated", handleSwActivated);
    };
  }, []);

  // Initialize Firebase and request permission
  useEffect(() => {
    // Only proceed if user is logged in
    if (status !== "authenticated" || !session?.user?.id) {
      console.log(
        "[FCM] User not authenticated, skipping Firebase initialization"
      );
      return;
    }

    if (!serviceWorkerReady) {
      console.log("[FCM] Service worker not ready yet, waiting...");
      return;
    }

    if (firebaseInitializedRef.current) {
      console.log("[FCM] Firebase already initialized, skipping");
      return;
    }

    const initialize = async () => {
      try {
        console.log("[FCM] Initializing Firebase for authenticated user");

        // Get Firebase config from environment variables
        const firebaseConfig = {
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
          messagingSenderId:
            process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        };

        // Ensure Firebase isn't initialized multiple times
        const app =
          getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
        firebaseInitializedRef.current = true;
        console.log("[FCM] Firebase initialized successfully");

        // Check browser support for FCM
        const isMessagingSupported = await isSupported();
        if (!isMessagingSupported) {
          console.log(
            "[FCM] Firebase messaging is not supported in this browser"
          );
          return;
        }

        // Get service worker registration
        let swRegistration: ServiceWorkerRegistration;
        try {
          swRegistration = await navigator.serviceWorker.ready;
          window.swRegistration = swRegistration;
          console.log("[FCM] Service worker is ready:", swRegistration);
        } catch (error) {
          console.error(
            "[FCM] Error getting service worker registration:",
            error
          );
          return;
        }

        // Initialize messaging
        const messaging = getMessaging(app);
        messagingRef.current = messaging;
        console.log("[FCM] Firebase messaging initialized");

        // Check notification permission - but don't request it automatically
        // We'll let the NotificationPermission component handle that
        const permission = Notification.permission;
        if (permission === "granted") {
          console.log("[FCM] Notification permission already granted");

          // Check if we have a stored preference to enable notifications
          const notificationsEnabled = localStorage.getItem(
            "notificationsEnabled"
          );
          if (notificationsEnabled === "true") {
            await getAndRegisterToken(
              messaging,
              swRegistration,
              session.user.id
            );
          } else {
            console.log("[FCM] Notifications not enabled by user preference");
          }
        }

        // Set up foreground message handler
        onMessage(messaging, (payload) => {
          console.log("[FCM] Foreground message received:", payload);

          if (payload.notification) {
            toast.success(payload.notification.title || "New Notification", {
              description: payload.notification.body,
              action: payload.data?.url
                ? {
                    label: "View",
                    onClick: () => window.open(payload.data?.url, "_blank"),
                  }
                : undefined,
            });
          }
        });
      } catch (error) {
        console.error("[FCM] Error initializing Firebase:", error);
      }
    };

    initialize();
  }, [session, status, serviceWorkerReady]);

  // Helper function to get and register FCM token
  const getAndRegisterToken = async (
    messaging: any,
    swRegistration: ServiceWorkerRegistration,
    userId: string
  ) => {
    // Prevent multiple simultaneous token requests
    if (tokenRequestInProgressRef.current) {
      console.log("[FCM] Token request already in progress");
      return;
    }

    tokenRequestInProgressRef.current = true;

    try {
      console.log("[FCM] Getting FCM token");

      // Get the token with a retry mechanism
      let currentToken = null;
      let attempts = 0;
      const maxAttempts = 3;

      while (!currentToken && attempts < maxAttempts) {
        try {
          attempts++;
          console.log(`[FCM] Token attempt ${attempts}/${maxAttempts}`);

          currentToken = await getToken(messaging, {
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

      if (currentToken) {
        console.log("[FCM] FCM token obtained:", currentToken);
        localStorage.setItem("fcm_token", currentToken);

        // Register token with backend
        try {
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

          if (response.ok) {
            console.log("[FCM] FCM token registered with backend");
          } else {
            console.error(
              "[FCM] Failed to register FCM token with backend:",
              response.status
            );
          }
        } catch (error) {
          console.error("[FCM] Error registering token with backend:", error);
        }
      } else {
        console.log("[FCM] No FCM token available after multiple attempts");
      }
    } catch (error) {
      console.error("[FCM] Error getting FCM token:", error);
    } finally {
      tokenRequestInProgressRef.current = false;
    }
  };

  return null;
}
