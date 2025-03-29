// This file will be imported by the service worker to handle messages

// Listen for messages from the main thread
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "FIREBASE_CONFIG") {
    // Store Firebase config in service worker scope
    const config = event.data.config;

    // Set global variables that will be used by firebase-messaging-sw.js
    self.FIREBASE_API_KEY = config.FIREBASE_API_KEY;
    self.FIREBASE_AUTH_DOMAIN = config.FIREBASE_AUTH_DOMAIN;
    self.FIREBASE_PROJECT_ID = config.FIREBASE_PROJECT_ID;
    self.FIREBASE_STORAGE_BUCKET = config.FIREBASE_STORAGE_BUCKET;
    self.FIREBASE_MESSAGING_SENDER_ID = config.FIREBASE_MESSAGING_SENDER_ID;
    self.FIREBASE_APP_ID = config.FIREBASE_APP_ID;

    console.log("[Service Worker] Firebase config received");
  }
});
