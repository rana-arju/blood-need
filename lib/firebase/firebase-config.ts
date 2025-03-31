import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Cloud Messaging and get a reference to the service
let messaging: any = null;
let isMessagingSupported = false;

// Function to initialize messaging
export const initializeMessaging = async () => {
  if (typeof window === "undefined") return null;

  if (messaging) return messaging;

  try {
    isMessagingSupported = await isSupported();

    if (isMessagingSupported) {
      messaging = getMessaging(app);
      console.log("Firebase Messaging initialized successfully");
      return messaging;
    } else {
      console.log("Firebase Messaging is not supported in this browser");
      return null;
    }
  } catch (error) {
    console.error("Error initializing Firebase Messaging:", error);
    return null;
  }
};

// Function to request permission and get FCM token
export const requestNotificationPermission = async (): Promise<
  string | null
> => {
  if (typeof window === "undefined") return null;

  try {
    const messagingInstance = await initializeMessaging();
    if (!messagingInstance) return null;

    // Request permission
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Notification permission denied");
      return null;
    }

    console.log("Notification permission granted");

    // Get registration
    const registration = await navigator.serviceWorker.ready;

    // Get token
    const currentToken = await getToken(messagingInstance, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    if (currentToken) {
      console.log("FCM Token obtained:", currentToken);
      return currentToken;
    } else {
      console.log("No FCM token available");
      return null;
    }
  } catch (error) {
    console.error("Error requesting notification permission:", error);
    return null;
  }
};

// Function to register FCM token with backend
export const registerFCMToken = async (
  token: string,
  userId: string
): Promise<boolean> => {
  try {
    const response = await fetch("/api/notifications/register-device", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, userId }),
    });

    if (response.ok) {
      console.log("FCM token registered with server");
      return true;
    } else {
      console.error(
        "Failed to register FCM token with server:",
        response.status
      );
      return false;
    }
  } catch (error) {
    console.error("Error registering FCM token with server:", error);
    return false;
  }
};

// Function to set up foreground message handler
export const setupForegroundMessageHandler = (
  callback: (payload: any) => void
) => {
  if (!messaging) return () => {};

  return onMessage(messaging, (payload) => {
    console.log("Foreground message received:", payload);
    callback(payload);
  });
};

export { app, messaging, isMessagingSupported };
