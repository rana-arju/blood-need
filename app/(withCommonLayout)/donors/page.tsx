"use client";

import { useState, useEffect } from "react";
import { Pagination } from "@/components/Pagination";
import { FilterForm, type FilterValues } from "@/components/FilterForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type Donor = {
  id: number;
  name: string;
  bloodGroup: string;
  location: string;
  lastDonationDate: string;
  donationCount: number;
  imageUrl: string;
};
export default function DonorList() {
  const [mockDonors, setMockDonors] = useState<Donor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterValues>({
    bloodGroup: "",
    division: "",
    district: "",
    upazila: "",
    union: "",
  });

  useEffect(() => {
    // Generate mock donors on the client side
    const generatedDonors = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Donor ${i + 1}`,
      bloodGroup: ["A+", "B+", "O-", "AB+"][Math.floor(Math.random() * 4)],
      location: `City ${i + 1}`,
      lastDonationDate: new Date(
        Date.now() - Math.random() * 10000000000
      ).toLocaleDateString(),
      donationCount: Math.floor(Math.random() * 10),
      imageUrl: `https://source.unsplash.com/random/200x200?face&${i + 50}`,
    }));
    setMockDonors(generatedDonors);
  }, []);

  const itemsPerPage = 12;
  const filteredDonors = mockDonors.filter((donor) => {
    return (
      (!filters.bloodGroup || donor.bloodGroup === filters.bloodGroup) &&
      (!filters.division || donor.location.includes(filters.division)) &&
      (!filters.district || donor.location.includes(filters.district)) &&
      (!filters.upazila || donor.location.includes(filters.upazila)) &&
      (!filters.union || donor.location.includes(filters.union))
    );
  });

  const totalPages = Math.ceil(filteredDonors.length / itemsPerPage);
  const paginatedDonors = filteredDonors.slice(
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
      <h1 className="text-3xl font-bold text-center mb-8">Donor List</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Filter Donors</CardTitle>
        </CardHeader>
        <CardContent>
          <FilterForm onFilter={handleFilter} />
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedDonors.map((donor) => (
          <Link key={donor.id} href={`/donors/${donor.id}`}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="flex items-center p-6">
                <Avatar className="h-24 w-24 mr-6">
                  <AvatarImage src={donor.imageUrl} alt={donor.name} />
                  <AvatarFallback>{donor.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{donor.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Blood Group:</span>{" "}
                    {donor.bloodGroup}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Location:</span>{" "}
                    {donor.location}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Last Donation:</span>{" "}
                    {donor.lastDonationDate}
                  </p>
                  <Badge variant="secondary">
                    {donor.donationCount} Donations
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
