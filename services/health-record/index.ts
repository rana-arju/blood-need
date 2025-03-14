"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

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

export const getUserHealthRecords = async () => {
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/health-records`,
      {
        headers: {
          Authorization: `Bearer ${user.id}`,
        },
    
      }
    );

    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching health records:", error);
    throw new Error(error.message || "Failed to fetch health records");
  }
};

export const addHealthRecord = async (
  data: Omit<HealthRecord, "id" | "userId" | "createdAt" | "updatedAt">
) => {
  try {
   const session = await getServerSession(authOptions);
   if (!session) {
     throw new Error("Authentication required");
   }
   const { user } = session;

   if (!user) {
     throw new Error("Authentication required");
   }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/health-records`,
      data,
      {
        headers: {
          Authorization: `Bearer ${user.id}`,
          "Content-Type": "application/json",
        },
      }
    );

    revalidateTag("HealthRecords");
    return response.data.data;
  } catch (error: any) {
    console.error("Error adding health record:", error);
    throw new Error(error.message || "Failed to add health record");
  }
};

export const updateHealthRecord = async (
  id: string,
  data: Partial<Omit<HealthRecord, "id" | "userId" | "createdAt" | "updatedAt">>
) => {
  try {
   const session = await getServerSession(authOptions);
   if (!session) {
     throw new Error("Authentication required");
   }
   const { user } = session;

   if (!user) {
     throw new Error("Authentication required");
   }

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/health-records/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${user.id}`,
          "Content-Type": "application/json",
        },
      }
    );

    revalidateTag("HealthRecords");
    return response.data.data;
  } catch (error: any) {
    console.error("Error updating health record:", error);
    throw new Error(error.message || "Failed to update health record");
  }
};

export const deleteHealthRecord = async (id: string) => {
  try {
    const session = await getServerSession(authOptions);
     if (!session) {
       throw new Error("Authentication required");
     }
     const {user} = session;
 
     if (!user) {
       throw new Error("Authentication required");
     }

    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/health-records/${id}`,
      {
        headers: {
          Authorization: `Bearer ${user.id}`,
        },
      }
    );

    revalidateTag("HealthRecords");
    return response.data.data;
  } catch (error: any) {
    console.error("Error deleting health record:", error);
    throw new Error(error.message || "Failed to delete health record");
  }
};
