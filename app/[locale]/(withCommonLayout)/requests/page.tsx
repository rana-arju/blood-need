"use client";

import { useState } from "react";
import { Pagination } from "@/components/Pagination";
import { FilterForm, type FilterValues } from "@/components/FilterForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Mock data for blood requests
const mockBloodRequests = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  patientName: `Patient ${i + 1}`,
  bloodGroup: ["A+", "B+", "O-", "AB+"][Math.floor(Math.random() * 4)],
  location: `City ${i + 1}`,
  requestDate: new Date(
    Date.now() - Math.random() * 10000000000
  ).toLocaleDateString(),
  urgency: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
  imageUrl: `https://source.unsplash.com/random/200x200?face&${i}`,
}));

export default function BloodRequestList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterValues>({
    bloodGroup: "",
    division: "",
    district: "",
    upazila: "",
    union: "",
  });

  const itemsPerPage = 12;
  const filteredRequests = mockBloodRequests.filter((request) => {
    return (
      (!filters.bloodGroup || request.bloodGroup === filters.bloodGroup) &&
      (!filters.division || request.location.includes(filters.division)) &&
      (!filters.district || request.location.includes(filters.district)) &&
      (!filters.upazila || request.location.includes(filters.upazila)) &&
      (!filters.union || request.location.includes(filters.union))
    );
  });

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilter = (newFilters: FilterValues) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Blood Request List
      </h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Filter Blood Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <FilterForm onFilter={handleFilter} />
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedRequests.map((request) => (
          <Link key={request.id} href={`/requests/${request.id}`}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="flex items-center p-6">
                <Avatar className="h-24 w-24 mr-6">
                  <AvatarImage
                    src={request.imageUrl}
                    alt={request.patientName}
                  />
                  <AvatarFallback>
                    {request.patientName.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {request.patientName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Blood Group:</span>{" "}
                    {request.bloodGroup}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Location:</span>{" "}
                    {request.location}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Date:</span>{" "}
                    {request.requestDate}
                  </p>
                  <Badge
                    variant={
                      request.urgency === "High"
                        ? "destructive"
                        : request.urgency === "Medium"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {request.urgency} Urgency
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <div className="mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
