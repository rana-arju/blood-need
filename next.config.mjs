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
    ];
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
  disable: process.env.NODE_ENV === "development",
  cacheOnFrontEndNav: true,
  swSrc: "./public/custom-sw.js", // 🔥 Add Custom Service Worker
});

export default withPWA(withNextIntl(mergedConfig));
