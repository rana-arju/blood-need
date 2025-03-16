"use server";
import { format, addMonths, subMonths } from "date-fns";

// Types for dashboard data
export interface DashboardStats {
  totalDonations: number;
  livesSaved: number;
  nextEligibleDate: string | null;
  donorRank: string;
  lastDonationDate: string | null;
}

export interface DonationChartData {
  month: string;
  donations: number;
}

export interface HealthChartData {
  date: string;
  hemoglobin: number;
}

export interface ImpactData {
  name: string;
  value: number;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  type: "donation" | "checkup" | "other";
}

export interface RecentActivity {
  id: string;
  type: "donation" | "achievement" | "request";
  date: string;
  description: string;
}

export interface DashboardData {
  stats: DashboardStats;
  donationChartData: DonationChartData[];
  healthChartData: HealthChartData[];
  impactData: ImpactData[];
  upcomingEvents: UpcomingEvent[];
  recentActivity: RecentActivity[];
}

// Get all dashboard data for a user
export const getUserDashboardData = async (
  userId: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userId}`,
        },
        next: {
          tags: ["dashboard"],
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching dashboard data: ${response.status}`);
    }

    return  response.json();
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    // Return fallback data if API fails
    //return generateFallbackDashboardData(userId);
  }
};

// Generate fallback data if API fails
const generateFallbackDashboardData = (userId: string): DashboardData => {
  const currentDate = new Date();

  // Generate last 6 months for donation chart
  const donationChartData: DonationChartData[] = [];
  for (let i = 5; i >= 0; i--) {
    const monthDate = subMonths(currentDate, i);
    donationChartData.push({
      month: format(monthDate, "MMM"),
      donations: Math.random() > 0.6 ? 1 : 0,
    });
  }

  // Generate last 6 months for health chart
  const healthChartData: HealthChartData[] = [];
  for (let i = 5; i >= 0; i--) {
    const monthDate = subMonths(currentDate, i);
    healthChartData.push({
      date: format(monthDate, "MMM"),
      hemoglobin: 13 + Math.random() * 2, // Random between 13-15
    });
  }

  return {
    stats: {
      totalDonations: 0,
      livesSaved: 0,
      nextEligibleDate: null, // Eligible now
      donorRank: "First Time",
      lastDonationDate: format(subMonths(currentDate, 1), "yyyy-MM-dd"),
    },
    donationChartData,
    healthChartData,
    impactData: [
      { name: "Lives Saved", value: 0 },
      { name: "Potential", value: 0 },
    ],
    upcomingEvents: [
      {
        id: "1",
        title: "Blood Drive",
        date: format(addMonths(currentDate, 1), "yyyy-MM-dd"),
        location: "City Hospital",
        type: "donation",
      },
      {
        id: "2",
        title: "Health Checkup",
        date: format(addMonths(currentDate, 2), "yyyy-MM-dd"),
        location: "Medical Center",
        type: "checkup",
      },
    ],
    recentActivity: [
      {
        id: "1",
        type: "donation",
        date: format(subMonths(currentDate, 1), "yyyy-MM-dd"),
        description: "You completed a blood donation",
      },
      {
        id: "2",
        type: "achievement",
        date: format(subMonths(currentDate, 1), "yyyy-MM-dd"),
        description: "You unlocked the Regular Donor badge",
      },
      {
        id: "3",
        type: "request",
        date: format(subMonths(currentDate, 2), "yyyy-MM-dd"),
        description: "Your blood request was fulfilled",
      },
    ],
  };
};
