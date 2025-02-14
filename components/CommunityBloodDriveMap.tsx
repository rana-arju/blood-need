"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

interface BloodDrive {
  id: string;
  name: string;
  date: string;
  location: string;
  coordinates: [number, number];
}

// Dynamically import MapComponent with no SSR
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full">
      <Skeleton className="h-full w-full" />
    </div>
  ),
});

const mockBloodDrives: BloodDrive[] = [
  {
    id: "1",
    name: "City Hospital Drive",
    date: "2023-07-01",
    location: "123 Main St",
    coordinates: [40.7128, -74.006],
  },
  {
    id: "2",
    name: "Community Center Drive",
    date: "2023-07-15",
    location: "456 Oak Ave",
    coordinates: [40.7282, -73.7949],
  },
  {
    id: "3",
    name: "University Campus Drive",
    date: "2023-07-22",
    location: "789 College Rd",
    coordinates: [40.7489, -73.968],
  },
];

export default function CommunityBloodDriveMap() {
  const [bloodDrives, setBloodDrives] = useState<BloodDrive[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchBloodDrives = async () => {
      try {
        // In a real application, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
        setBloodDrives(mockBloodDrives);
      } catch (error) {
        console.error("Error fetching blood drives:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBloodDrives();
  }, []);

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Upcoming Blood Drives</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full relative">
          {isLoading ? (
            <Skeleton className="h-full w-full" />
          ) : (
            <MapComponent bloodDrives={bloodDrives} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
