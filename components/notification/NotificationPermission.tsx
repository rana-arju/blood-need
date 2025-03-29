"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { useNotifications } from "@/contexts/notification-context";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function NotificationPermission() {
  const { permissionGranted, requestPermission } = useNotifications();
  const [showDialog, setShowDialog] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Check if user has already interacted with the permission dialog
    const hasInteractedBefore = localStorage.getItem(
      "notification-permission-interacted"
    );
    setHasInteracted(!!hasInteractedBefore);

    // Show the dialog after 10 seconds if permission is not granted and user hasn't interacted
    if (permissionGranted === false && !hasInteractedBefore) {
      const timer = setTimeout(() => {
        setShowDialog(true);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [permissionGranted]);

  const handleRequestPermission = async () => {
    await requestPermission();
    setShowDialog(false);
    localStorage.setItem("notification-permission-interacted", "true");
    setHasInteracted(true);
  };

  const handleClose = () => {
    setShowDialog(false);
    localStorage.setItem("notification-permission-interacted", "true");
    setHasInteracted(true);
  };

  // Don't show anything if permission is already granted or null (not determined yet)
  if (permissionGranted !== false || hasInteracted) {
    return null;
  }

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enable Notifications</DialogTitle>
          <DialogDescription>
            Get timely updates about blood donation requests, upcoming blood
            drives, and when your donation helps save a life.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center py-4">
          <div className="rounded-full bg-primary/10 p-6">
            <Bell className="h-12 w-12 text-primary" />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">
            You'll receive notifications about:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
            <li>Urgent blood donation requests in your area</li>
            <li>Upcoming blood drives near you</li>
            <li>When your donation helps save a life</li>
            <li>Important updates about your donor status</li>
          </ul>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={handleClose}
            className="sm:w-auto w-full"
          >
            Not Now
          </Button>
          <Button
            onClick={handleRequestPermission}
            className="sm:w-auto w-full"
          >
            Enable Notifications
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
