// This file is loaded via a script tag in the HTML
(() => {
  // Only register in production or if explicitly enabled
  const shouldRegister =
    window.location.hostname !== "localhost" ||
    localStorage.getItem("enable_sw_on_localhost") === "true";

  if ("serviceWorker" in navigator && shouldRegister) {
    // Wait for the page to load
    window.addEventListener("load", () => {
      const swUrl = "/firebase-messaging-sw.js";

      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log(
            "[SW] Registration successful, scope is:",
            registration.scope
          );
          window.swRegistration = registration;

          // Dispatch event that SW is registered
          window.dispatchEvent(
            new CustomEvent("swRegistered", {
              detail: { registration },
            })
          );
        })
        .catch((error) => {
          console.error("[SW] Registration failed:", error);
        });
    });
  } else {
    console.log(
      "[SW] Service workers are not supported or disabled on localhost"
    );
  }
})();
