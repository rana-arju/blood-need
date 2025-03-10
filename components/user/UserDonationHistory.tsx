"use client";

import { useTranslations } from "next-intl";
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

export function UserDonationHistory() {
  const t = useTranslations("UserDonations");

  const mockDonations = [
    {
      id: 1,
      date: "2024-01-15",
      location: t("donations.locations.cityHospital"),
      type: t("donations.types.wholeBlood"),
      status: "completed",
    },
    {
      id: 2,
      date: "2024-02-10",
      location: t("donations.locations.redCross"),
      type: t("donations.types.platelets"),
      status: "pending",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default">{t("donations.status.completed")}</Badge>
        );
      case "pending":
        return <Badge variant="secondary">{t("donations.status.pending")}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
        {t("title")}
      </h2>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">{t("subtitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-[600px] md:min-w-full">
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="p-2 text-sm md:text-base">
                    {t("table.date")}
                  </TableHead>
                  <TableHead className="p-2 text-sm md:text-base">
                    {t("table.location")}
                  </TableHead>
                  <TableHead className="p-2 text-sm md:text-base">
                    {t("table.type")}
                  </TableHead>
                  <TableHead className="p-2 text-sm md:text-base">
                    {t("table.status")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDonations.map((donation) => (
                  <TableRow key={donation.id} className="hover:bg-muted/50">
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
                      {getStatusBadge(donation.status)}
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
