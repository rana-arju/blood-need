"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { updateDonorStatus } from "@/services/bloodRegister";

interface StatusChangeDialogProps {
  currentStatus: "pending" | "selected" | "confirmed" | "cancelled";
  requestId: string;
  userId: string;
  onStatusChange: (
    status: "pending" | "selected" | "confirmed" | "cancelled"
  ) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  trigger?: React.ReactNode;
}

export function StatusChangeDialog({
  currentStatus,
  requestId,
  userId,
  onStatusChange,
  isOpen,
  setIsOpen,

}: StatusChangeDialogProps) {
  const t = useTranslations("BloodRequestDetails.interestedDonorDetails");

  const [status, setStatus] = React.useState<
    "pending" | "selected" | "confirmed" | "cancelled"
  >(currentStatus);
  const [notes, setNotes] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateDonorStatus(requestId, userId, status, notes);
      onStatusChange(status);
      toast.success(t("statusUpdated"));
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(t("errorUpdatingStatus"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
     
        <Button className="mt-6 w-full sm:w-[200px]" onClick={() => setIsOpen(true)}>{t("selectStatus")}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("dialog.title")}</DialogTitle>
          <DialogDescription>{t("dialog.description")}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="status">{t("dialog.statusLabel")}</Label>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value as "pending" | "selected" | "confirmed" | "cancelled")}
                disabled={isSubmitting}
              >
                <SelectTrigger className="w-full" id="status">
                  <SelectValue placeholder={t("dialog.selectStatus")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">{t("pending")}</SelectItem>
                  <SelectItem value="selected">{t("selected")}</SelectItem>
                  <SelectItem value="confirmed">{t("confirmed")}</SelectItem>
                  <SelectItem value="cancelled">{t("cancelled")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">{t("dialog.notesLabel")}</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t("dialog.notesPlaceholder")}
                disabled={isSubmitting}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
            >
              {t("dialog.cancel")}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t("dialog.saving") : t("dialog.save")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
