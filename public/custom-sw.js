// Custom Service Worker for caching and offline support

// Cache names
const STATIC_CACHE = "static-cache-v1";
const DYNAMIC_CACHE = "dynamic-cache-v1";
const IMAGE_CACHE = "image-cache-v1";
const API_CACHE = "api-cache-v1";
const FONT_CACHE = "font-cache-v1";

// Resources to cache immediately
const STATIC_ASSETS = [
  "/",
  "/offline",
  "/manifest.json",
  "/favicon.ico",
  "/icons/icon.png",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/placeholder.svg",
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  const currentCaches = [
    STATIC_CACHE,
    DYNAMIC_CACHE,
    IMAGE_CACHE,
    API_CACHE,
    FONT_CACHE,
  ];

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return cacheNames.filter(
          (cacheName) => !currentCaches.includes(cacheName)
        );
      })
      .then((cachesToDelete) => {
        return Promise.all(
          cachesToDelete.map((cacheToDelete) => {
            return caches.delete(cacheToDelete);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Helper function to determine cache strategy based on request
function getCacheStrategy(request) {
  const url = new URL(request.url);

  // Font requests - cache first, long expiry
  if (
    url.hostname.includes("fonts.googleapis.com") ||
    url.hostname.includes("fonts.gstatic.com") ||
    request.url.match(/\.(woff|woff2|eot|ttf|otf)$/)
  ) {
    return {
      cacheName: FONT_CACHE,
      strategy: "cache-first",
      expiration: 30 * 24 * 60 * 60, // 30 days in seconds
    };
  }

  // API requests - network first, short expiry
  if (url.pathname.includes("/api/")) {
    return {
      cacheName: API_CACHE,
      strategy: "network-first",
      expiration: 60 * 60, // 1 hour in seconds
    };
  }

  // Image requests - cache first, medium expiry
  if (
    request.destination === "image" ||
    url.pathname.endsWith(".jpg") ||
    url.pathname.endsWith(".jpeg") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".webp") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.includes("/_next/image")
  ) {
    return {
      cacheName: IMAGE_CACHE,
      strategy: "cache-first",
      expiration: 7 * 24 * 60 * 60, // 7 days in seconds
    };
  }

  // HTML requests - network first
  if (request.destination === "document") {
    return {
      cacheName: DYNAMIC_CACHE,
      strategy: "network-first",
      expiration: 24 * 60 * 60, // 1 day in seconds
    };
  }

  // JavaScript and CSS - cache first
  if (
    request.destination === "script" ||
    request.destination === "style" ||
    url.pathname.includes("/_next/static/")
  ) {
    return {
      cacheName: STATIC_CACHE,
      strategy: "cache-first",
      expiration: 7 * 24 * 60 * 60, // 7 days in seconds
    };
  }

  // Default - stale-while-revalidate
  return {
    cacheName: DYNAMIC_CACHE,
    strategy: "stale-while-revalidate",
    expiration: 24 * 60 * 60, // 1 day in seconds
  };
}

// Fetch event - handle different caching strategies
self.addEventListener("fetch", (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return;
  }

  const { cacheName, strategy, expiration } = getCacheStrategy(event.request);

  if (strategy === "cache-first") {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then((response) => {
            if (
              !response ||
              response.status !== 200 ||
              response.type !== "basic"
            ) {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(cacheName).then((cache) => {
              cache.put(event.request, responseToCache);

              // Set expiration for cached item
              if (expiration) {
                const now = Date.now();
                const expirationData = {
                  url: event.request.url,
                  timestamp: now,
                  expiration: now + expiration * 1000,
                };
                localStorage.setItem(
                  `exp_${event.request.url}`,
                  JSON.stringify(expirationData)
                );
              }
            });

            return response;
          })
          .catch(() => {
            // If it's an image, return a placeholder
            if (event.request.destination === "image") {
              return caches.match("/placeholder.svg");
            }

            return null;
          });
      })
    );
  } else if (strategy === "network-first") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(cacheName).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }

            // If it's a navigation request, return the offline page
            if (event.request.destination === "document") {
              return caches.match("/offline");
            }

            return null;
          });
        })
    );
  } else if (strategy === "stale-while-revalidate") {
    event.respondWith(
      caches.open(cacheName).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchPromise = fetch(event.request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                cache.put(event.request, networkResponse.clone());
              }
              return networkResponse;
            })
            .catch(() => {
              // If network fetch fails, return null to fall back to cache
              return null;
            });

          return cachedResponse || fetchPromise;
        });
      })
    );
  }
});

// Clean up expired cache items
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "CLEAR_EXPIRED_CACHE") {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            return caches.open(cacheName).then((cache) => {
              return cache.keys().then((requests) => {
                return Promise.all(
                  requests.map((request) => {
                    const expData = localStorage.getItem(`exp_${request.url}`);
                    if (expData) {
                      const { expiration } = JSON.parse(expData);
                      if (Date.now() > expiration) {
                        return cache.delete(request).then(() => {
                          localStorage.removeItem(`exp_${request.url}`);
                        });
                      }
                    }
                    return Promise.resolve();
                  })
                );
              });
            });
          })
        );
      })
    );
  }
});

// Handle offline fallback
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match("/offline");
      })
    );
  }
});
