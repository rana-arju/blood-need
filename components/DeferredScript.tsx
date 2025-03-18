"use client";

import { useState } from "react";

import { useRef } from "react";
import { useIntersectionObserver } from "@/utils/script-optimization";

interface DeferredScriptProps {
  src: string;
  id: string;
}

export function DeferredScript({ src, id }: DeferredScriptProps) {
  const ref = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);

  useIntersectionObserver(ref, () => {
    if (!loaded) {
      const script = document.createElement("script");
      script.src = src;
      script.id = id;
      script.defer = true;
      script.async = true;
      document.body.appendChild(script);
      setLoaded(true);
    }
  });

  return <div ref={ref} className="hidden" />;
}
