"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

// Helper to convert VAPID key
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Get service worker registration without waiting for activation
async function getServiceWorkerRegistration(): Promise<ServiceWorkerRegistration | null> {
  if (!("serviceWorker" in navigator)) {
    console.log("[SW] Service workers not supported");
    return null;
  }

  try {
    // First check if we already have a registration
    if (window.swRegistration) {
      console.log("[SW] Using existing service worker registration");
      return window.swRegistration;
    }

    // Check if service worker is already controlling the page
    if (navigator.serviceWorker.controller) {
      console.log("[SW] Service worker is already controlling the page");
      const registration = await navigator.serviceWorker.ready;
      window.swRegistration = registration;
      return registration;
    }

    // Register service worker if not already registered
    console.log("[SW] Registering service worker");
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js",
      {
        scope: "/",
      }
    );

    window.swRegistration = registration;
    console.log("[SW] Service worker registered:", registration);

    return registration;
  } catch (error) {
    console.error("[SW] Error getting service worker registration:", error);
    return null;
  }
}

export function useNotificationSubscription() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // Check subscription status on mount and when user changes
  const checkSubscription = useCallback(async () => {
    if (!userId) return;

    try {
      if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
        console.log("Push notifications not supported");
        return;
      }

      // Get service worker registration
      const registration = await getServiceWorkerRegistration();
      if (!registration) {
        console.log("No service worker registration available");
        return;
      }

      // Check for existing subscription
      const subscription = await registration.pushManager.getSubscription();

      // Also check localStorage preference
      const notificationsEnabled =
        localStorage.getItem("notificationsEnabled") === "true";
      setIsSubscribed(!!subscription && notificationsEnabled);
    } catch (error) {
      console.error("Error checking subscription:", error);
    }
  }, [userId]);

  useEffect(() => {
    checkSubscription();
  }, [checkSubscription]);

  // Subscribe to push notifications
  const subscribe = async () => {
    if (!userId) {
      toast.error("You must be logged in to enable notifications");
      return false;
    }

    setIsLoading(true);
    try {
      // First, request notification permission if not granted
      if (Notification.permission !== "granted") {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          toast.error("Notification permission denied");
          setIsLoading(false);
          return false;
        }
      }

      // Get service worker registration
      const registration = await getServiceWorkerRegistration();
      if (!registration) {
        throw new Error("Failed to get service worker registration");
      }

      // Check for existing subscription
      const existingSubscription =
        await registration.pushManager.getSubscription();
      if (existingSubscription) {
        console.log("Already subscribed:", existingSubscription);
        setIsSubscribed(true);
        localStorage.setItem("notificationsEnabled", "true");
        setIsLoading(false);
        return true;
      }

      // Get VAPID key
      if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
        throw new Error("VAPID public key not available");
      }

      // Subscribe to push with retry mechanism
      let subscription = null;
      let attempts = 0;
      const maxAttempts = 3;

      while (!subscription && attempts < maxAttempts) {
        try {
          attempts++;
          console.log(`Push subscription attempt ${attempts}/${maxAttempts}`);

          subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
            ),
          });

          if (!subscription) {
            console.log("No subscription received, waiting before retry");
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        } catch (error) {
          console.error(`Subscription attempt ${attempts} failed:`, error);
          if (attempts < maxAttempts) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
          } else {
            throw error;
          }
        }
      }

      if (!subscription) {
        throw new Error(
          "Failed to create push subscription after multiple attempts"
        );
      }

      console.log("New subscription created:", subscription);

      // Register with backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/web-push/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userId}`,
          },
          body: JSON.stringify({ subscription }),
        }
      );

      if (response.ok) {
        console.log("Subscription saved on the server");
        toast.success("Notifications enabled successfully");
        setIsSubscribed(true);
        localStorage.setItem("notificationsEnabled", "true");
        setIsLoading(false);
        return true;
      } else {
        console.error("Failed to save subscription on the server");
        toast.error("Failed to enable notifications");
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error("Error during subscription:", error);
      toast.error("Failed to enable notifications");
      setIsLoading(false);
      return false;
    }
  };

  // Unsubscribe from push notifications
  const unsubscribe = async () => {
    if (!userId) return false;

    setIsLoading(true);
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        // Unsubscribe locally
        await subscription.unsubscribe();

        // Unsubscribe on server
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/web-push/unsubscribe`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userId}`,
            },
            body: JSON.stringify({ endpoint: subscription.endpoint }),
          }
        );

        if (response.ok) {
          console.log("Unsubscribed from push notifications");
          toast.success("Notifications disabled");
        } else {
          console.error("Failed to unsubscribe on the server");
        }
      }

      // Update state regardless of server response
      setIsSubscribed(false);
      localStorage.setItem("notificationsEnabled", "false");
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Error unsubscribing from push notifications:", error);
      toast.error("Failed to disable notifications");
      setIsLoading(false);
      return false;
    }
  };

  return { isSubscribed, isLoading, subscribe, unsubscribe, checkSubscription };
}
