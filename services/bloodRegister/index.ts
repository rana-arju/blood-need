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
