"use server";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import axios from "axios";
/*
export const getAllRequest = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blood-donor`, {
      next: {
        tags: ["Request"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
*/
export interface BloodRequest {
  id: string;
  userId: string;
  patientName: string;
  blood: string;
  hospitalName: string;
  contactNumber: string;
  whatsappNumber?: string;
  bloodAmount: number;
  division: string;
  district: string;
  upazila: string;
  address?: string;
  requiredDate: Date | string;
  requireTime: Date | string;
  hemoglobin?: number;
  patientProblem?: string;
  //status?: "pending" | "fulfilled" | "cancelled";
  createdAt?: Date | string;
  updatedAt?: Date | string;
  user?: {
    id: string;
    name: string;
    image?: string;
  };
}

export interface BloodRequestFilters {
  search?: string;
  blood?: string;
  division?: string;
  district?: string;
  upazila?: string;
  requiredDateStart?: string;
  requiredDateEnd?: string;
  createdAtStart?: string;
  createdAtEnd?: string;
  bloodAmountMin?: number;
  bloodAmountMax?: number;
  hemoglobinMin?: number;
  hemoglobinMax?: number;
  page?: number;
  limit?: number;
}

export interface BloodRequestsResponse {
  success: boolean;
  data: BloodRequest[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface BloodRequestResponse {
  success: boolean;
  data: any[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const getAllBloodRequests = async (params: any) => {
  try {
    const response = await axios.get<BloodRequestResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/blood-requests`,
      { params }
    );
    return {
      requests: response.data.data,
      totalPages: response.data.meta.totalPages,
      currentPage: response.data.meta.page,
      total: response.data.meta.total,
    };
  } catch (error) {
    console.error("Error fetching blood requests:", error);
    throw error;
  }
};
export const getAllMyBloodRequests = async (params: any, userId: string) => {
  try {
    const response = await axios.get<BloodRequestResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/blood-requests/myrequest`,
      {
        params: params, // Pass userId as a query parameter
        headers: {
          Authorization: `Bearer ${userId}`, // Set the authorization token
        },
      }
    );
    return {
      requests: response.data.data,
      totalPages: response.data.meta.totalPages,
      currentPage: response.data.meta.page,
      total: response.data.meta.total,
    };
  } catch (error) {
    console.error("Error fetching blood requests:", error);
    throw error;
  }
};

export const getBloodRequestById = async (id: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/blood-requests/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching blood request details:", error);
    throw error;
  }
};

export const bloodRequest = async (data: any, token: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/blood-requests`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    revalidateTag("Request");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// Update blood request
export const updateBloodRequest = async (
  id: string,
  data: Partial<BloodRequest>,
  token: string
): Promise<{ data: BloodRequest }> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/blood-requests/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      throw new Error(`Error updating blood request: ${res.status}`);
    }

    revalidateTag("blood-requests");
    revalidateTag(`blood-request-${id}`);

    return await res.json();
  } catch (error: any) {
    console.error("Error updating blood request:", error);
    throw error;
  }
};

// Delete blood request
export const deleteBloodRequest = async (
  id: string,
  token: string
): Promise<{ data: BloodRequest }> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/blood-requests/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Error deleting blood request: ${res.status}`);
    }

    revalidateTag("blood-requests");

    return await res.json();
  } catch (error: any) {
    console.error("Error deleting blood request:", error);
    throw error;
  }
};
// Show interest in a blood request
export const showInterest = async (requestId: string): Promise<{ success: boolean }> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blood-requests/${requestId}/interest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!res.ok) {
      throw new Error(`Error showing interest: ${res.status}`)
    }

    revalidateTag(`blood-request-${requestId}`)
    return await res.json()
  } catch (error: any) {
    console.error("Error showing interest:", error)
    throw error
  }
}

// Cancel interest in a blood request
export const cancelInterest = async (requestId: string, userId: string): Promise<{ success: boolean }> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/donations/blood-requests/${requestId}/interest`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userId}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Error cancelling interest: ${res.status}`)
    }

    revalidateTag(`blood-request-${requestId}`)
    return await res.json()
  } catch (error: any) {
    console.error("Error cancelling interest:", error)
    throw error
  }
}
// Get interested donor details
export const getInterestedDonorDetails = async (requestId: string, userId: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/donations/blood-requests/${requestId}/donors/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userId}`,
        },
        next: {
          tags: [`blood-request-donor-${requestId}-${userId}`],
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`Error fetching donor details: ${res.status}`)
    }

    return  res.json()
  } catch (error: any) {
    console.error("Error fetching donor details:", error)
    throw error
  }
}
// Update interested donor status
export const updateDonorStatus = async (
  requestId: string,
  userId: string,
  status: "pending" | "selected" | "confirmed" | "cancelled",
): Promise<{ success: boolean }> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/donations/blood-requests/${requestId}/donors/${userId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userId}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    if (!res.ok) {
      throw new Error(`Error updating donor status: ${res.status}`)
    }

    // Revalidate both the blood request and the donor details
    revalidateTag(`blood-request-${requestId}`)
    revalidateTag(`blood-request-donor-${requestId}-${userId}`)
    return await res.json()
  } catch (error: any) {
    console.error("Error updating donor status:", error)
    throw error
  }
}

