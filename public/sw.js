const CACHE_NAME = "blood-need";
const urlsToCache = [
  "/",
  "/dashboard",
  "/blood-request",
  "/offline",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).catch(() => caches.match("/offline"));
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
self.addEventListener("push", (event) => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: "/1.jpg",
    badge: "/1.jpg",
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});
