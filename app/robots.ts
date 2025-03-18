import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://bloodneed.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/admin/",
        "/dashboard/",
        "/auth/",
        "/_next/",
        "/server-sitemap.xml",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
