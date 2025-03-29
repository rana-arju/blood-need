// Service Worker Registration Script

// Register the main service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      // First, unregister any existing service workers to avoid conflicts
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
        console.log("Service Worker unregistered:", registration.scope);
      }

      // Register the Firebase messaging service worker
      const registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js",
        {
          scope: "/",
        }
      );
      console.log(
        "Firebase Messaging Service Worker registered with scope:",
        registration.scope
      );

      // Store the registration for later use
      window.swRegistration = registration;

      // Dispatch an event to notify the app that the service worker is registered
      window.dispatchEvent(
        new CustomEvent("swRegistered", { detail: registration })
      );
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  });
}
