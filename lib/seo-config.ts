import type { Metadata, Viewport } from "next";

// Base metadata configuration
export const baseMetadata = {
  title: {
    default: "Blood Donation Community",
    template: "%s | Blood Donation Community",
  },
  description:
    "Connect blood donors with those in need, save lives through our blood donation community platform.",
  keywords: [
    "blood donation",
    "donors",
    "blood requests",
    "save lives",
    "community",
    "blood lagbe",
    "blood chai",
    "rokto lagbe",
    "rokto chai"
  ],
  authors: [{ name: "Mohammad Rana Arju", url: "https://rana-arju.vercel.app" }],
  creator: "Mohammad Rana Arju",
  publisher: "Blood Donation Community",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://bloodneed.com"
  ),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      bn: "/bn",
    },
  },
};

// Base viewport configuration
export const baseViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020817" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Helper function to construct metadata
export function constructMetadata({
  title,
  description,
  keywords = [],
  image = "/og-image.jpg",
  icons = "/favicon.ico",
  noIndex = false,
  openGraph,
  twitter,
  ...rest
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  icons?: string;
  noIndex?: boolean;
  openGraph?: any;
  twitter?: any;
  [key: string]: any;
}): Metadata {
  return {
    ...baseMetadata,
    title: title || baseMetadata.title,
    description: description || baseMetadata.description,
    keywords: [...baseMetadata.keywords, ...keywords],
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
    icons,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "/",
      title: title || baseMetadata.title,
      description: description || baseMetadata.description,
      siteName: "Blood Donation Community",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: title || baseMetadata.title,
      description: description || baseMetadata.description,
      images: [image],
      ...twitter,
    },
    ...rest,
  };
}

// Generate viewport configuration
export function generateViewport(): Viewport {
  return baseViewport;
}
