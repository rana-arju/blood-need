import createNextIntlPlugin from "next-intl/plugin";
import withPWA from "next-pwa";

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
    // Enable image optimization for all sources
    unoptimized: false,
    // domains: ["*", "lh3.googleusercontent.com", "res.cloudinary.com"],

    // Add supported domains for external images (example, modify with your actual domains)
    deviceSizes: [320, 420, 768, 1024, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
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
  },
  async rewrites() {
    return [
      {
        source: "/:locale/icons/:path*",
        destination: "/icons/:path*",
      },
      {
        source: "/:locale/manifest.json",
        destination: "/manifest.json",
      },
      {
        source: "/:locale/screenshots/:path*",
        destination: "/screenshots/:path*",
      },
      {
        source: "/:locale/leaflet/:path*",
        destination: "/leaflet/:path*",
      },
      {
        source: "/custom-sw.js",
        destination: "/custom-sw.js",
      },
    ];
  },
};

const withPWAConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  sw: "/custom-sw.js",
});

// Combine configurations
const combinedConfig = withPWAConfig(withNextIntl(nextConfig));

export default combinedConfig;
