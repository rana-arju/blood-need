"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  enableServiceWorkerOnLocalhost,
  disableServiceWorkerOnLocalhost,
  isPushNotificationSupported,
  areNotificationsEnabled,
} from "@/utils/pushNotifications";

export default function NotificationDebug() {
  const [swEnabled, setSwEnabled] = useState(false);
  const [swRegistration, setSwRegistration] =
    useState<ServiceWorkerRegistration | null>(null);
  const [notificationPermission, setNotificationPermission] =
    useState<string>("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if service worker is enabled on localhost
    const isEnabled = localStorage.getItem("enable_sw_on_localhost") === "true";
    setSwEnabled(isEnabled);

    // Get service worker registration
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        setSwRegistration(registration || null);
      });
    }

    // Get notification permission
    if ("Notification" in window) {
      setNotificationPermission(Notification.permission);
    }

    // Check if notifications are enabled
    setNotificationsEnabled(areNotificationsEnabled());

    // Get FCM token
    const token = localStorage.getItem("fcm_token");
    setFcmToken(token);
  }, []);

  const toggleServiceWorker = () => {
    if (swEnabled) {
      disableServiceWorkerOnLocalhost();
    } else {
      enableServiceWorkerOnLocalhost();
    }
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("notification-permission-interacted");
    localStorage.removeItem("notificationsEnabled");
    localStorage.removeItem("fcm_token");
    alert("Local storage cleared. Reload the page to see changes.");
  };

  const unregisterServiceWorkers = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
        alert("Service workers unregistered. Reload the page to see changes.");
      });
    }
  };

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-50 max-w-md">
      <h3 className="text-lg font-bold mb-2">Notification Debug</h3>

      <div className="space-y-2 text-sm">
        <div>
          <strong>Push Supported:</strong>{" "}
          {isPushNotificationSupported() ? "Yes" : "No"}
        </div>
        <div>
          <strong>Permission:</strong> {notificationPermission}
        </div>
        <div>
          <strong>Notifications Enabled:</strong>{" "}
          {notificationsEnabled ? "Yes" : "No"}
        </div>
        <div>
          <strong>SW Enabled on Localhost:</strong> {swEnabled ? "Yes" : "No"}
        </div>
        <div>
          <strong>SW Registered:</strong> {swRegistration ? "Yes" : "No"}
        </div>
        <div className="truncate">
          <strong>FCM Token:</strong>{" "}
          {fcmToken ? `${fcmToken.substring(0, 20)}...` : "None"}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <Button size="sm" onClick={toggleServiceWorker}>
          {swEnabled ? "Disable SW" : "Enable SW"}
        </Button>
        <Button size="sm" variant="destructive" onClick={clearLocalStorage}>
          Clear Storage
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={unregisterServiceWorkers}
        >
          Unregister SWs
        </Button>
      </div>
    </div>
  );
}
