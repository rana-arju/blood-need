// Firebase Cloud Messaging Service Worker

importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize Firebase with hardcoded config
// This will be replaced with actual values during build
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Get messaging instance
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message:",
    payload
  );

  const notificationTitle =
    payload.notification?.title || "Blood Donation Community";
  const notificationOptions = {
    body: payload.notification?.body || "You have a new notification",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-192x192.png",
    data: {
      url: payload.data?.url || "/",
      ...payload.data,
    },
    actions: [
      {
        action: "view",
        title: "View",
      },
    ],
    vibrate: [100, 50, 100],
    timestamp: Date.now(),
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// IMPORTANT: Add explicit push event handler for DevTools testing
self.addEventListener("push", (event) => {
  console.log("[Service Worker] Push Received:", event);

  let notificationData = {};

  if (event.data) {
    try {
      notificationData = event.data.json();
    } catch (e) {
      notificationData = {
        title: "New Notification",
        body: event.data.text(),
      };
    }
  }

  const title =
    notificationData.notification?.title || "Blood Donation Community";
  const options = {
    body: notificationData.notification?.body || "You have a new notification",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-192x192.png",
    data: {
      url: notificationData.data?.url || "/",
      ...notificationData.data,
    },
    actions: [
      {
        action: "view",
        title: "View",
      },
    ],
    vibrate: [100, 50, 100],
    timestamp: Date.now(),
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Handle notification click
self.addEventListener("notificationclick", (event) => {
  console.log("[Service Worker] Notification click:", event);

  event.notification.close();

  // Get the notification data
  const url = event.notification.data?.url || "/";

  // Open the target URL
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

// Cache name for offline assets
const CACHE_NAME = "blood-donation-cache-v1";

// Assets to cache for offline use
const OFFLINE_ASSETS = [
  "/",
  "/offline.html",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/manifest.json",
];

// Install event - cache offline assets
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing Service Worker...");

  // Skip waiting to ensure the service worker activates immediately
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching offline assets");
      return cache.addAll(OFFLINE_ASSETS);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating Service Worker...");

  // Claim clients to ensure the service worker controls all clients immediately
  event.waitUntil(clients.claim());

  // Clean up old caches
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[Service Worker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener("fetch", (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return;
  }

  // Network first, fallback to cache strategy
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful responses for future offline use
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // When offline, try to serve from cache
        return caches.match(event.request).then((response) => {
          if (response) {
            return response;
          }

          // If the request is for a page, return the offline page
          if (event.request.headers.get("accept")?.includes("text/html")) {
            return caches.match("/offline.html");
          }

          // For other resources, just fail
          return new Response("Not available while offline", {
            status: 503,
            statusText: "Service Unavailable",
          });
        });
      })
  );
});
