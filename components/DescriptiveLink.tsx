"use client";

import Link from "next/link";
import type { ReactNode } from "react";

interface DescriptiveLinkProps {
  href: string;
  children: ReactNode;
  ariaLabel?: string;
  className?: string;
  onClick?: () => void;
}

export default function DescriptiveLink({
  href,
  children,
  ariaLabel,
  className,
  onClick,
}: DescriptiveLinkProps) {
  // Extract the path without domain
  const path = href.startsWith("http") ? href : href.split("?")[0];

  // Generate descriptive aria-label if not provided
  const descriptiveLabel =
    ariaLabel ||
    (typeof children === "string"
      ? children
      : `Navigate to ${path.replace(/\//g, " ").trim()}`);

  return (
    <Link
      href={href}
      aria-label={descriptiveLabel}
      className={className}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
