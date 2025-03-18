"use client";

import type React from "react";

import { useEffect, useState } from "react";

interface DeferredContentProps {
  children: React.ReactNode;
  delay?: number;
  placeholder?: React.ReactNode;
}

export default function DeferredContent({
  children,
  delay = 1000,
  placeholder = <div className="animate-pulse bg-muted h-20 rounded-md" />,
}: DeferredContentProps) {
  const [isClient, setIsClient] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Use requestIdleCallback if available, otherwise setTimeout
    const renderContent = () => setShouldRender(true);

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(renderContent, { timeout: delay });
      return () => window.cancelIdleCallback(id);
    } else {
      const id = setTimeout(renderContent, delay);
      return () => clearTimeout(id);
    }
  }, [delay]);

  // Server-side or initial client render
  if (!isClient) return placeholder;

  // After delay on client
  return shouldRender ? children : placeholder;
}
