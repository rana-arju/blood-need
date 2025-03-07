"use server";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import axios from "axios";
/*
export const getAllDonors = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blood-donor`, {
      next: {
        tags: ["Donor"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
}; */
interface DonorResponse {
  success: boolean;
  data: any[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export const getAllDonors = async (params: Record<string, any>) => {
  try {
    // Format the parameters for the backend
    const queryParams = new URLSearchParams();

    // Add search term
    if (params.searchTerm) {
      queryParams.append("searchTerm", params.searchTerm);
    }

    // Add blood type filter
    if (params.blood && params.blood !== "all") {
      queryParams.append("blood", params.blood);
    }

    // Add location filters
    if (params.division) {
      queryParams.append("division", params.division);
    }

    if (params.district) {
      queryParams.append("district", params.district);
    }

    if (params.upazila) {
      queryParams.append("upazila", params.upazila);
    }

    // Add gender filter
    if (params.gender && params.gender !== "all") {
      queryParams.append("gender", params.gender);
    }

    // Add date filters
    if (params.lastDonationDate) {
      queryParams.append("lastDonationDate", params.lastDonationDate);
    }

    if (params.eligibleOnly) {
      // Calculate date 3 months ago for eligibility
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      queryParams.append(
        "eligibleToDonateSince",
        threeMonthsAgo.toISOString().split("T")[0]
      );
    }

    // Add pagination
    queryParams.append("page", params.page?.toString() || "1");
    queryParams.append("limit", params.limit?.toString() || "10");

    // Add sorting
    queryParams.append("sortBy", params.sortBy || "createdAt");
    queryParams.append("sortOrder", params.sortOrder || "desc");

    const response = await axios.get(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/blood-donor?${queryParams.toString()}`
    );

    return {
      donors: response.data.data,
      totalPages: Math.ceil(
        response.data.meta.total / response.data.meta.limit
      ),
      currentPage: response.data.meta.page,
      total: response.data.meta.total,
    };
  } catch (error) {
    console.error("Error fetching donors:", error);
    throw error;
  }
};
export const donorAdd = async (data: any, token: string) => {

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/blood-donor`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    revalidateTag("Donor");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
export const donorUpdate = async (data: any, donorId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/blood-donor/${donorId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(data),
      }
    );
    revalidateTag("Donor");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
export const getSingleDonor = async (donorId: string): Promise<any> => {
  try {
  
     const response = await axios.get(
       `${process.env.NEXT_PUBLIC_BACKEND_URL}/blood-donor/${donorId}`
     );
     return response.data.data;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteDonor = async (donorId: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blood-donor/${donorId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("Donor");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
