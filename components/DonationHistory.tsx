"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Donation {
  id: string;
  date: string;
  type: string;
  location: string;
  impact: string;
}

export default function DonationHistory() {
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    // In a real application, this would be an API call to fetch the user's donation history
    const mockDonations: Donation[] = [
      {
        id: "1",
        date: "2023-06-01",
        type: "Whole Blood",
        location: "City Hospital",
        impact: "3 lives saved",
      },
      {
        id: "2",
        date: "2023-04-06",
        type: "Platelets",
        location: "Community Blood Center",
        impact: "2 lives saved",
      },
      {
        id: "3",
        date: "2023-02-10",
        type: "Power Red",
        location: "Mobile Blood Drive",
        impact: "4 lives saved",
      },
    ];
    setDonations(mockDonations);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Donation History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Impact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {donations.map((donation) => (
              <TableRow key={donation.id}>
                <TableCell>{donation.date}</TableCell>
                <TableCell>
                  <Badge variant="outline">{donation.type}</Badge>
                </TableCell>
                <TableCell>{donation.location}</TableCell>
                <TableCell>{donation.impact}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
