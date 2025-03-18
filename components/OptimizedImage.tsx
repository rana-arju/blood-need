import Image from "next/image";
import { getOptimizedImageUrl } from "@/utils/image-optimization";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  quality?: number;
  loading?: "eager" | "lazy";
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  fill = false,
  quality = 80,
  loading = "lazy",
}: OptimizedImageProps) {
  // Optimize the image URL
  const optimizedSrc = getOptimizedImageUrl(src, width, quality);

  // For external images (like Cloudinary), use regular Image with unoptimized
  const isExternal =
    src.startsWith("http") &&
    !src.includes(process.env.NEXT_PUBLIC_APP_URL || "");

  return (
    <Image
      src={optimizedSrc || "/placeholder.svg"}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={className}
      priority={priority}
      sizes={sizes}
      fill={fill}
      quality={quality}
      loading={loading}
      unoptimized={isExternal}
    />
  );
}
