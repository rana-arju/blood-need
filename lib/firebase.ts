import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let app;
let messaging;
let isInitialized = false;

export const initializeFirebase = async () => {
  if (isInitialized) return { app, messaging };

  try {
    // Check if Firebase Messaging is supported
    if (!(await isSupported())) {
      console.log("Firebase Messaging is not supported in this browser");
      return { app: null, messaging: null };
    }

    app = initializeApp(firebaseConfig);
    messaging = getMessaging(app);
    isInitialized = true;

    console.log("Firebase initialized successfully");
    return { app, messaging };
  } catch (error) {
    console.error("Error initializing Firebase:", error);
    return { app: null, messaging: null };
  }
};

// Get FCM token
export const getFCMToken = async (userId) => {
  try {
    if (!messaging) {
      const { messaging: msg } = await initializeFirebase();
      if (!msg) return null;
      messaging = msg;
    }

    // Get service worker registration
    let swRegistration;
    if ("serviceWorker" in navigator) {
      swRegistration = await navigator.serviceWorker.ready;
    }

    // Get token
    const currentToken = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: swRegistration,
    });

    if (currentToken) {
      console.log("FCM token obtained:", currentToken);

      // Register token with backend
      await registerTokenWithBackend(currentToken, userId);

      return currentToken;
    } else {
      console.log("No FCM token available");
      return null;
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
    return null;
  }
};

// Register token with backend
const registerTokenWithBackend = async (token, userId) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/token/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userId}`,
        },
        body: JSON.stringify({ token }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to register token with backend");
    }

    console.log("Token registered with backend successfully");
    return true;
  } catch (error) {
    console.error("Error registering token with backend:", error);
    return false;
  }
};

// Set up foreground message handler
export const setupMessageListener = (callback) => {
  if (!messaging) return null;

  return onMessage(messaging, (payload) => {
    console.log("Foreground message received:", payload);

    // Call the callback with the notification data
    if (callback && typeof callback === "function") {
      callback(payload);
    }

    // Display notification using the Notification API if callback doesn't handle it
    if (payload.notification && Notification.permission === "granted") {
      const { title, body } = payload.notification;

      // Create notification
      new Notification(title, {
        body,
        icon: "/icons/icon-192x192.png",
        data: payload.data,
      });
    }
  });
};

// Check for missed notifications
export const checkMissedNotifications = async (userId) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/check-missed`,
      {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to check missed notifications");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error checking missed notifications:", error);
    return { missedNotifications: 0 };
  }
};
