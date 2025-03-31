// Notification debugging utility

import firebase from "firebase/compat/app";
import "firebase/compat/messaging";

// Enable or disable debug mode
const DEBUG_MODE = true;

// Log levels
export enum LogLevel {
  INFO = "INFO",
  WARNING = "WARNING",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
}

// Log with timestamp and prefix
export function logNotification(
  message: string,
  data?: any,
  level: LogLevel = LogLevel.INFO
) {
  if (!DEBUG_MODE) return;

  const timestamp = new Date().toISOString();
  const prefix = `[FCM Debug ${level}] [${timestamp}]`;

  switch (level) {
    case LogLevel.ERROR:
      console.error(prefix, message, data !== undefined ? data : "");
      break;
    case LogLevel.WARNING:
      console.warn(prefix, message, data !== undefined ? data : "");
      break;
    case LogLevel.SUCCESS:
      console.log(
        `%c${prefix} ${message}`,
        "color: green; font-weight: bold;",
        data !== undefined ? data : ""
      );
      break;
    default:
      console.log(prefix, message, data !== undefined ? data : "");
  }
}

// Check browser compatibility
export function checkBrowserCompatibility() {
  logNotification("Checking browser compatibility...");

  const checks = {
    serviceWorker: "serviceWorker" in navigator,
    pushManager: "PushManager" in window,
    notification: "Notification" in window,
    permissions: "permissions" in navigator,
  };

  logNotification("Browser compatibility results:", checks);

  const isCompatible = Object.values(checks).every(Boolean);

  if (isCompatible) {
    logNotification(
      "Browser is compatible with push notifications",
      null,
      LogLevel.SUCCESS
    );
  } else {
    logNotification(
      "Browser is not fully compatible with push notifications",
      checks,
      LogLevel.WARNING
    );
  }

  return isCompatible;
}

// Check notification permission
export async function checkNotificationPermission() {
  logNotification("Checking notification permission...");

  if (!("Notification" in window)) {
    logNotification(
      "Notifications not supported in this browser",
      null,
      LogLevel.ERROR
    );
    return false;
  }

  const permission = Notification.permission;
  logNotification(`Current notification permission: ${permission}`);

  return permission === "granted";
}

// Check service worker registration
export async function checkServiceWorkerRegistration() {
  logNotification("Checking service worker registration...");

  if (!("serviceWorker" in navigator)) {
    logNotification(
      "Service workers not supported in this browser",
      null,
      LogLevel.ERROR
    );
    return null;
  }

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    logNotification(
      `Found ${registrations.length} service worker registrations`
    );

    for (const registration of registrations) {
      logNotification("Service worker registration:", {
        scope: registration.scope,
        active: !!registration.active,
        installing: !!registration.installing,
        waiting: !!registration.waiting,
        updateViaCache: registration.updateViaCache,
      });
    }

    const fcmServiceWorker = registrations.find(
      (reg) =>
        reg.scope.includes("/") &&
        reg.active &&
        reg.active.scriptURL.includes("firebase-messaging-sw.js")
    );

    if (fcmServiceWorker) {
      logNotification(
        "Found Firebase messaging service worker",
        null,
        LogLevel.SUCCESS
      );
      return fcmServiceWorker;
    } else {
      logNotification(
        "Firebase messaging service worker not found",
        null,
        LogLevel.WARNING
      );
      return null;
    }
  } catch (error) {
    logNotification(
      "Error checking service worker registrations",
      error,
      LogLevel.ERROR
    );
    return null;
  }
}

// Check if Firebase is initialized
export function checkFirebaseInitialization() {
  logNotification("Checking Firebase initialization...");

  try {
    // @ts-ignore - Check if Firebase is defined globally
    const isInitialized =
      typeof firebase !== "undefined" && firebase.apps.length > 0;

    if (isInitialized) {
      // @ts-ignore
      const apps = firebase.apps.map((app) => app.name);
      logNotification(
        "Firebase is initialized with apps:",
        apps,
        LogLevel.SUCCESS
      );
    } else {
      logNotification("Firebase is not initialized", null, LogLevel.WARNING);
    }

    return isInitialized;
  } catch (error) {
    logNotification(
      "Error checking Firebase initialization",
      error,
      LogLevel.ERROR
    );
    return false;
  }
}

// Check FCM token
export async function checkFCMToken() {
  logNotification("Checking FCM token...");

  const token = localStorage.getItem("fcm_token");

  if (token) {
    logNotification("FCM token found in localStorage", token, LogLevel.SUCCESS);
    return token;
  } else {
    logNotification(
      "No FCM token found in localStorage",
      null,
      LogLevel.WARNING
    );
    return null;
  }
}

// Run all checks
export async function runNotificationDiagnostics() {
  logNotification("Running notification diagnostics...", null, LogLevel.INFO);

  const results = {
    browserCompatible: checkBrowserCompatibility(),
    permissionGranted: await checkNotificationPermission(),
    serviceWorkerRegistered: await checkServiceWorkerRegistration(),
    firebaseInitialized: checkFirebaseInitialization(),
    fcmTokenExists: await checkFCMToken(),
  };

  logNotification("Notification diagnostics results:", results);

  const allPassed = Object.values(results).every((result) => !!result);

  if (allPassed) {
    logNotification("All notification checks passed!", null, LogLevel.SUCCESS);
  } else {
    logNotification("Some notification checks failed", null, LogLevel.WARNING);
  }

  return results;
}

// Test sending a notification
export async function testSendNotification(userId: string) {
  logNotification("Testing notification sending...");

  const token = localStorage.getItem("fcm_token");

  if (!token) {
    logNotification(
      "No FCM token found, cannot send test notification",
      null,
      LogLevel.ERROR
    );
    return false;
  }

  try {
    logNotification("Sending test notification request to backend");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/send`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userId}`,
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

    if (response.ok) {
      const result = await response.json();
      logNotification(
        "Test notification sent successfully",
        result,
        LogLevel.SUCCESS
      );
      return true;
    } else {
      const error = await response.text();
      logNotification(
        "Failed to send test notification",
        { status: response.status, error },
        LogLevel.ERROR
      );
      return false;
    }
  } catch (error) {
    logNotification("Error sending test notification", error, LogLevel.ERROR);
    return false;
  }
}
