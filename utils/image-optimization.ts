// Helper functions for image optimization
export function getOptimizedImageUrl(
  url: string,
  width?: number,
  quality?: number
): string {
  // If it's already a Cloudinary URL, add optimization parameters
  if (url.includes("cloudinary.com")) {
    const baseUrl = url.split("/upload/")[0] + "/upload/";
    const imagePath = url.split("/upload/")[1];

    // Add optimization parameters
    const params = [
      "f_auto", // Auto format
      "q_auto:good", // Auto quality
      width ? `w_${width}` : "",
      quality ? `q_${quality}` : "",
    ]
      .filter(Boolean)
      .join(",");

    return `${baseUrl}${params}/${imagePath}`;
  }

  // For placeholder images, add width and height
  if (url.includes("/placeholder.svg")) {
    const hasParams = url.includes("?");
    if (hasParams) {
      return url;
    }
    return `${url}?height=${width || 400}&width=${width || 400}`;
  }

  // Return original URL for other cases
  return url;
}

// Function to generate responsive image srcSet
export function generateSrcSet(
  url: string,
  sizes: number[] = [320, 640, 768, 1024, 1280]
): string {
  if (!url) return "";

  return sizes
    .map((size) => `${getOptimizedImageUrl(url, size)} ${size}w`)
    .join(", ");
}

// Function to preload critical images
export function preloadCriticalImages(images: string[]): void {
  if (typeof window === "undefined") return;

  images.forEach((image) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = getOptimizedImageUrl(image);
    document.head.appendChild(link);
  });
}
