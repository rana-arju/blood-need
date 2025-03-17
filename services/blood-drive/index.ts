import axios from "axios";
import type { IBloodDrive, IBloodDriveFilters } from "@/types/blood-drive";
import { revalidateTag } from "next/cache";

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1";

// Get all blood drives with optional pagination and filters
export const getAllBloodDrives = async (
  page = 1,
  limit = 10,
  filters?: IBloodDriveFilters
) => {
  try {
    let url = `${API_URL}/blood-drives?page=${page}&limit=${limit}`;

    if (filters?.searchTerm) {
      url += `&searchTerm=${filters.searchTerm}`;
    }

    if (filters?.organizer) {
      url += `&organizer=${filters.organizer}`;
    }

    if (filters?.startDate) {
      url += `&startDate=${filters.startDate.toISOString()}`;
    }

    if (filters?.endDate) {
      url += `&endDate=${filters.endDate.toISOString()}`;
    }

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching blood drives:", error);
    throw error;
  }
};

// Get upcoming blood drives
export const getUpcomingBloodDrives = async (limit = 6) => {
  try {
    const currentDate = new Date().toISOString();
    const url = `${API_URL}/blood-drives?page=1&limit=${limit}&startDate=${currentDate}&sortBy=date&sortOrder=asc`;

    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching upcoming blood drives:", error);
    throw error;
  }
};

// Get a single blood drive by ID
export const getBloodDriveById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/blood-drives/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching blood drive with ID ${id}:`, error);
    throw error;
  }
};

// Create a new blood drive
export const createBloodDrive = async (
  bloodDriveData: Partial<IBloodDrive>,
  userId: string
) => {
  try {
    const data = {
      ...bloodDriveData,
      user: { connect: { id: userId } },
    };

    const response = await fetch(`${API_URL}/blood-drives`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userId}`,
      },
      body: JSON.stringify(data),
    });
    //revalidateTag("BloodDrive");
    return response.json();
  } catch (error) {
    console.error("Error creating blood drive:", error);
    throw error;
  }
};

// Update an existing blood drive
export const updateBloodDrive = async (
  id: string,
  bloodDriveData: Partial<IBloodDrive>
) => {
  try {
    const response = await axios.patch(
      `${API_URL}/blood-drives/${id}`,
      bloodDriveData
    );
    return response.data.data;
  } catch (error) {
    console.error(`Error updating blood drive with ID ${id}:`, error);
    throw error;
  }
};

// Delete a blood drive
export const deleteBloodDrive = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/blood-drives/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.error(`Error deleting blood drive with ID ${id}:`, error);
    throw error;
  }
};
