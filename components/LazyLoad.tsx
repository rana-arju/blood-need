"use client";

import type React from "react";

import { useEffect, useState, useRef } from "react";

interface LazyLoadProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  placeholder?: React.ReactNode;
}

export default function LazyLoad({
  children,
  threshold = 0.1,
  rootMargin = "200px 0px",
  placeholder = <div className="animate-pulse bg-muted h-40 rounded-md" />,
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (isVisible) {
      // Add a small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setHasLoaded(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div ref={ref} className="transition-opacity duration-500">
      {isVisible ? (
        <div
          className={`transition-opacity duration-500 ${
            hasLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {children}
        </div>
      ) : (
        placeholder
      )}
    </div>
  );
}
