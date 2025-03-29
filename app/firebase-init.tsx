"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    swRegistration?: ServiceWorkerRegistration;
  }
}
import { initializeApp, getApps } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  deleteToken,
} from "firebase/messaging";
import { toast } from "sonner";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export default function FirebaseInit() {
  const [notificationsEnabled, setNotificationsEnabled] = useState<
    boolean | null
  >(null);
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        // Check if browser supports service workers and notifications
        if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
          console.log("Browser does not support push notifications");
          setNotificationsEnabled(false);
          return;
        }

        // Initialize Firebase only if it hasn't been initialized
        if (!getApps().length) {
          initializeApp(firebaseConfig);
        }

        // Check if notifications are already enabled
        const notificationPermission = Notification.permission;
        setNotificationsEnabled(notificationPermission === "granted");

        // Wait for the service worker to be registered
        const getRegistration = async () => {
          if (window.swRegistration) {
            return window.swRegistration;
          }

          // If the service worker is not registered yet, wait for the event
          return new Promise((resolve) => {
            window.addEventListener(
              "swRegistered",
              (event) => {
                resolve((event as CustomEvent).detail);
              },
              { once: true }
            );

            // If the event doesn't fire within 5 seconds, try to get the registration directly
            setTimeout(async () => {
              try {
                const registration = await navigator.serviceWorker.ready;
                resolve(registration);
              } catch (error) {
                console.error(
                  "Error getting service worker registration:",
                  error
                );
                resolve(null);
              }
            }, 5000);
          });
        };

        const registration = (await getRegistration()) as ServiceWorkerRegistration;

        if (!registration) {
          console.error("No service worker registration found");
          return;
        }

        console.log("Service Worker registration found:", registration.scope);

        // Pass Firebase config to service worker
        if (registration.active) {
          registration.active.postMessage({
            type: "FIREBASE_CONFIG",
            config: firebaseConfig,
          });
        }

        // Initialize Firebase Messaging
        const messaging = getMessaging();

        // If permission is already granted, get the token
        if (notificationPermission === "granted") {
          try {
            const currentToken = await getToken(messaging, {
              vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
              serviceWorkerRegistration: registration,
            });

            if (currentToken) {
              console.log("FCM token:", currentToken);
              setFcmToken(currentToken);

              // Here you would send the token to your server
              // Example: await saveTokenToServer(currentToken);
            } else {
              console.log("No registration token available");
            }
          } catch (tokenError) {
            console.error("Error getting FCM token:", tokenError);
          }
        }

        // Handle foreground messages
        onMessage(messaging, (payload) => {
          console.log("Foreground message received:", payload);

          // Display notification using toast
          toast.success(payload.notification?.title || "New Notification", {
            description: payload.notification?.body || "",
            duration: 5000,
          });
        });
      } catch (error) {
        console.error("Error initializing Firebase:", error);
      }
    };

    initialize();

    // Check for stored notification preference
    const storedPreference = localStorage.getItem("notificationsEnabled");
    if (storedPreference) {
      setNotificationsEnabled(storedPreference === "true");
    }

    // Add script to load the service worker registration script
    const script = document.createElement("script");
    script.src = "/registerSW.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}

// Export utility functions for enabling/disabling notifications
export async function enableNotifications() {
  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const messaging = getMessaging();
      const registration = await navigator.serviceWorker.ready;

      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        serviceWorkerRegistration: registration,
      });

      if (token) {
        // Save token to server
        // await saveTokenToServer(token);
        localStorage.setItem("notificationsEnabled", "true");
        return { success: true, token };
      }
    }

    return { success: false, error: "Permission denied" };
  } catch (error) {
    console.error("Error enabling notifications:", error);
    return { success: false, error };
  }
}

export async function disableNotifications() {
  try {
    const messaging = getMessaging();
    const currentToken = await getToken(messaging);

    if (currentToken) {
      await deleteToken(messaging);
      // Remove token from server
      // await removeTokenFromServer(currentToken);
    }

    localStorage.setItem("notificationsEnabled", "false");
    return { success: true };
  } catch (error) {
    console.error("Error disabling notifications:", error);
    return { success: false, error };
  }
}
