"use client"
import { initPerformanceMonitoring } from "@/utils/performance-monitoring";
import { useEffect } from "react";

export function PerformanceMonitoringInitializer() {
  useEffect(() => {
    // Initialize performance monitoring
    initPerformanceMonitoring();
  }, []);

  return null;
}
