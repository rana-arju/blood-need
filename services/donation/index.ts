"use server";

import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { revalidateTag } from "next/cache";

export interface User {
  id: string;
  name: string;
  image: string | null;
  blood: string | null;
  email: string;
}

export interface BloodRequest {
  id: string;
  userId: string;
  patientName: string;
  blood: string;
  hospitalName: string;
  contactNumber: string;
  whatsappNumber: string | null;
  bloodAmount: number;
  division: string;
  district: string;
  upazila: string;
  address: string;
  requiredDate: Date;
  requireTime: Date;
  hemoglobin?: number | null;
  patientProblem?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Donation {
  id: string;
  userId: string;
  bloodRequestId: string;
  status: "completed" | "pending" | "cancelled";
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  bloodRequest: BloodRequest;
}

export interface DonationResponse {
  donationOffers: Donation[];
  total: number;
}

export interface GetDonationsParams {
  page?: number;
  limit?: number;
  status?: string;
  bloodRequestId?: string;
  userId?: string;
}

export const getUserDonations = async (
  params: GetDonationsParams = {},
  userId: string,
  requestId: string
) => {
  try {
    const { page = 1, limit = 10, status, bloodRequestId } = params;

    // Build query parameters
    const queryParams = new URLSearchParams();
    queryParams.append("page", page.toString());
    queryParams.append("limit", limit.toString());
    if (status) queryParams.append("status", status);
    if (bloodRequestId) queryParams.append("bloodRequestId", bloodRequestId);

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/donations/${requestId}?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      }
    );

    return response.json();
  } catch (error: any) {
    console.error("Error fetching donations:", error);
    throw new Error(error.message || "Failed to fetch donations");
  }
};
export const getMyDonationOffers = async (userId: string, requestId: string) => {
   try {
     const response = await fetch(
       `${process.env.NEXT_PUBLIC_BACKEND_URL}/donations/${requestId}`,
       {
         method: "GET",
         headers: {
           Authorization: `Bearer ${userId}`,
           "Content-Type": "application/json",
         },
       }
     );

     return response.json();
   } catch (error: any) {
     console.error(`Error fetching donation ${requestId}:`, error);
     throw new Error(error.message || "Failed to fetch donation");
   }
};
export const getMyDonation = async (userId: string) => {
   try {
     const response = await fetch(
       `${process.env.NEXT_PUBLIC_BACKEND_URL}/donations/my-donation`,
       {
         method: "GET",
         headers: {
           Authorization: `Bearer ${userId}`,
           "Content-Type": "application/json",
         },
       }
     );

     return response.json();
   } catch (error: any) {
     console.error(`Error fetching donation`, error);
     throw new Error(error.message || "Failed to fetch donation");
   }
};
export const getDonationById = async (id: string, request: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/donations/${request}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${id}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.json();
  } catch (error: any) {
    console.error(`Error fetching donation ${id}:`, error);
    throw new Error(error.message || "Failed to fetch donation");
  }
};

export const getDonationStats = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("Authentication required");
    }
    const { user } = session;

    if (!user) {
      throw new Error("Authentication required");
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/donations/stats`,
      {
        headers: {
          Authorization: `Bearer ${user.id}`,
        },
      }
    );

    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching donation stats:", error);
  }
};
export const createNewDonation = async (data: any) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/donations`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${data?.userId}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bloodRequestId: data.requestId,
          userId: data.userId,
        }),
      }
    );

    revalidateTag("Donation");

    return response.json();
  } catch (error: any) {
    console.error("Error adding health record:", error);
    throw new Error(error.message || "Failed to add health record");
  }
};
export const singleDonation =async(userId:string, id:string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/donations/single/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userId}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.json();
  } catch (error: any) {
    console.error(`Error fetching donation ${id}:`, error);
    throw new Error(error.message || "Failed to fetch donation");
  }

}