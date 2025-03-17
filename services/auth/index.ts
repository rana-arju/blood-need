"use server";

import { signIn } from "next-auth/react";
import { revalidateTag } from "next/cache";
export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "superadmin" | "volunteer";
  status: "active" | "blocked";
  password?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface UserFilters {
  searchTerm?: string;
  blood?: string;
}

export interface PaginatedResponse<T> {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T[];
}
// Delete a user
export const deleteUser = async (
  userId: string,
  token: string
): Promise<User> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Error deleting user: ${res.status}`);
    }

    revalidateTag("Users");
    return res.json();
  } catch (error: any) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Update user role
export const updateUserRole = async (
  userId: string,
  role: string,
  token: string
): Promise<User> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
      }
    );

    if (!res.ok) {
      throw new Error(`Error updating user role: ${res.status}`);
    }

    revalidateTag("Users");
    return res.json();
  } catch (error: any) {
    console.error("Error updating user role:", error);
    throw error;
  }
};

// Update user status
export const updateUserStatus = async (
  userId: string,
  status: "active" | "blocked",
  token: string
): Promise<User> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    if (!res.ok) {
      throw new Error(`Error updating user status: ${res.status}`);
    }

    revalidateTag("Users");
    return res.json();
  } catch (error: any) {
    console.error("Error updating user status:", error);
    throw error;
  }
};

// Set user password (admin only)
export const setUserPassword = async (
  userId: string,
  password: string,
)=> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/password/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userId}`,
        },
        body: JSON.stringify({ password }),
      }
    );

    if (!res.ok) {
      throw new Error(`Error setting user password: ${res.status}`);
    }

    revalidateTag("Users");
    return res.json();
  } catch (error: any) {
    console.error("Error setting user password:", error);
    throw error;
  }
};

// Update user details
export const updateUser = async (
  userData: Partial<User>,
  userId: string
) => {
  try {
    // Create a new object without the id field to avoid Prisma error
    const { id, createdAt, updatedAt, ...dataToUpdate } = userData;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userId}`,
        },
        body: JSON.stringify(dataToUpdate),
      }
    );

    if (!res.ok) {
      throw new Error(`Error updating user: ${res.status}`);
    }

    revalidateTag("Users");
    return res.json();
  } catch (error: any) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const createUser = async (data: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (res?.ok) {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (!result?.ok) {
        return Error();
      }
    }
    revalidateTag("Users");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getMyProfile = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${id}`, // Pass JWT token or other headers here
        },
        next: {
          tags: ["Users"],
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
export const getUserById = async (id: string,token:string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass JWT token or other headers here
        },
        next: {
          tags: ["Users"],
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
export const getAllUsers = async (
  token: string,
  filters?: UserFilters,
  pagination?: PaginationOptions
): Promise<PaginatedResponse<User>> => {
  try {
    // Build query string from filters and pagination
    const queryParams = new URLSearchParams();

    // Only add searchTerm if it's not empty
    if (filters?.searchTerm && filters.searchTerm.trim() !== "") {
      queryParams.append("searchTerm", filters.searchTerm.trim());
    }

    if (filters?.blood) {
      queryParams.append("blood", filters.blood);
    }

    if (pagination?.page) {
      queryParams.append("page", pagination.page.toString());
    }

    if (pagination?.limit) {
      queryParams.append("limit", pagination.limit.toString());
    }

    if (pagination?.sortBy) {
      queryParams.append("sortBy", pagination.sortBy);
    }

    if (pagination?.sortOrder) {
      queryParams.append("sortOrder", pagination.sortOrder);
    }

    const queryString = queryParams.toString()
      ? `?${queryParams.toString()}`
      : "";



    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/users${queryString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ["Users"],
        },
        cache: "no-store", // Ensure we don't get cached results
      }
    );

    if (!res.ok) {
      throw new Error(`Error fetching users: ${res.status}`);
    }

    return res.json();
  } catch (error: any) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
