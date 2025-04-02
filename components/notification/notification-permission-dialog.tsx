"use client";
import { Bell } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface NotificationPermissionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onEnable: () => void;
  onSkip: () => void;
}

export default function NotificationPermissionDialog({
  isOpen,
  onClose,
  onEnable,
  onSkip,
}: NotificationPermissionDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Enable Notifications
          </DialogTitle>
          <DialogDescription>
            Get notified about blood requests in your area and stay updated on
            donation opportunities.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <div className="rounded-full bg-primary/10 p-6">
              <Bell className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">
              Stay Connected, Save Lives
            </h3>
            <p className="text-sm text-muted-foreground">
              Receive timely alerts about blood requests in your district. Your
              quick response could save someone's life.
            </p>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <Button variant="outline" onClick={onSkip}>
            Not Now
          </Button>
          <Button onClick={onEnable} className="w-full sm:w-auto">
            Enable Notifications
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
