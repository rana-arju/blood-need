// Firebase Messaging Service Worker

// Import Firebase scripts
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Firebase configuration will be set via postMessage
let firebaseConfig = {
  apiKey: self.FIREBASE_API_KEY || "",
  authDomain: self.FIREBASE_AUTH_DOMAIN || "",
  projectId: self.FIREBASE_PROJECT_ID || "",
  storageBucket: self.FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: self.FIREBASE_MESSAGING_SENDER_ID || "",
  appId: self.FIREBASE_APP_ID || "",
};

// Initialize Firebase
let firebaseApp;
let messaging;

// Listen for messages from the main thread to set config
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "FIREBASE_CONFIG") {
    // Store Firebase config in service worker scope
    const config = event.data.config;

    // Update the config with values from the message
    firebaseConfig = {
      apiKey: config.apiKey || config.FIREBASE_API_KEY || firebaseConfig.apiKey,
      authDomain:
        config.authDomain ||
        config.FIREBASE_AUTH_DOMAIN ||
        firebaseConfig.authDomain,
      projectId:
        config.projectId ||
        config.FIREBASE_PROJECT_ID ||
        firebaseConfig.projectId,
      storageBucket:
        config.storageBucket ||
        config.FIREBASE_STORAGE_BUCKET ||
        firebaseConfig.storageBucket,
      messagingSenderId:
        config.messagingSenderId ||
        config.FIREBASE_MESSAGING_SENDER_ID ||
        firebaseConfig.messagingSenderId,
      appId: config.appId || config.FIREBASE_APP_ID || firebaseConfig.appId,
    };

    console.log(
      "[firebase-messaging-sw.js] Received Firebase config:",
      JSON.stringify({
        apiKey: firebaseConfig.apiKey ? "✓" : "✗",
        authDomain: firebaseConfig.authDomain ? "✓" : "✗",
        projectId: firebaseConfig.projectId ? "✓" : "✗",
        storageBucket: firebaseConfig.storageBucket ? "✓" : "✗",
        messagingSenderId: firebaseConfig.messagingSenderId ? "✓" : "✗",
        appId: firebaseConfig.appId ? "✓" : "✗",
      })
    );

    // Initialize Firebase with the updated config
    try {
      if (!firebaseApp) {
        firebaseApp = firebase.initializeApp(firebaseConfig);
        messaging = firebase.messaging();

        // Set up background message handler
        messaging.onBackgroundMessage((payload) => {
          console.log(
            "[firebase-messaging-sw.js] Received background message:",
            payload
          );

          const notificationTitle =
            payload.notification?.title || "New Notification";
          const notificationOptions = {
            body: payload.notification?.body || "You have a new notification",
            icon: "/icons/icon-192x192.png",
            badge: "/icons/icon-192x192.png",
            data: payload.data || {},
            vibrate: [100, 50, 100],
            actions: [
              {
                action: "view",
                title: "View",
              },
            ],
          };

          return self.registration.showNotification(
            notificationTitle,
            notificationOptions
          );
        });

        console.log(
          "[firebase-messaging-sw.js] Firebase initialized successfully"
        );
      } else {
        console.log("[firebase-messaging-sw.js] Firebase already initialized");
      }
    } catch (error) {
      console.error(
        "[firebase-messaging-sw.js] Firebase initialization error:",
        error
      );
    }
  }
});

// Handle notification click
self.addEventListener("notificationclick", (event) => {
  console.log("[firebase-messaging-sw.js] Notification click:", event);

  event.notification.close();

  const url = event.notification.data?.url || "/";

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      // Check if there's already a window/tab open with the target URL
      for (const client of clientList) {
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }

      // If no window/tab is open with the target URL, open a new one
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

// Log any errors
self.addEventListener("error", (event) => {
  console.error("[firebase-messaging-sw.js] Error:", event.error);
});

console.log("[firebase-messaging-sw.js] Service worker loaded");
