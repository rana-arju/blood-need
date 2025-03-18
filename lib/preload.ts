// Preload critical resources
export function preloadCriticalResources() {
  if (typeof window === "undefined") return;

  // Preload critical fonts
  const fontUrls = [
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
  ];

  fontUrls.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "style";
    link.href = url;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);

    // Also add the stylesheet
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = url;
    stylesheet.crossOrigin = "anonymous";
    document.head.appendChild(stylesheet);
  });

  // Preload critical scripts
  const scriptUrls: string[] = [];

  scriptUrls.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "script";
    link.href = url;
    document.head.appendChild(link);
  });
}
