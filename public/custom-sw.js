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

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});

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
            headers: {
              "Content-Type": "application/json",
            },
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
