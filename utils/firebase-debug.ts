// Simple utility to check Firebase initialization status
import { getApps, initializeApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";

// Function to check if Firebase is properly initialized
export async function checkFirebaseInitialization() {
  console.log("🔍 Checking Firebase initialization...");

  // Step 1: Check if Firebase app is initialized
  const apps = getApps();
  console.log(`Firebase apps initialized: ${apps.length}`);

  if (apps.length === 0) {
    console.error("❌ No Firebase apps initialized!");
    return false;
  }

  // Step 2: Check if messaging is supported
  const messagingSupported = await isSupported();
  console.log(`Firebase messaging supported: ${messagingSupported}`);

  if (!messagingSupported) {
    console.error("❌ Firebase messaging not supported in this browser!");
    return false;
  }

  // Step 3: Try to get messaging instance
  try {
    const messaging = getMessaging();
    console.log("✅ Firebase messaging initialized successfully:", messaging);
    return true;
  } catch (error) {
    console.error("❌ Failed to initialize Firebase messaging:", error);
    return false;
  }
}

// Function to initialize Firebase with proper error handling
export function initializeFirebase() {
  try {
    // Check if Firebase is already initialized
    if (getApps().length > 0) {
      console.log("Firebase already initialized");
      return true;
    }

    // Get Firebase config from window object or environment variables
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    // Log the config (without sensitive values in production)
    console.log("Initializing Firebase with config:", {
      ...firebaseConfig,
      apiKey: firebaseConfig.apiKey ? "DEFINED" : "UNDEFINED",
      appId: firebaseConfig.appId ? "DEFINED" : "UNDEFINED",
    });

    // Initialize Firebase
    initializeApp(firebaseConfig);
    console.log("✅ Firebase initialized successfully");
    return true;
  } catch (error) {
    console.error("❌ Failed to initialize Firebase:", error);
    return false;
  }
}
