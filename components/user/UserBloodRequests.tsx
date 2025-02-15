"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const mockRequests = [
  {
    id: 1,
    bloodType: "A+",
    status: "Active",
    date: "2024-02-15",
    location: "City Hospital",
  },
  // Add more mock requests
];

export function UserBloodRequests() {
  const [requests, setRequests] = useState(mockRequests);
  const [editingRequest, setEditingRequest] = useState(null);
  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    try {
      // Delete request logic
      setRequests(requests.filter((request) => request.id !== id));
      toast({
        title: "Success",
        description: "Request deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete request",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (request: any) => {
    setEditingRequest(request);
  };

  const handleUpdate = async (updatedRequest: any) => {
    try {
      // Update request logic
      setRequests(
        requests.map((request) =>
          request.id === updatedRequest.id ? updatedRequest : request
        )
      );
      setEditingRequest(null);
      toast({
        title: "Success",
        description: "Request updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update request",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Blood Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Blood Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.bloodType}</TableCell>
                    <TableCell>{request.status}</TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell>{request.location}</TableCell>
                    <TableCell>
                      <div className="space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(request)}
                        >
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
        </CardContent>
      </Card>

      <EditRequestDialog
        request={editingRequest}
        onUpdate={handleUpdate}
        onClose={() => setEditingRequest(null)}
      />
    </div>
  );
}

function EditRequestDialog({ request, onUpdate, onClose }: any) {
  const [formData, setFormData] = useState(request || {});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  if (!request) return null;

  return (
    <Dialog open={!!request} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Blood Request</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="bloodType">Blood Type</Label>
            <Input
              id="bloodType"
              value={formData.bloodType}
              onChange={(e) =>
                setFormData({ ...formData, bloodType: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>
          <Button type="submit">Update Request</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
