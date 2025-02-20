export async function subscribeToPushNotifications(userId: string) {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
        ),
      });

    const subs = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subscription, userId }),
        }
      );

      console.log("Push notification subscription successful", subs);
      return true;
    } catch (error) {
      console.error("Error subscribing to push notifications:", error);
      return false;
    }
  }
  return false;
}

export async function unsubscribeFromPushNotifications(userId: string) {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();
        await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/unsubscribe`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          }
        );
        console.log("Unsubscribed from push notifications");
        return true;
      }
    } catch (error) {
      console.error("Error unsubscribing from push notifications:", error);
    }
  }
  return false;
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
