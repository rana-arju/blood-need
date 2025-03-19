// Utility functions for optimizing donor page performance

/**
 * Optimizes image loading for donor profile images
 * @param imageUrl The original image URL
 * @param width Desired width
 * @param height Desired height
 * @returns Optimized image URL
 */
export function optimizeDonorImage(
  imageUrl: string,
  width = 80,
  height = 80
): string {
  if (!imageUrl) return "";

  // If already using Cloudinary, add optimization parameters
  if (imageUrl.includes("cloudinary.com")) {
    // Extract base URL and add optimization parameters
    const baseUrl = imageUrl.split("/upload/")[0] + "/upload/";
    const imagePath = imageUrl.split("/upload/")[1];
    return `${baseUrl}c_fill,w_${width},h_${height},q_auto,f_auto/${imagePath}`;
  }

  // Return original URL for non-Cloudinary images
  return imageUrl;
}

/**
 * Defers non-critical donor data loading
 * @param donorId Donor ID
 * @returns Promise with donor details
 */
export function deferDonorDetailsLoading(donorId: string): Promise<any> {
  return new Promise((resolve) => {
    // Use requestIdleCallback for non-critical data loading
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      (window as any).requestIdleCallback(() => {
        fetch(`/api/donors/${donorId}/details`)
          .then((res) => res.json())
          .then((data) => resolve(data))
          .catch(() => resolve(null));
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        fetch(`/api/donors/${donorId}/details`)
          .then((res) => res.json())
          .then((data) => resolve(data))
          .catch(() => resolve(null));
      }, 200);
    }
  });
}

/**
 * Preloads donor data for common filters
 * Improves perceived performance for common search patterns
 */
export function preloadCommonDonorQueries(): void {
  if (typeof window === "undefined") return;

  // Use Intersection Observer to detect when user is near the donor section
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Preload common blood types in the background
        const commonBloodTypes = ["A+", "B+", "O+", "AB+"];
        commonBloodTypes.forEach((bloodType) => {
          fetch(`/api/donors?blood=${bloodType}&limit=4`)
            .then(() => {})
            .catch(() => {});
        });

        // Disconnect after preloading
        observer.disconnect();
      }
    });
  });

  // Observe donor section if it exists
  const donorSection = document.querySelector(".donor-section");
  if (donorSection) {
    observer.observe(donorSection);
  }
}
