import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import {
  StaleWhileRevalidate,
  CacheFirst,
  NetworkFirst,
} from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

// ✅ Pre-cache assets
precacheAndRoute(self.__WB_MANIFEST || []);

// ✅ Cache Homepage ("/")
registerRoute(
  ({ url }) => url.pathname === "/",
  new StaleWhileRevalidate({
    cacheName: "html-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24, // 1 day
      }),
    ],
  })
);

// ✅ Cache Pages ("/about", "/contact", etc.)
registerRoute(
  ({ url }) =>
    /^\/(about|contact|donors|faq|awareness|privacy)/.test(url.pathname),
  new CacheFirst({
    cacheName: "pages-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 60 * 60 * 24 * 3, // 3 days
      }),
    ],
  })
);

// ✅ Cache Google Fonts
registerRoute(
  ({ url }) =>
    url.origin === "https://fonts.googleapis.com" ||
    url.origin === "https://fonts.gstatic.com",
  new CacheFirst({
    cacheName: "google-fonts",
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
      }),
    ],
  })
);

// ✅ Cache API requests
registerRoute(
  ({ url }) => url.origin === "https://blood-need.vercel.app",
  new NetworkFirst({
    cacheName: "api-cache",
    networkTimeoutSeconds: 10,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24, // 1 day
      }),
    ],
  })
);

// ✅ Cache Images
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "image-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
      }),
    ],
  })
);

// ✅ Cache Static Resources (CSS, JS, HTML)
registerRoute(
  ({ request }) =>
    ["style", "script", "document"].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: "static-resources",
  })
);

// ✅ Push Notification Event
self.addEventListener("push", (event) => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-192x192.png",
    data: {
      url: data.url,
      notificationId: data.notificationId,
    },
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// ✅ Handle Notification Click
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});

// ✅ Background Sync for Notifications
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-notifications") {
    event.waitUntil(syncNotifications());
  }
});

async function syncNotifications() {
  const cache = await caches.open("notifications");
  const notifications = await cache.match("pending-notifications");
  if (notifications) {
    const pendingNotifications = await notifications.json();
    await Promise.all(
      pendingNotifications.map(async (notification) => {
        try {
          await fetch("http://localhost:5000/api/v1/notifications/sync", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(notification),
          });
          // Remove synced notification from cache
          const updatedNotifications = pendingNotifications.filter(
            (n) => n.id !== notification.id
          );
          await cache.put(
            "pending-notifications",
            new Response(JSON.stringify(updatedNotifications))
          );
        } catch (error) {
          console.error("Error syncing notification:", error);
        }
      })
    );
  }
}
