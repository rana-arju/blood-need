"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { subscribeToPushNotifications } from "@/utils/notifications";

export function PushNotificationToggle() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Check if the user is already subscribed
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.pushManager.getSubscription().then((subscription) => {
          setIsSubscribed(!!subscription);
        });
      });
    }
  }, []);

  const handleToggle = async (checked: boolean) => {
    if (checked) {
      await subscribeToPushNotifications();
      setIsSubscribed(true);
    } else {
      // Unsubscribe logic (to be implemented)
      setIsSubscribed(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="push-notifications"
        checked={isSubscribed}
        onCheckedChange={handleToggle}
      />
      <Label htmlFor="push-notifications">Enable Push Notifications</Label>
    </div>
  );
}
