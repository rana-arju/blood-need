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
    unoptimized: true,
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
