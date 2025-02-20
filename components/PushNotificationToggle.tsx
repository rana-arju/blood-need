"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  subscribeToPushNotifications,
  unsubscribeFromPushNotifications,
} from "@/utils/pushNotifications";
import { useSession } from "next-auth/react";

export function PushNotificationToggle() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { data: session } = useSession();
console.log(isSubscribed);

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
    if (!session?.user?.id) return;

    if (checked) {
      const subscribed = await subscribeToPushNotifications(session.user.id);
      setIsSubscribed(subscribed);
    } else {
      const unsubscribed = await unsubscribeFromPushNotifications(
        session.user.id
      );
      setIsSubscribed(!unsubscribed);
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
