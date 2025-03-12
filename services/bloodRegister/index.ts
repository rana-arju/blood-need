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
  console.log(JSON.stringify(data));

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
export const donorUpdate = async (data: any, userId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/blood-requests/${userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
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
export const getSingleDonor = async (donorId: string): Promise<any> => {
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
    revalidateTag("Request");
    return res.json();
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
  token: string,
): Promise<{ data: BloodRequest }> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blood-requests/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      throw new Error(`Error updating blood request: ${res.status}`)
    }

    revalidateTag("blood-requests")
    revalidateTag(`blood-request-${id}`)

    return await res.json()
  } catch (error: any) {
    console.error("Error updating blood request:", error)
    throw error
  }
}

// Delete blood request
export const deleteBloodRequest = async (id: string, token: string): Promise<{ data: BloodRequest }> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blood-requests/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      throw new Error(`Error deleting blood request: ${res.status}`)
    }

    revalidateTag("blood-requests")

    return await res.json()
  } catch (error: any) {
    console.error("Error deleting blood request:", error)
    throw error
  }
}
