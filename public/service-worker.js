// Combined Service Worker for offline functionality and Firebase Cloud Messaging

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

// Firebase config will be passed from the main thread
let firebaseConfig = null;

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

  // Notify all clients that the service worker is active
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        type: "SW_ACTIVATED",
      });
    });
  });
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

// Listen for messages from the main thread
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "FIREBASE_CONFIG") {
    firebaseConfig = event.data.config;
    console.log("[Service Worker] Firebase config received",event);

    // Notify the client that we received the config
    event.source.postMessage({
      type: "FIREBASE_CONFIG_RECEIVED",
    });
  }
});

// Push event - handle incoming push notifications
self.addEventListener("push", (event) => {
console.log(event.data?.text());
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
  console.log("[Service Worker] Push Received:", notificationData);

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

// Notification click event - handle user interaction with notifications
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

// Background sync event - handle offline actions when back online
self.addEventListener("sync", (event) => {
  console.log("[Service Worker] Background Sync:", event);

  if (event.tag === "sync-notifications") {
    event.waitUntil(
      // Process the offline queue
      self.clients.matchAll().then((clients) => {
        if (clients && clients.length) {
          // Send message to client to process offline queue
          clients[0].postMessage({
            type: "PROCESS_OFFLINE_QUEUE",
          });
        }
      })
    );
  }
});
