export function registerServiceWorker() {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      const swUrl ="/custom-sw.js";
      navigator.serviceWorker
        .register(swUrl, { scope: "/" })
        .then((registration) => {
          console.log(
            "ServiceWorker registration successful with scope: ",
            registration.scope
          );

          // Check for updates
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (
                  newWorker.state === "installed" &&
                  navigator.serviceWorker.controller
                ) {
                  console.log("New content is available; please refresh.");
                  // You can show a notification to the user here
                }
              });
            }
          });
        })
        .catch((err) => {
          console.error("ServiceWorker registration failed: ", err);
        });
    });
  }
}
