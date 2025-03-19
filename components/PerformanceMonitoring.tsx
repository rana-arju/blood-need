"use client";

import { useEffect } from "react";
import { onCLS, onFID, onLCP, onFCP, onTTFB, Metric } from "web-vitals";

const reportWebVitals = ({ name, delta, id, value }: Metric) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`Web Vital: ${name}`, { delta, id, value });
  }

  if (process.env.NODE_ENV === "production" && typeof window !== "undefined") {
    const url = "/api/vitals";
    const body = JSON.stringify({
      name,
      delta,
      id,
      value,
      page: window?.location?.pathname || "",
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, body);
    } else {
      fetch(url, {
        body,
        method: "POST",
        keepalive: true,
        headers: { "Content-Type": "application/json" },
      }).catch((err) => console.error("Web vitals error:", err));
    }
  }
};

export default function PerformanceMonitoring() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      onCLS(reportWebVitals);
      onFID(reportWebVitals);
      onLCP(reportWebVitals);
      onFCP(reportWebVitals);
      onTTFB(reportWebVitals);
    }
  }, []);

  return null;
}
