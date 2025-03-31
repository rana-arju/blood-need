"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import {
  runNotificationDiagnostics,
  checkBrowserCompatibility,
  checkNotificationPermission,
  checkServiceWorkerRegistration,
  checkFirebaseInitialization,
  checkFCMToken,
  testSendNotification,
  logNotification,
  LogLevel,
} from "@/utils/notification-debug";

export default function NotificationDebugger() {
  const [diagnosticResults, setDiagnosticResults] = useState<any>(null);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testStatus, setTestStatus] = useState<string | null>(null);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    // Run initial diagnostics on mount
    runInitialDiagnostics();
  }, []);

  const runInitialDiagnostics = async () => {
    const results = await runNotificationDiagnostics();
    setDiagnosticResults(results);
  };

  const runTests = async () => {
    setIsRunningTests(true);
    setTestStatus("Running diagnostics...");

    try {
      // Step 1: Check browser compatibility
      setTestStatus("Checking browser compatibility...");
      const isCompatible = checkBrowserCompatibility();
      if (!isCompatible) {
        setTestStatus("Browser not compatible with push notifications");
        setIsRunningTests(false);
        return;
      }

      // Step 2: Check notification permission
      setTestStatus("Checking notification permission...");
      const permissionGranted = await checkNotificationPermission();
      if (!permissionGranted) {
        setTestStatus("Notification permission not granted");

        // Request permission if not granted
        setTestStatus("Requesting notification permission...");
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          setTestStatus("Notification permission denied by user");
          setIsRunningTests(false);
          return;
        }
      }

      // Step 3: Check service worker registration
      setTestStatus("Checking service worker registration...");
      let swRegistration = await checkServiceWorkerRegistration();

      if (!swRegistration) {
        setTestStatus("Registering service worker...");
        try {
          swRegistration = await navigator.serviceWorker.register(
            "/firebase-messaging-sw.js",
            { scope: "/" }
          );
          logNotification(
            "Service worker registered manually",
            swRegistration,
            LogLevel.SUCCESS
          );

          // Wait for the service worker to be activated
          if (swRegistration.installing) {
            setTestStatus("Waiting for service worker to activate...");
            await new Promise<void>((resolve) => {
              const stateChangeListener = (e: Event) => {
                if ((e.target as ServiceWorker).state === "activated") {
                  logNotification(
                    "Service worker activated",
                    null,
                    LogLevel.SUCCESS
                  );
                  resolve();
                  if (swRegistration?.installing) {
                    swRegistration.installing.removeEventListener(
                      "statechange",
                      stateChangeListener
                    );
                  }
                }
              };
              if (swRegistration?.installing) {
                swRegistration.installing.addEventListener(
                  "statechange",
                  stateChangeListener
                );
              }
            });
          }
        } catch (error) {
          logNotification(
            "Failed to register service worker manually",
            error,
            LogLevel.ERROR
          );
          setTestStatus("Failed to register service worker");
          setIsRunningTests(false);
          return;
        }
      }

      // Step 4: Check Firebase initialization
      setTestStatus("Checking Firebase initialization...");
      const firebaseInitialized = checkFirebaseInitialization();

      if (!firebaseInitialized) {
        setTestStatus("Firebase not initialized, initializing...");
        try {
          // Pass Firebase config to service worker
          if (swRegistration.active) {
            const config = {
              apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
              authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
              projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
              storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
              messagingSenderId:
                process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
              appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
            };

            logNotification(
              "Sending Firebase config to service worker",
              config
            );
            swRegistration.active.postMessage({
              type: "FIREBASE_CONFIG",
              config,
            });
          }
        } catch (error) {
          logNotification(
            "Failed to initialize Firebase",
            error,
            LogLevel.ERROR
          );
          setTestStatus("Failed to initialize Firebase");
          setIsRunningTests(false);
          return;
        }
      }

      // Step 5: Check FCM token
      setTestStatus("Checking FCM token...");
      const fcmToken = await checkFCMToken();

      if (!fcmToken && userId) {
        setTestStatus("No FCM token found, requesting new token...");
        try {
          // This would normally be handled by your token request function
          // For debugging purposes, we're just setting a status
          setTestStatus("Token request would happen here");
          // In a real implementation, you would call your token request function
        } catch (error) {
          logNotification("Failed to request FCM token", error, LogLevel.ERROR);
          setTestStatus("Failed to request FCM token");
          setIsRunningTests(false);
          return;
        }
      }

      // Step 6: Test sending a notification
      if (userId && fcmToken) {
        setTestStatus("Testing notification sending...");
        const sendResult = await testSendNotification(userId);

        if (sendResult) {
          setTestStatus(
            "Test notification sent successfully! Check for notification."
          );
        } else {
          setTestStatus("Failed to send test notification");
        }
      } else {
        setTestStatus(
          "Cannot test notification sending without user ID and FCM token"
        );
      }

      // Run final diagnostics
      const finalResults = await runNotificationDiagnostics();
      setDiagnosticResults(finalResults);
    } catch (error) {
      logNotification("Error during tests", error, LogLevel.ERROR);
      setTestStatus(
        `Error during tests: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsRunningTests(false);
    }
  };

  const renderStatusBadge = (status: boolean | null) => {
    if (status === null) return <Badge variant="outline">Unknown</Badge>;
    return status ? (
      <Badge className="bg-green-500">Passed</Badge>
    ) : (
      <Badge className="bg-red-500">Failed</Badge>
    );
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Push Notification Debugger</CardTitle>
        <CardDescription>
          Diagnose and fix push notification issues
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Browser Compatible</h3>
              {renderStatusBadge(diagnosticResults?.browserCompatible)}
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Permission Granted</h3>
              {renderStatusBadge(diagnosticResults?.permissionGranted)}
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Service Worker Registered</h3>
              {renderStatusBadge(diagnosticResults?.serviceWorkerRegistered)}
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Firebase Initialized</h3>
              {renderStatusBadge(diagnosticResults?.firebaseInitialized)}
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">FCM Token Exists</h3>
              {renderStatusBadge(diagnosticResults?.fcmTokenExists)}
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">User Logged In</h3>
              {renderStatusBadge(!!userId)}
            </div>
          </div>

          {testStatus && (
            <div className="mt-4 p-3 bg-gray-100 rounded-md">
              <p className="text-sm font-medium">Status: {testStatus}</p>
            </div>
          )}

          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Open your browser console to see detailed logs. Look for entries
              with "[FCM Debug]" prefix.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={runInitialDiagnostics}
          disabled={isRunningTests}
        >
          Refresh Diagnostics
        </Button>
        <Button
          onClick={runTests}
          disabled={isRunningTests}
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          {isRunningTests ? "Running Tests..." : "Run Step-by-Step Tests"}
        </Button>
      </CardFooter>
    </Card>
  );
}
