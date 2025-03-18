"use client";

import { useEffect, useState } from "react";

interface DeferredStylesProps {
  href: string;
  media?: string;
}

export function DeferredStyles({ href, media = "all" }: DeferredStylesProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Create a link element for the stylesheet
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.media = "print";
    link.onload = () => {
      // Once loaded, change media to apply the styles
      link.media = media;
      setLoaded(true);
    };

    // Append to document
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [href, media]);

  return null;
}
