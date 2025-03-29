"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export function useNotificationSubscription() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.id) return;

    const checkSubscription = async () => {
      if ("serviceWorker" in navigator && "PushManager" in window) {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        setIsSubscribed(!!subscription);
      }
    };

    checkSubscription();
  }, [session]);

  const subscribe = async () => {
    if (!session?.user?.id) return;

    try {
      const registration = await navigator.serviceWorker.ready;
      const existingSubscription =
        await registration.pushManager.getSubscription();

      if (existingSubscription) {
        console.log("Already subscribed:", existingSubscription);
        setIsSubscribed(true);
        return;
      }

      const newSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/web-push/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.id}`,
          },
          body: JSON.stringify({ subscription: newSubscription }),
        }
      );

      if (response.ok) {
        console.log("Subscription saved on the server.");
        setIsSubscribed(true);
        return true;
      } else {
        console.error("Failed to save subscription on the server.");
        return false;
      }
    } catch (error) {
      console.error("Error during subscription:", error);
      return false;
    }
  };

  const unsubscribe = async () => {
    if (!session?.user?.id) return;

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/unsubscribe`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.user.id}`,
            },
          }
        );

        if (response.ok) {
          console.log("Unsubscribed from push notifications");
          setIsSubscribed(false);
        } else {
          console.error("Failed to unsubscribe on the server");
        }
      }
    } catch (error) {
      console.error("Error unsubscribing from push notifications:", error);
    }
  };

  return { isSubscribed, subscribe, unsubscribe };
}

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
