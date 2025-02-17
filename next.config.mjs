import createNextIntlPlugin from "next-intl/plugin";
import NextPWA from "next-pwa";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
};

let userConfig;
try {
  userConfig = await import("./v0-user-next.config");
} catch (e) {
  console.warn("Warning: No user config found, using default settings.");
}
function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) return nextConfig;

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === "object" &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      };
    } else {
      nextConfig[key] = userConfig[key];
    }
  }

  return nextConfig;
}

const mergedConfig = mergeConfig(nextConfig, userConfig?.default);
const withPWA = NextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
  cacheOnFrontEndNav: true,
  runtimeCaching: [
    {
      urlPattern: /^\/$/, // Homepage caching
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "html-cache",
        expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 }, // 1 day
      },
    },
    {
      urlPattern: /^\/(about|contact|donors|faq|awareness|privacy)/, // Cache these pages for offline
      handler: "CacheFirst",
      options: {
        cacheName: "pages-cache",
        expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 3 },
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts",
        expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
      },
    },
    {
      urlPattern: /^https:\/\/blood-need\.vercel\.app\/.*/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "api-cache",
        networkTimeoutSeconds: 10,
        expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 },
      },
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "image-cache",
        expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
      },
    },
    {
      urlPattern: /\.(?:js|css|html)$/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-resources",
      },
    },
  ],
});
// Apply both withNextIntl and withPWA
export default withPWA(withNextIntl(nextConfig));
