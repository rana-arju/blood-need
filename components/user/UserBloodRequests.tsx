"use client";

import type React from "react";
import { useTranslations } from "next-intl";
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
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export function UserBloodRequests() {
  const t = useTranslations("UserRequests");

  const mockRequests = [
    {
      id: 1,
      bloodType: "A+",
      status: "active",
      date: "2024-02-15",
      location: t("locations.cityHospital"),
    },
    {
      id: 2,
      bloodType: "O-",
      status: "completed",
      date: "2024-01-20",
      location: t("locations.medicalCenter"),
    },
  ];

  const [requests, setRequests] = useState(mockRequests);
  const [editingRequest, setEditingRequest] = useState<any>(null);

  const handleDelete = async (id: number) => {
    try {
      // Delete request logic
      setRequests(requests.filter((request) => request.id !== id));
      toast(t("notifications.deleteSuccess"));
    } catch {
      toast(t("notifications.deleteError"));
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
      toast(t("notifications.updateSuccess"));
    } catch {
      toast(t("notifications.updateError"));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">{t("status.active")}</Badge>;
      case "completed":
        return <Badge variant="default">{t("status.completed")}</Badge>;
      case "cancelled":
        return <Badge variant="destructive">{t("status.cancelled")}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
        {t("title")}
      </h2>

      <Card>
        <CardHeader>
          <CardTitle>{t("subtitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="overflow-x-auto">
              <TableHeader>
                <TableRow>
                  <TableHead>{t("table.bloodType")}</TableHead>
                  <TableHead>{t("table.status")}</TableHead>
                  <TableHead>{t("table.date")}</TableHead>
                  <TableHead>{t("table.location")}</TableHead>
                  <TableHead>{t("table.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">
                      {request.bloodType}
                    </TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell>{request.location}</TableCell>
                    <TableCell>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(request)}
                          disabled={request.status === "completed"}
                        >
                          {t("actions.edit")}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(request.id)}
                          disabled={request.status === "completed"}
                        >
                          {t("actions.delete")}
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
  const t = useTranslations("UserRequests");
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
          <DialogTitle>{t("editDialog.title")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="bloodType">{t("editDialog.bloodType")}</Label>
            <Input
              id="bloodType"
              value={formData.bloodType}
              onChange={(e) =>
                setFormData({ ...formData, bloodType: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="location">{t("editDialog.location")}</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>
          <Button type="submit">{t("editDialog.update")}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
