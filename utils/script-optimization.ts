"use client";

import type React from "react";

import { useEffect, useState } from "react";

// Dynamically load scripts only when needed
export function useDynamicScript(src: string, id: string, defer = true) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if script already exists
    const existingScript = document.getElementById(id) as HTMLScriptElement;

    if (existingScript) {
      setLoaded(true);
      return;
    }

    // Create script element
    const script = document.createElement("script");
    script.src = src;
    script.id = id;
    script.defer = defer;
    script.async = true;

    // Handle script load event
    script.onload = () => {
      setLoaded(true);
    };

    // Append script to document
    document.body.appendChild(script);

    // Clean up
    return () => {
      const scriptToRemove = document.getElementById(id);
      if (scriptToRemove) {
        document.body.removeChild(scriptToRemove);
      }
    };
  }, [src, id, defer]);

  return loaded;
}

// Intersection Observer to load scripts only when element is visible
export function useIntersectionObserver(
  elementRef: React.RefObject<HTMLElement>,
  callback: () => void,
  options = { threshold: 0.1 }
) {
  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
          observer.disconnect();
        }
      });
    }, options);

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, callback, options]);
}
