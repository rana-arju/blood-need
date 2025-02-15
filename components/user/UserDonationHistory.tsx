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
  // Add more mock donations
];

export function UserDonationHistory() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Donation History</h1>
      <Card>
        <CardHeader>
          <CardTitle>My Donations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDonations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell>{donation.date}</TableCell>
                    <TableCell>{donation.location}</TableCell>
                    <TableCell>{donation.type}</TableCell>
                    <TableCell>{donation.status}</TableCell>
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
