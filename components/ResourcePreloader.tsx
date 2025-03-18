"use client";

import { useEffect } from "react";

interface ResourcePreloaderProps {
  resources: {
    href: string;
    as: "script" | "style" | "image" | "font" | "fetch";
    type?: string;
    crossOrigin?: "anonymous" | "use-credentials";
  }[];
}

export function ResourcePreloader({ resources }: ResourcePreloaderProps) {
  useEffect(() => {
    resources.forEach((resource) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = resource.href;
      link.as = resource.as;

      if (resource.type) {
        link.type = resource.type;
      }

      if (resource.crossOrigin) {
        link.crossOrigin = resource.crossOrigin;
      }

      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    });
  }, [resources]);

  return null;
}
