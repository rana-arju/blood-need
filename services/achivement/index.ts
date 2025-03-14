import type { IAchievement } from "@/types/achievement.interface";

export const getMyAchievements = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/achievements/my-achievements`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["Achivement"],
        },
        cache: "no-store", // Ensure we don't get cached results
      }
    );
    const result = await response.json;
    return result;
  } catch (error) {
    console.error("Error fetching my achievements:", error);
    throw error;
  }
};

export const getUserAchievements = async (userId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/achievements/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["Achivement"],
        },
        cache: "no-store", // Ensure we don't get cached results
      }
    );
    const result = await response.json;
    return result;
  } catch (error) {
    console.error(`Error fetching achievements for user ${userId}:`, error);
    throw error;
  }
};

export const initializeAchievements = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/achievements/initialize`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["Achivement"],
        },
        cache: "no-store", // Ensure we don't get cached results
      }
    );
    const result = await response.json;
    return result;
  } catch (error) {
    console.error("Error initializing achievements:", error);
    throw error;
  }
};
