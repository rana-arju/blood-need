// Helper function to register service worker
export const registerServiceWorker =
  async (): Promise<ServiceWorkerRegistration | null> => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return null;
    }

    try {
      // Check if service worker is already registered
      const registrations = await navigator.serviceWorker.getRegistrations();
      let registration = registrations.find(
        (reg) =>
          reg.active &&
          reg.active.scriptURL.includes("firebase-messaging-sw.js")
      );

      // If not registered, register it
      if (!registration) {
        console.log("Registering firebase-messaging-sw.js");
        registration = await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js",
          {
            scope: "/",
          }
        );

        // Wait for the service worker to be activated
        if (registration.installing) {
          console.log("Waiting for service worker to be activated");
          await new Promise<void>((resolve) => {
            const stateChangeListener = (e: Event) => {
              if ((e.target as ServiceWorker).state === "activated") {
                console.log("Service worker activated");
                resolve();
                registration?.installing?.removeEventListener(
                  "statechange",
                  stateChangeListener
                );
              }
            };
            if (registration?.installing) {
              registration.installing.addEventListener(
                "statechange",
                stateChangeListener
              );
            }
          });
        }
      }

      console.log("Service worker registration successful:", registration);
      return registration;
    } catch (error) {
      console.error("Error registering service worker:", error);
      return null;
    }
  };
