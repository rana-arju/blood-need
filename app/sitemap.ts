import { getAllDonors } from "@/services/beDonor";
import { getAllBloodDrives } from "@/services/blood-drive";
import { getAllBloodRequests } from "@/services/bloodRegister";
import type { MetadataRoute } from "next";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://bloodneed.com";

  // Define static routes with their last modified date and change frequency
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/bn`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/requests`,
      lastModified: new Date(),
      changeFrequency: "hourly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/donors`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/be-donor`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/request-blood`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/virtual-test`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/why-give-blood`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/donation-impact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/awareness`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  // Get dynamic routes from database
  let bloodRequests:any = [];
  let donors = [];
  let bloodDrives = [];

  try {
    // Fetch all blood requests
    const requests = await getAllBloodRequests({});
    bloodRequests = requests?.requests.map((request:any) => ({
      url: `${baseUrl}/requests/${request.id}`,
      lastModified: new Date(request.updatedAt || request.createdAt),
      changeFrequency: "daily" as const,
      priority: 0.8,
    }));

    // Fetch all donors
    const allDonors = await getAllDonors({});
    donors = allDonors.donors.map((donor:any) => ({
      url: `${baseUrl}/donors/${donor.id}`,
      lastModified: new Date(donor.updatedAt || donor.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    // Fetch all blood drives
    const drives = await getAllBloodDrives();
    bloodDrives = drives.map((drive:any) => ({
      url: `${baseUrl}/blood-drives/${drive.id}`,
      lastModified: new Date(drive.updatedAt || drive.createdAt),
      changeFrequency: "daily" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }

  // Combine all routes
  return [...staticRoutes, ...bloodRequests, ...donors, ...bloodDrives];
}
