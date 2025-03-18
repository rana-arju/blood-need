// Performance monitoring utility
export function reportWebVitals(metric:any) {
  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(metric);
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === "production") {
    const body = JSON.stringify(metric);
    const url = "/api/vitals";

    // Use `navigator.sendBeacon()` if available
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, body);
    } else {
      // Fall back to fetch
      fetch(url, {
        body,
        method: "POST",
        keepalive: true,
      });
    }
  }
}

// Initialize performance monitoring
export function initPerformanceMonitoring() {
  // Report First Input Delay (FID)
  const reportFID = ({ name, delta, id }:any) => {
    reportWebVitals({
      name,
      delta,
      id,
      metric: "FID",
    });
  };

  // Report Largest Contentful Paint (LCP)
  const reportLCP = ({ name, delta, id }:any) => {
    reportWebVitals({
      name,
      delta,
      id,
      metric: "LCP",
    });
  };

  // Report Cumulative Layout Shift (CLS)
  const reportCLS = ({ name, delta, id }:any) => {
    reportWebVitals({
      name,
      delta,
      id,
      metric: "CLS",
    });
  };

  // Add event listeners
  if (typeof window !== "undefined") {
    // Use PerformanceObserver if available
    if ("PerformanceObserver" in window) {
      // FID
      const fidObserver = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry:any) => {
          reportFID({
            name: "FID",
            delta: entry.processingStart - entry.startTime,
            id: entry.identifier,
          });
        });
      });

      fidObserver.observe({ type: "first-input", buffered: true });

      // LCP
      const lcpObserver = new PerformanceObserver((entryList:any) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];

        reportLCP({
          name: "LCP",
          delta: lastEntry.startTime,
          id: lastEntry.id,
        });
      });

      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });

      // CLS
      let clsValue = 0;
      const clsEntries:any = [];

      const clsObserver = new PerformanceObserver((entryList:any) => {
        const entries = entryList.getEntries();

        entries.forEach((entry:any) => {
          // Only count layout shifts without recent user input
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            clsEntries.push(entry);
          }
        });

        reportCLS({
          name: "CLS",
          delta: clsValue,
          id: clsEntries[0]?.id || "",
        });
      });

      clsObserver.observe({ type: "layout-shift", buffered: true });
    }
  }
}
