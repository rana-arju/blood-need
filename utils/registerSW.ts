if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/custom-sw.js", { scope: "/" })
      .then((registration) => {
        console.log("Service Worker registered:", registration.scope);
      })
      .catch((err) => {
        console.log("Service Worker registration failed:", err);
      });
  });
}
