// Service Worker Registration Script
(() => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      try {
        console.log("[SW] Registering service worker...");

        // Register the service worker
        const registration = await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js",
          {
            scope: "/",
            updateViaCache: "none",
          }
        );

        console.log(
          "[SW] Service worker registered successfully:",
          registration.scope
        );

        // Store the registration globally
        window.swRegistration = registration;

        // Dispatch event for other components to know service worker is registered
        window.dispatchEvent(
          new CustomEvent("swRegistered", { detail: registration })
        );

        // Check if service worker is already active
        if (registration.active) {
          console.log("[SW] Service worker already active");
          window.dispatchEvent(
            new CustomEvent("swActivated", { detail: registration })
          );
        }
        // Otherwise wait for it to activate
        else if (registration.installing) {
          console.log(
            "[SW] Service worker is installing, waiting for activation..."
          );

          registration.installing.addEventListener("statechange", (event) => {
            if (event.target.state === "activated") {
              console.log("[SW] Service worker activated");
              window.dispatchEvent(
                new CustomEvent("swActivated", { detail: registration })
              );
            }
          });
        }
      } catch (error) {
        console.error("[SW] Service worker registration failed:", error);
      }
    });

    // Listen for messages from the service worker
    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data && event.data.type === "SW_ACTIVATED") {
        console.log(
          "[SW] Service worker is now active and controlling the page"
        );
        window.dispatchEvent(
          new CustomEvent("swActivated", {
            detail: navigator.serviceWorker.controller,
          })
        );
      }
    });
  } else {
    console.log("[SW] Service workers are not supported");
  }
})();
