"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface BloodRequest {
  id: string;
  patientName: string;
  bloodType: string;
  location: string;
  urgency: "Low" | "Medium" | "High";
  postedAt: string;
}

export default function BloodRequestFeed() {
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBloodRequests();
  }, []);

  const fetchBloodRequests = async () => {
    try {
      // In a real application, this would be an API call
      const response = await fetch("/api/blood-requests");
      const data = await response.json();
      setRequests(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blood requests:", error);
      setLoading(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High":
        return "bg-red-500";
      case "Medium":
        return "bg-yellow-500";
      case "Low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Current Blood Requests
        </h2>
        {requests?.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests?.map((request) => (
            <Card
              key={request.id}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{request.patientName}</span>
                  <Badge className={getUrgencyColor(request.urgency)}>
                    {request.urgency} Urgency
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">
                  <strong>Blood Type:</strong> {request.bloodType}
                </p>
                <p className="mb-2">
                  <strong>Location:</strong> {request.location}
                </p>
                <p className="mb-4 text-sm text-gray-500">
                  Posted {request.postedAt}
                </p>
                <Button className="w-full">Respond to Request</Button>
              </CardContent>
            </Card>
          ))}
        </div> : <div className="mx-auto">Not Found</div>}
        
      </div>
    </section>
  );
}
