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

const mockVolunteers = [
  {
    id: 1,
    name: "Eva Green",
    email: "eva@example.com",
    phone: "123-456-7890",
    availability: "Weekends",
  },
  {
    id: 2,
    name: "Frank White",
    email: "frank@example.com",
    phone: "098-765-4321",
    availability: "Evenings",
  },
  // Add more mock volunteers as needed
];

export function VolunteersList() {
  const [volunteers, setVolunteers] = useState(mockVolunteers);
  const [editingVolunteer, setEditingVolunteer] = useState(null);

  const handleDelete = (id: string | number) => {
    setVolunteers(volunteers.filter((volunteer) => volunteer.id !== id));
  };

  const handleEdit = (volunteer: any) => {
    setEditingVolunteer(volunteer);
  };

  const handleUpdate = (updatedVolunteer: any) => {
    setVolunteers(
      volunteers.map((volunteer) =>
        volunteer.id === updatedVolunteer.id ? updatedVolunteer : volunteer
      )
    );
    setEditingVolunteer(null);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Volunteers List</h2>
      <Input placeholder="Search volunteers..." className="max-w-sm" />
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {volunteers.map((volunteer) => (
              <TableRow key={volunteer.id}>
                <TableCell>{volunteer.name}</TableCell>
                <TableCell>{volunteer.email}</TableCell>
                <TableCell>{volunteer.phone}</TableCell>
                <TableCell>{volunteer.availability}</TableCell>
                <TableCell>
                  <div className="space-x-2">
                    <Button size="sm" onClick={() => handleEdit(volunteer)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(volunteer.id)}
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
      <EditVolunteerDialog
        volunteer={editingVolunteer}
        onUpdate={handleUpdate}
        onClose={() => setEditingVolunteer(null)}
      />
    </div>
  );
}

function EditVolunteerDialog({
  volunteer,
  onUpdate,
  onClose,
}: {
  volunteer: any;
  onUpdate: any;
  onClose: any;
}) {
  const [name, setName] = useState(volunteer?.name || "");
  const [email, setEmail] = useState(volunteer?.email || "");
  const [phone, setPhone] = useState(volunteer?.phone || "");
  const [availability, setAvailability] = useState(
    volunteer?.availability || ""
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onUpdate({ ...volunteer, name, email, phone, availability });
  };

  return (
    <Dialog open={!!volunteer} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Volunteer</DialogTitle>
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
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="availability">Availability</Label>
            <Input
              id="availability"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            />
          </div>
          <Button type="submit">Update Volunteer</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
