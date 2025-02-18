export async function subscribeToPushNotifications() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    console.warn("Push Notifications are not supported in this browser.");
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });

    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/subscribe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      }
    );

    console.log("Push notification subscription successful");
  } catch (error) {
    console.error("Error subscribing to push notifications:", error);
  }
}

// ✅ Fix: Declare `SyncManager` to prevent TypeScript errors
declare global {
  interface ServiceWorkerRegistration {
    sync?: {
      register(tag: string): Promise<void>;
    };
  }
}

export async function registerBackgroundSync() {
  if (!("serviceWorker" in navigator)) {
    console.warn("Service Workers are not supported in this browser.");
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;

    if (registration.sync) {
      await registration.sync.register("sync-notifications");
      console.log("Background sync registered");
    } else {
      console.warn("Background Sync API is not supported in this browser.");
    }
  } catch (error) {
    console.error("Error registering background sync:", error);
  }
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
