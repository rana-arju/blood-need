"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ServiceWorkerDebug() {
  const [swStatus, setSwStatus] = useState<string>("Checking...");
  const [swRegistrations, setSwRegistrations] = useState<
    ServiceWorkerRegistration[]
  >([]);
  const [notificationPermission, setNotificationPermission] =
    useState<string>("unknown");
  const [firebaseConfig, setFirebaseConfig] = useState<any>({});
  const [debugLog, setDebugLog] = useState<string[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    checkServiceWorker();
    checkNotificationPermission();
    checkFirebaseConfig();
  }, []);

  const addLog = (message: string) => {
    setDebugLog((prev) => [
      ...prev,
      `[${new Date().toISOString()}] ${message}`,
    ]);
  };

  const checkServiceWorker = async () => {
    if (!("serviceWorker" in navigator)) {
      setSwStatus("Service Worker not supported");
      addLog("Service Worker not supported");
      return;
    }

    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      setSwRegistrations([...registrations]);

      if (registrations.length === 0) {
        setSwStatus("No Service Workers registered");
        addLog("No Service Workers registered");
      } else {
        setSwStatus(`${registrations.length} Service Worker(s) registered`);
        addLog(`${registrations.length} Service Worker(s) registered`);

        registrations.forEach((reg, i) => {
          addLog(
            `SW ${i + 1}: Scope: ${reg.scope}, State: ${
              reg.installing
                ? "installing"
                : reg.waiting
                ? "waiting"
                : reg.active
                ? "active"
                : "unknown"
            }`
          );
        });
      }
    } catch (error) {
      console.error("Error checking service worker:", error);
      setSwStatus("Error checking Service Worker");
      addLog(`Error checking Service Worker: ${error}`);
    }
  };

  const checkNotificationPermission = () => {
    if (!("Notification" in window)) {
      setNotificationPermission("not supported");
      addLog("Notifications not supported");
      return;
    }

    setNotificationPermission(Notification.permission);
    addLog(`Notification permission: ${Notification.permission}`);
  };

  const checkFirebaseConfig = () => {
    const config = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? "✓" : "✗",
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? "✓" : "✗",
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? "✓" : "✗",
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
        ? "✓"
        : "✗",
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
        ? "✓"
        : "✗",
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? "✓" : "✗",
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY ? "✓" : "✗",
    };

    setFirebaseConfig(config);

    Object.entries(config).forEach(([key, value]) => {
      addLog(`Firebase config - ${key}: ${value}`);
    });
  };

  const unregisterAllServiceWorkers = async () => {
    if (!("serviceWorker" in navigator)) {
      addLog("Service workers not supported");
      return;
    }

    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      addLog(`Unregistering ${registrations.length} service workers...`);

      for (const registration of registrations) {
        await registration.unregister();
        addLog(`Unregistered service worker with scope: ${registration.scope}`);
      }

      setSwStatus("All Service Workers unregistered");
      setSwRegistrations([]);
      addLog("All Service Workers unregistered");
    } catch (error) {
      console.error("Error unregistering service workers:", error);
      setSwStatus("Error unregistering Service Workers");
      addLog(`Error unregistering Service Workers: ${error}`);
    }
  };

  const registerServiceWorker = async () => {
    if (!("serviceWorker" in navigator)) {
      addLog("Service workers not supported");
      return;
    }

    try {
      addLog("Registering service worker...");
      const registration = await navigator.serviceWorker.register(
        "/service-worker.js",
        {
          scope: "/",
        }
      );

      addLog(`Service worker registered with scope: ${registration.scope}`);
      checkServiceWorker();
    } catch (error) {
      console.error("Error registering service worker:", error);
      addLog(`Error registering service worker: ${error}`);
    }
  };

  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      addLog("Notifications not supported");
      return;
    }

    try {
      addLog("Requesting notification permission...");
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      addLog(`Notification permission result: ${permission}`);
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      addLog(`Error requesting notification permission: ${error}`);
    }
  };

  const testServiceWorker = async () => {
    if (!("serviceWorker" in navigator)) {
      addLog("Service workers not supported");
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      addLog(`Service worker is ready with scope: ${registration.scope}`);

      if (registration.active) {
        addLog("Sending test message to service worker");
        registration.active.postMessage({
          type: "TEST",
          message: "Hello from debug panel",
        });
      } else {
        addLog("No active service worker found");
      }
    } catch (error) {
      console.error("Error testing service worker:", error);
      addLog(`Error testing service worker: ${error}`);
    }
  };

  return (
    <Card
      className={`w-full max-w-2xl mx-auto ${
        theme === "dark" ? "bg-gray-800 text-white" : ""
      }`}
    >
      <CardHeader>
        <CardTitle>Service Worker Debug</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">Service Worker Status</h3>
          <p>{swStatus}</p>
          <div className="mt-2">
            {swRegistrations.map((registration, index) => (
              <div key={index} className="text-sm">
                <p>Scope: {registration.scope}</p>
                <p>
                  State:{" "}
                  {registration.installing
                    ? "installing"
                    : registration.waiting
                    ? "waiting"
                    : registration.active
                    ? "active"
                    : "unknown"}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Button variant="outline" size="sm" onClick={checkServiceWorker}>
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={registerServiceWorker}>
              Register SW
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={unregisterAllServiceWorkers}
            >
              Unregister All
            </Button>
            <Button variant="outline" size="sm" onClick={testServiceWorker}>
              Test SW
            </Button>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Notification Permission</h3>
          <p>{notificationPermission}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={requestNotificationPermission}
            className="mt-2"
            disabled={notificationPermission === "granted"}
          >
            Request Permission
          </Button>
        </div>

        <div>
          <h3 className="font-semibold">Firebase Config</h3>
          <div className="text-sm">
            {Object.entries(firebaseConfig).map(([key, value]:any) => (
              <p key={key}>
                {key}: {value}
              </p>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Debug Log</h3>
          <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-900 rounded text-xs font-mono h-40 overflow-y-auto">
            {debugLog.map((log, index) => (
              <div key={index}>{log}</div>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDebugLog([])}
            className="mt-2"
          >
            Clear Log
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
