"use client";

import { useEffect, useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

// Define window interface for our custom properties
declare global {
  interface Window {
    swRegistration?: ServiceWorkerRegistration;
    swActivated?: boolean;
    notificationToastId?: string;
    firebase_messaging_initialized?: boolean;
    firebase_app_initialized?: boolean;
  }
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

export default function FirebaseInit() {
  const { data: session } = useSession();
  const [initialized, setInitialized] = useState(false);
  const userId = session?.user?.id;

  // Initialize Firebase only once
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Skip if already initialized
    if (window.firebase_app_initialized) {
      console.log("Firebase app already initialized");
      return;
    }

    try {
      // Only initialize if not already initialized
      if (!getApps().length) {
        initializeApp(firebaseConfig);
        console.log("Firebase app initialized");
        window.firebase_app_initialized = true;
      }
    } catch (error) {
      console.error("Firebase initialization error:", error);
    }
  }, []);

  // Initialize Firebase Messaging
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !userId ||
      initialized ||
      window.firebase_messaging_initialized
    ) {
      return;
    }

    const initializeFirebaseMessaging = async () => {
      try {
        // Check if notification permission is granted
        if (Notification.permission !== "granted") {
          console.log("Notification permission not granted");
          return;
        }

        // Check if notifications are enabled in localStorage
        if (localStorage.getItem("notificationsEnabled") !== "true") {
          console.log("Notifications not enabled in localStorage");
          return;
        }

        // Wait for service worker registration
        let registration = window.swRegistration;

        if (!registration) {
          // Try to get existing registration
          if ("serviceWorker" in navigator) {
            try {
              registration = await navigator.serviceWorker.getRegistration();
              if (registration) {
                window.swRegistration = registration;
                console.log("Retrieved existing service worker registration");
              }
            } catch (error) {
              console.error(
                "Error getting service worker registration:",
                error
              );
            }
          }
        }

        if (!registration) {
          console.log("No service worker registration available");
          return;
        }

        // Get messaging instance
        const messaging = getMessaging();

        // Get FCM token
        const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
        if (!vapidKey) {
          console.error("VAPID key not available");
          return;
        }

        try {
          const currentToken = await getToken(messaging, {
            vapidKey,
            serviceWorkerRegistration: registration,
          });

          if (currentToken) {
            console.log("FCM token obtained");

            // Store token in localStorage
            localStorage.setItem("fcm_token", currentToken);

            // Register token with backend
            await fetch("/api/notifications/register-device", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token: currentToken, userId }),
            });

            // Set up foreground message handler
            onMessage(messaging, (payload) => {
              console.log("Foreground message received:", payload);

              if (payload.notification) {
                // Clear previous toast if exists
                if (window.notificationToastId) {
                  toast.dismiss(window.notificationToastId);
                }

                // Show new toast
                const toastId = toast.success(
                  payload.notification.title || "New Notification",
                  {
                    description: payload.notification.body,
                    action: payload.data?.url ? (
                      <a
                        href={payload.data.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary text-white px-3 py-2 rounded-md text-xs"
                      >
                        View
                      </a>
                    ) : undefined,
                  }
                );

                // Store toast ID as string
                window.notificationToastId = toastId?.toString();
              }
            });

            window.firebase_messaging_initialized = true;
            setInitialized(true);
          } else {
            console.log("No FCM token received");
          }
        } catch (error) {
          console.error("Error retrieving FCM token:", error);
        }
      } catch (error) {
        console.error("Error initializing Firebase messaging:", error);
      }
    };

    // Initialize with a slight delay to ensure service worker is ready
    const timer = setTimeout(() => {
      initializeFirebaseMessaging();
    }, 2000);

    return () => clearTimeout(timer);
  }, [userId, initialized]);

  // This is a client-side only component with no UI
  return null;
}
