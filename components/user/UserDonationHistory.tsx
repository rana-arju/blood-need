"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockDonations = [
  {
    id: 1,
    date: "2024-01-15",
    location: "City Hospital",
    type: "Whole Blood",
    status: "Completed",
  },
  {
    id: 2,
    date: "2024-02-10",
    location: "Red Cross Center",
    type: "Platelets",
    status: "Pending",
  },
];

export function UserDonationHistory() {
  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-center">
        Donation History
      </h1>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">My Donations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-[600px] md:min-w-full">
              <TableHeader>
                <TableRow className="bg-gray-100 dark:bg-gray-800">
                  <TableHead className="p-2 text-sm md:text-base">
                    Date
                  </TableHead>
                  <TableHead className="p-2 text-sm md:text-base">
                    Location
                  </TableHead>
                  <TableHead className="p-2 text-sm md:text-base">
                    Type
                  </TableHead>
                  <TableHead className="p-2 text-sm md:text-base">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDonations.map((donation) => (
                  <TableRow
                    key={donation.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <TableCell className="p-2 text-sm md:text-base">
                      {donation.date}
                    </TableCell>
                    <TableCell className="p-2 text-sm md:text-base">
                      {donation.location}
                    </TableCell>
                    <TableCell className="p-2 text-sm md:text-base">
                      {donation.type}
                    </TableCell>
                    <TableCell className="p-2 text-sm md:text-base">
                      {donation.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
