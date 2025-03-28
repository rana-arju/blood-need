importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js")

// Initialize the Firebase app in the service worker
const firebaseApp = firebase.initializeApp({
  apiKey: self.FIREBASE_API_KEY,
  projectId: self.FIREBASE_PROJECT_ID,
  messagingSenderId: self.FIREBASE_MESSAGING_SENDER_ID,
  appId: self.FIREBASE_APP_ID,
})

const messaging = firebase.messaging()

// Background message handler
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload)

  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-192x192.png",
    data: payload.data,
    vibrate: [100, 50, 100],
    actions: [
      {
        action: "view",
        title: "View",
      },
    ],
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

// Notification click event
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  if (event.action === "view" || !event.action) {
    const url = event.notification.data?.url || "/"

    event.waitUntil(
      clients.matchAll({ type: "window" }).then((windowClients) => {
        // Check if there is already a window/tab open with the target URL
        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i]
          if (client.url === url && "focus" in client) {
            return client.focus()
          }
        }
        // If no window/tab is open, open a new one
        if (clients.openWindow) {
          return clients.openWindow(url)
        }
      }),
    )
  }
})

// Push event handler for web push
self.addEventListener("push", (event) => {
  if (event.data) {
    try {
      const data = event.data.json()

      const title = data.notification?.title || "Blood Donation App"
      const options = {
        body: data.notification?.body || "",
        icon: "/icons/icon-192x192.png",
        badge: "/icons/icon-192x192.png",
        data: data.data || {},
        vibrate: [100, 50, 100],
        actions: [
          {
            action: "view",
            title: "View",
          },
        ],
      }

      event.waitUntil(self.registration.showNotification(title, options))
    } catch (error) {
      console.error("Error processing push notification:", error)
    }
  }
})

