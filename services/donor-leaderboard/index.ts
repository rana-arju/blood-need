"use server";

import { revalidateTag } from "next/cache";

export interface TopDonor {
  id: string;
  name: string;
  donations: number;
  blood: string;
  image?: string;
  rank: number;
  createdAt: string;
}

export interface TopDonorsResponse {
  donors: TopDonor[];
}

export async function getTopDonors(limit = 6): Promise<TopDonorsResponse> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/blood-donor/top?limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["TopDonors"],
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Error fetching top donors: ${res.status}`);
    }

    return res.json();
  } catch (error: any) {
    console.error("Error fetching top donors:", error);
    // Return empty array if there's an error
    return { donors: [] };
  }
}

export async function refreshTopDonors() {
  revalidateTag("TopDonors");
}
