"use server";
import { revalidateTag } from "next/cache";

export interface IBlog {
  id: string;
  userId: string;
  content: string;
  title: string;
  image?: string;
  tags: string[];
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface BlogFilters {
  searchTerm?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Get all reviews with pagination and filters
export const getAllBlog = async (
  filters?: BlogFilters,
  pagination?: PaginationOptions
): Promise<PaginatedResponse<IBlog>> => {
  try {
    // Build query string from filters and pagination
    const queryParams = new URLSearchParams();

    // Only add searchTerm if it's not empty
    if (filters?.searchTerm && filters.searchTerm.trim() !== "") {
      queryParams.append("searchTerm", filters.searchTerm.trim());
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

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog${queryString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["Blog"],
        },
        cache: "no-store", // Ensure we don't get cached results
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching blog: ${response.status}`);
    }

    const result = await response.json();

    return {
      data: result.data,
      meta: {
        page: result.meta.page,
        limit: result.meta.limit,
        total: result.meta.total,
        totalPages: Math.ceil(result.meta.total / result.meta.limit),
      },
    };
  } catch (error: any) {
    console.error("Error fetching blog:", error);
    throw error;
  }
};

// Get a review by ID
export const getBlogById = async (id: string) => {
    console.log(id);
    
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["Blog"],
        },
        cache: "no-store", // Ensure we don't get cached results
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching blog: ${response.status}`);
    }


    return await response.json();
   
  } catch (error: any) {
    console.error("Error fetching blog:", error);
    throw error;
  }
};

// Create a review
export const createBlog = async (
  data: {  content: string; title: string, image: string, tags: string[] },
  token: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(`Error creating review: ${response.status}`);
    }

    revalidateTag("Blog");
    return response.json();
  } catch (error: any) {
    console.error("Error creating blog:", error);
    throw error;
  }
};

// Update a review
export const updateBlog = async (
 blogId:string,
  data: { content: string, title: string, image: string, tags: string[]},

  token: string
): Promise<IBlog> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${blogId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(`Error updating review: ${response.status}`);
    }

    revalidateTag("Blog");

    return response.json();
  } catch (error: any) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

// Delete a review
export const deleteBlog = async (
  blogId: string,
  token: string
): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/${blogId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error deleting review: ${response.status}`);
    }

    revalidateTag("Blog");
    return response.json();
  } catch (error: any) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};
