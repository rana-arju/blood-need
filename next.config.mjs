import createNextIntlPlugin from "next-intl/plugin";
import withPWA from "next-pwa";
import withBundleAnalyzer from "@next/bundle-analyzer";
import CompressionPlugin from "compression-webpack-plugin";
const withNextIntl = createNextIntlPlugin();
const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Enable image optimization for all sources
    unoptimized: false,
    // domains: ["*", "lh3.googleusercontent.com", "res.cloudinary.com"],

    // Add supported domains for external images (example, modify with your actual domains)
    deviceSizes: [320, 420, 768, 1024, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 7,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
    optimizeCss: true,

    optimizePackageImports: [
      "lucide-react",
      "date-fns",
      "framer-motion",
      "@radix-ui/react-icons",
    ],
  },
  poweredByHeader: false,
  // Optimize bundle size
  compiler: { removeConsole: process.env.NODE_ENV === "production" },

  // Compress assets
  compress: true,
  // Add headers for security and caching
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/(.*)\\.(jpg|jpeg|png|svg|webp|avif|ico|css|js)", // ✅ Fix regex pattern
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/firebase-messaging-sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Service-Worker-Allowed",
            value: "/",
          },
        ],
      },
      {
        source:
          "/(firebase-messaging-sw|custom-firebase-messaging-sw|custom-sw|sw)\\.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Service-Worker-Allowed",
            value: "/",
          },
        ],
      },
      {
        source: "/workbox-:hash.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

 async rewrites() {
    return [
      // Standard static asset rewrites
      {
        source: "/:locale/icons/:file*",
        destination: "/icons/:file*",
      },
      {
        source: "/:locale/profile.png",
        destination: "/profile.png",
      },
      {
        source: "/:locale/screenshots/:file*",
        destination: "/screenshots/:file*",
      },
      {
        source: "/:locale/leaflet/:file*",
        destination: "/leaflet/:file*",
      },
      { source: "/:locale/manifest.json", destination: "/manifest.json" },

      // Service worker rewrites - critical for Firebase messaging
      {
        source: "/firebase-messaging-sw.js",
        destination: "/firebase-messaging-sw.js",
      },
      {
        source: "/:locale/firebase-messaging-sw.js",
        destination: "/firebase-messaging-sw.js",
      },
      {
        source: "/custom-firebase-messaging-sw.js",
        destination: "/custom-firebase-messaging-sw.js",
      },

      {
        source: "/:locale/custom-firebase-messaging-sw.js",
        destination: "/custom-firebase-messaging-sw.js",
      },
      {
        source: "/:locale/service-worker.js",
        destination: "/service-worker.js",
      },
      {
        source: "/custom-sw.js",
        destination: "/custom-sw.js",
      },
      {
        source: "/:locale/custom-sw.js",
        destination: "/custom-sw.js",
      },
      {
        source: "/registerSW.js",
        destination: "/registerSW.js",
      },
      {
        source: "/:locale/registerSW.js",
        destination: "/registerSW.js",
      },
      {
        source: "/sw.js",
        destination: "/sw.js",
      },
      {
        source: "/:locale/sw.js",
        destination: "/sw.js",
      },
      {
        source: "/workbox-:hash.js",
        destination: "/workbox-:hash.js",
      },
      {
        source: "/:locale/workbox-:hash.js",
        destination: "/workbox-:hash.js",
      },
      {
        source: "/offline.html",
        destination: "/offline.html",
      },
      {
        source: "/:locale/offline.html",
        destination: "/offline.html",
      },

      // PWA related rewrites
      { source: "/:locale/registerSW.js", destination: "/registerSW.js" },
    ];
  },
};


const withPWAConfig = withPWA({
  dest: "public",
  register: false,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",

  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts",
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
        },
      },
    },
    {
      urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "static-font-assets",
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
        },
      },
    },
    {
      urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp|avif)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "static-image-assets",
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
    {
      urlPattern: /\/_next\/image\?url=.+$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "next-image",
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
    {
      urlPattern: /\.(?:js)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "static-js-assets",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
    {
      urlPattern: /\.(?:css)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "static-style-assets",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
    {
      urlPattern: /\/_next\/data\/.+\/.+\.json$/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "next-data",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
    {
      urlPattern: /\/api\/.*$/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "api-cache",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
        networkTimeoutSeconds: 10,
      },
    },
    {
      urlPattern: /.*/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "others",
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
        networkTimeoutSeconds: 10,
      },
    },
  ],
});

// Combine configurations
//const combinedConfig = withPWAConfig(withNextIntl(nextConfig));
const combinedConfig = withAnalyzer(withPWAConfig(withNextIntl(nextConfig)));
export default combinedConfig;
