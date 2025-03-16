"use server";

import { revalidateTag } from "next/cache";
import axios from "axios";

export interface HealthRecord {
  id: string;
  userId: string;
  date: string;
  hemoglobin: number;
  bloodPressure: string;
  weight: number;
  height?: number;
  pulse?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HealthRecordFormData {
  date: string;
  hemoglobin: number;
  bloodPressure: string;
  weight: number;
  height?: number;
  pulse?: number;
  notes?: string;
}

export interface DonorInfo {
  id: string;
  userId: string;
  phone: string;
  whatsappNumber?: string | null;
  facebookId?: string | null;
  emergencyContact: string;
  height?: number | null;
  weight?: number | null;
  medicalCondition?: string | null;
  currentMedications?: string | null;
  createdAt: string;
  updatedAt: string;
}

export const getUserHealthRecords = async (
  token: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/health-records/my-records`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        next: {
          tags: ["HealthRecords"],
        },
      }
    );

    return response.json();
  } catch (error: any) {
    console.error("Error fetching health records:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch health records"
    );
  }
};

export const getHealthRecordById = async (
  id: string,
  token: string
): Promise<HealthRecord> => {
  try {
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/health-records/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        next: {
          tags: [`HealthRecord-${id}`],
        },
      }
    );

    return response.json();
  } catch (error: any) {
    console.error("Error fetching health record:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch health record"
    );
  }
};

export const addHealthRecord = async (
  data: HealthRecordFormData,
  userId: string
): Promise<HealthRecord> => {
  try {
    if (!userId) {
      throw new Error("Authentication token not found");
    }

    const payload = {
      ...data,
      userId,
      date: new Date(data.date),
    };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/health-records`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${userId}`,
          "Content-Type": "application/json",
        },
      }
    );

    revalidateTag("HealthRecords");
    return response.data.data;
  } catch (error: any) {
    console.error("Error adding health record:", error);
    throw new Error(
      error.response?.data?.message || "Failed to add health record"
    );
  }
};

export const updateHealthRecord = async (
  id: string,
  data: HealthRecordFormData,
  token:string
): Promise<HealthRecord> => {
  try {
    if (!id) {
      throw new Error("Authentication token not found");
    }

    const payload = {
      ...data,
      date: new Date(data.date),
    };

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/health-records/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    revalidateTag("HealthRecords");
    revalidateTag(`HealthRecord-${id}`);
    return response.data.data;
  } catch (error: any) {
    console.error("Error updating health record:", error);
    throw new Error(
      error.response?.data?.message || "Failed to update health record"
    );
  }
};

export const deleteHealthRecord = async (
  id: string,
  token: string
): Promise<void> => {
  try {
    if (!token) {
      throw new Error("Authentication token not found");
    }

    await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/health-records/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    revalidateTag("HealthRecords");
    return;
  } catch (error: any) {
    console.error("Error deleting health record:", error);
    throw new Error(
      error.response?.data?.message || "Failed to delete health record"
    );
  }
};
export const getUserDonorInfo = async (donorId: string): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/blood-donor/user/${donorId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["Donor"],
        },
        cache: "no-store", // Ensure we don't get cached results
      }
    );

    if (!response.ok) {
       throw new Error(
         `Error fetching donor: ${response.status}`
       );
    }

    
    return response.json();
  } catch (error: any) {
    console.error("Error fetching donor:", error);
    throw error;
  }
};

