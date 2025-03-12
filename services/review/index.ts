"use server";
import { revalidateTag } from "next/cache";

export interface Review {
  id: string;
  userId: string;
  comment: string;
  rating: number;
  user?: {
    id: string;
    name: string;
    email: string;
    image?: string;
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

export interface ReviewFilters {
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
export const getAllReviews = async (
  filters?: ReviewFilters,
  pagination?: PaginationOptions
): Promise<PaginatedResponse<Review>> => {
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews${queryString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["Reviews"],
        },
        cache: "no-store", // Ensure we don't get cached results
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching reviews: ${response.status}`);
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
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

// Get a review by ID
export const getReviewById = async (reviewId: string): Promise<Review> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/${reviewId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["Reviews"],
        },
        cache: "no-store", // Ensure we don't get cached results
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching review: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error: any) {
    console.error("Error fetching review:", error);
    throw error;
  }
};

// Create a review
export const createReview = async (
  data: { userId: string; comment: string; rating: number },
  token: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews`,
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

    revalidateTag("Reviews");
    return response.json();
  } catch (error: any) {
    console.error("Error creating review:", error);
    throw error;
  }
};

// Update a review
export const updateReview = async (
  reviewId: string,
  data: { comment: string },
  token: string
): Promise<Review> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/${reviewId}`,
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

    revalidateTag("Reviews");

    return response.json();
  } catch (error: any) {
    console.error("Error updating review:", error);
    throw error;
  }
};

// Delete a review
export const deleteReview = async (
  reviewId: string,
  token: string
): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/${reviewId}`,
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

    revalidateTag("Reviews");
    return response.json();
  } catch (error: any) {
    console.error("Error deleting review:", error);
    throw error;
  }
};
