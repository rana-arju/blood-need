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

const mockBloodRequests = [
  {
    id: 1,
    requester: "Alice Johnson",
    bloodType: "A+",
    status: "Pending",
    date: "2023-06-15",
  },
  {
    id: 2,
    requester: "Bob Williams",
    bloodType: "O-",
    status: "Fulfilled",
    date: "2023-06-14",
  },
  // Add more mock blood requests as needed
];

export function BloodRequestsList() {
  const [requests, setRequests] = useState(mockBloodRequests);
  const [editingRequest, setEditingRequest] = useState(null);

  const handleDelete = (id) => {
    setRequests(requests.filter((request) => request.id !== id));
  };

  const handleEdit = (request) => {
    setEditingRequest(request);
  };

  const handleUpdate = (updatedRequest) => {
    setRequests(
      requests.map((request) =>
        request.id === updatedRequest.id ? updatedRequest : request
      )
    );
    setEditingRequest(null);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Blood Requests List</h2>
      <Input placeholder="Search requests..." className="max-w-sm" />
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Requester</TableHead>
              <TableHead>Blood Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.requester}</TableCell>
                <TableCell>{request.bloodType}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>{request.date}</TableCell>
                <TableCell>
                  <div className="space-x-2">
                    <Button size="sm" onClick={() => handleEdit(request)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(request.id)}
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
      <EditRequestDialog
        request={editingRequest}
        onUpdate={handleUpdate}
        onClose={() => setEditingRequest(null)}
      />
    </div>
  );
}

function EditRequestDialog({ request, onUpdate, onClose }) {
  const [requester, setRequester] = useState(request?.requester || "");
  const [bloodType, setBloodType] = useState(request?.bloodType || "");
  const [status, setStatus] = useState(request?.status || "");
  const [date, setDate] = useState(request?.date || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...request, requester, bloodType, status, date });
  };

  return (
    <Dialog open={!!request} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Blood Request</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="requester">Requester</Label>
            <Input
              id="requester"
              value={requester}
              onChange={(e) => setRequester(e.target.value)}
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
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Fulfilled">Fulfilled</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <Button type="submit">Update Request</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
