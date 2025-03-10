"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockDonors = [
  {
    id: 1,
    name: "Charlie Brown",
    bloodType: "B+",
    lastDonation: "2023-05-20",
    donationCount: 3,
  },
  {
    id: 2,
    name: "Diana Prince",
    bloodType: "O+",
    lastDonation: "2023-06-01",
    donationCount: 5,
  },
  // Add more mock donors as needed
];

export function DonorsList() {
  const [donors, setDonors] = useState(mockDonors);
  const [editingDonor, setEditingDonor] = useState(null);

  const handleDelete = (id: string | number) => {
    setDonors(donors.filter((donor) => donor.id !== id));
  };

  const handleEdit = (donor: any) => {
    setEditingDonor(donor);
  };

  const handleUpdate = (updatedDonor: any) => {
    setDonors(
      donors.map((donor) =>
        donor.id === updatedDonor.id ? updatedDonor : donor
      )
    );
    setEditingDonor(null);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
        Donors List
      </h2>
      <Input placeholder="Search donors..." className="max-w-sm" />
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Blood Type</TableHead>
              <TableHead>Last Donation</TableHead>
              <TableHead>Donation Count</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {donors.map((donor) => (
              <TableRow key={donor.id}>
                <TableCell>{donor.name}</TableCell>
                <TableCell>{donor.bloodType}</TableCell>
                <TableCell>{donor.lastDonation}</TableCell>
                <TableCell>{donor.donationCount}</TableCell>
                <TableCell>
                  <div className="space-x-2">
                    <Button size="sm" onClick={() => handleEdit(donor)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(donor.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <EditDonorDialog
        donor={editingDonor}
        onUpdate={handleUpdate}
        onClose={() => setEditingDonor(null)}
      />
    </div>
  );
}

function EditDonorDialog({
  donor,
  onUpdate,
  onClose,
}: {
  donor: any,
  onUpdate: any,
  onClose: any
}) {
  const [name, setName] = useState(donor?.name || "");
  const [bloodType, setBloodType] = useState(donor?.bloodType || "");
  const [lastDonation, setLastDonation] = useState(donor?.lastDonation || "");
  const [donationCount, setDonationCount] = useState(donor?.donationCount || 0);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onUpdate({ ...donor, name, bloodType, lastDonation, donationCount });
  };

  return (
    <Dialog open={!!donor} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Donor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="bloodType">Blood Type</Label>
            <Select value={bloodType} onValueChange={setBloodType}>
              <SelectTrigger>
                <SelectValue placeholder="Select blood type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A+">A+</SelectItem>
                <SelectItem value="A-">A-</SelectItem>
                <SelectItem value="B+">B+</SelectItem>
                <SelectItem value="B-">B-</SelectItem>
                <SelectItem value="AB+">AB+</SelectItem>
                <SelectItem value="AB-">AB-</SelectItem>
                <SelectItem value="O+">O+</SelectItem>
                <SelectItem value="O-">O-</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="lastDonation">Last Donation</Label>
            <Input
              id="lastDonation"
              type="date"
              value={lastDonation}
              onChange={(e) => setLastDonation(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="donationCount">Donation Count</Label>
            <Input
              id="donationCount"
              type="number"
              value={donationCount}
              onChange={(e) => setDonationCount(Number(e.target.value))}
            />
          </div>
          <Button type="submit">Update Donor</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
