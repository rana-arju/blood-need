// Helper function to register service worker
export const registerServiceWorker =
  async (): Promise<ServiceWorkerRegistration | null> => {
    if (!("serviceWorker" in navigator)) {
      console.log("Service workers not supported");
      return null;
    }

    try {
      // Check if we already have a registration in the window object
      if (window.swRegistration) {
        console.log("Using existing service worker registration");
        return window.swRegistration;
      }

      // Check if service worker is already controlling the page
      if (navigator.serviceWorker.controller) {
        console.log("Service worker is already controlling the page");
        const registration = await navigator.serviceWorker.ready;
        window.swRegistration = registration;
        return registration;
      }

      // Register service worker if not already registered
      console.log("Registering service worker");
      const registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js",
        {
          scope: "/",
        }
      );

      window.swRegistration = registration;
      console.log("Service worker registered:", registration);

      return registration;
    } catch (error) {
      console.error("Error registering service worker:", error);
      return null;
    }
  };
