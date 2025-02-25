"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface User {
  id: string;
  name: string;
  email: string;
  bloodType: string;
  donationCount: number;
  role: string;
  isFeatured: boolean;
  isBlocked: boolean;
}

interface BloodRequest {
  id: string;
  requesterName: string;
  bloodType: string;
  location: string;
  isFeatured: boolean;
}

export function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>([]);

  useEffect(() => {
    // Fetch users and blood requests from the API
    fetchUsers();
    fetchBloodRequests();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    }
  };

  const fetchBloodRequests = async () => {
    const response = await fetch("/api/blood-requests");
    if (response.ok) {
      const data = await response.json();
      setBloodRequests(data);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const response = await fetch(`/api/users/${userId}`, { method: "DELETE" });
    if (response.ok) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const handleToggleUserBlock = async (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isBlocked: !user.isBlocked }),
      });
      if (response.ok) {
        setUsers(
          users.map((u) =>
            u.id === userId ? { ...u, isBlocked: !u.isBlocked } : u
          )
        );
      }
    }
  };

  const handleToggleUserFeatured = async (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: !user.isFeatured }),
      });
      if (response.ok) {
        setUsers(
          users.map((u) =>
            u.id === userId ? { ...u, isFeatured: !u.isFeatured } : u
          )
        );
      }
    }
  };

  const handleChangeUserRole = async (userId: string, newRole: string) => {
    const response = await fetch(`/api/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });
    if (response.ok) {
      setUsers(
        users.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
    }
  };

  const handleDeleteBloodRequest = async (requestId: string) => {
    const response = await fetch(`/api/blood-requests/${requestId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setBloodRequests(
        bloodRequests.filter((request) => request.id !== requestId)
      );
    }
  };

  const handleToggleRequestFeatured = async (requestId: string) => {
    const request = bloodRequests.find((r) => r.id === requestId);
    if (request) {
      const response = await fetch(`/api/blood-requests/${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: !request.isFeatured }),
      });
      if (response.ok) {
        setBloodRequests(
          bloodRequests.map((r) =>
            r.id === requestId ? { ...r, isFeatured: !r.isFeatured } : r
          )
        );
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="bloodRequests">Blood Requests</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Blood Type</TableHead>
                    <TableHead>Donations</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Blocked</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.bloodType}</TableCell>
                      <TableCell>{user.donationCount}</TableCell>
                      <TableCell>
                        <Select
                          value={user.role}
                          onValueChange={(newRole) =>
                            handleChangeUserRole(user.id, newRole)
                          }
                        >
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={user.isFeatured}
                          onCheckedChange={() =>
                            handleToggleUserFeatured(user.id)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={user.isBlocked}
                          onCheckedChange={() => handleToggleUserBlock(user.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bloodRequests">
          <Card>
            <CardHeader>
              <CardTitle>Blood Request Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Requester</TableHead>
                    <TableHead>Blood Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bloodRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.requesterName}</TableCell>
                      <TableCell>{request.bloodType}</TableCell>
                      <TableCell>{request.location}</TableCell>
                      <TableCell>
                        <Switch
                          checked={request.isFeatured}
                          onCheckedChange={() =>
                            handleToggleRequestFeatured(request.id)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteBloodRequest(request.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Message Center</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient</Label>
                  <Input
                    id="recipient"
                    placeholder="Enter recipient's email or name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    placeholder="Type your message here..."
                  ></textarea>
                </div>
                <Button>Send Message</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
