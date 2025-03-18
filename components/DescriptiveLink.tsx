import Link from "next/link";
import type { ReactNode } from "react";

interface DescriptiveLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  title?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
}

export function DescriptiveLink({
  href,
  children,
  className = "",
  ariaLabel,
  title,
  target,
  rel = target === "_blank" ? "noopener noreferrer" : undefined,
}: DescriptiveLinkProps) {
  // Ensure links have descriptive text for accessibility and SEO
  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      title={title}
      target={target}
      rel={rel}
    >
      {children}
    </Link>
  );
}
