"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { disableNotifications, enableNotifications } from "@/app/firebase-init";

export default function NotificationSettings() {
  const [notificationsEnabled, setNotificationsEnabled] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Check if notifications are enabled
    const storedPreference = localStorage.getItem("notificationsEnabled");
    setNotificationsEnabled(storedPreference === "true");

    // Check current permission
    if (typeof Notification !== "undefined") {
      setNotificationsEnabled(Notification.permission === "granted");
    }
  }, []);

  const handleToggleNotifications = async () => {
    setLoading(true);

    try {
      if (notificationsEnabled) {
        // Disable notifications
        const result = await disableNotifications();

        if (result.success) {
          setNotificationsEnabled(false);
          toast.success("Notifications disabled");
        } else {
          toast.error("Failed to disable notifications");
        }
      } else {
        // Enable notifications
        const result = await enableNotifications();

        if (result.success) {
          setNotificationsEnabled(true);
          toast.success("Notifications enabled");
        } else {
          toast.error("Failed to enable notifications");
        }
      }
    } catch (error) {
      console.error("Error toggling notifications:", error);
      toast.error("An error occurred while updating notification settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold">Notification Settings</h2>

      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">Push Notifications</p>
          <p className="text-sm text-gray-500">
            {notificationsEnabled
              ? "You will receive notifications about blood donation events and requests."
              : "Enable notifications to stay updated on blood donation events and requests."}
          </p>
        </div>
        <Switch
          checked={notificationsEnabled}
          onCheckedChange={handleToggleNotifications}
          disabled={loading}
        />
      </div>

      {notificationsEnabled && (
        <Button
          variant="outline"
          onClick={handleToggleNotifications}
          disabled={loading}
          className="w-full mt-2"
        >
          Unsubscribe from Notifications
        </Button>
      )}
    </div>
  );
}
