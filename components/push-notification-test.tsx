"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { isSupported } from "firebase/messaging";
import { useSession } from "next-auth/react";

export default function PushNotificationTest() {
  const [status, setStatus] = useState<string>("Initializing...");
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
const {data:session} = useSession()
  useEffect(() => {
    // Check if notifications are supported
    const checkSupport = async () => {
      if (!("Notification" in window)) {
        setStatus("Notifications not supported in this browser");
        return;
      }

      const supported = await isSupported();
      if (!supported) {
        setStatus("Firebase messaging not supported in this browser");
        return;
      }

      setStatus("Ready to request permission");
    };

    checkSupport();
  }, []);

  const requestPermissionAndToken = async () => {
    setIsLoading(true);
    setStatus("Requesting permission...");

    try {
      // Request permission
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setStatus("Notification permission denied");
        setIsLoading(false);
        return;
      }

      setStatus("Permission granted, initializing Firebase...");

      // Initialize Firebase
      const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      };

      const app = initializeApp(firebaseConfig);
      const messaging = getMessaging(app);

      setStatus("Getting service worker registration...");

      // Wait for service worker to be ready
      let registration;
      if (window.swRegistration) {
        registration = window.swRegistration;
        console.log("Using existing service worker registration");
      } else {
        // Wait for service worker to be ready
        registration = await navigator.serviceWorker.ready;
        console.log("Service worker is ready");
      }

      setStatus("Getting FCM token...");

      // Get FCM token
      const currentToken = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        serviceWorkerRegistration: registration,
      });

      if (currentToken) {
        setToken(currentToken);
        setStatus("FCM token obtained successfully");

        // Save token to localStorage
        localStorage.setItem("fcm_token", currentToken);

        // You can register the token with your backend here
        console.log("FCM Token:", currentToken);
      } else {
        setStatus("No FCM token available");
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      setStatus(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const sendTestNotification = async () => {
    if (!token) {
      setStatus("No FCM token available");
      return;
    }

    setIsLoading(true);
    setStatus("Sending test notification...");

    try {
      // Send a test notification using your backend API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.id}`,
          },
          body: JSON.stringify({
            token,
            title: "Diagnostic Test Notification",
            body: `Test notification sent at ${new Date().toLocaleTimeString()}`,
            data: {
              url: "/notifications",
              testId: `test-${Date.now()}`,
            },
          }),
        }
        );
        console.log("rana", await response.json());
        

      if (response.ok) {
        setStatus("Test notification sent successfully");
      } else {
        const errorData = await response.json();
        setStatus(
          `Failed to send notification: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error sending test notification:", error);
      setStatus(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Push Notification Test</CardTitle>
        <CardDescription>Test FCM push notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-3 bg-gray-100 rounded-md">
            <p className="text-sm font-medium">Status: {status}</p>
          </div>

          {token && (
            <div className="p-3 bg-gray-100 rounded-md overflow-auto">
              <p className="text-sm font-medium">FCM Token:</p>
              <p className="text-xs break-all mt-1">{token}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={requestPermissionAndToken}
          disabled={isLoading || status === "FCM token obtained successfully"}
        >
          {isLoading ? "Processing..." : "Request Permission & Token"}
        </Button>

        {token && (
          <Button
            onClick={sendTestNotification}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Send Test Notification
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
