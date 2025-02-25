"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useNotificationSubscription } from "@/utils/pushNotifications";

export function PushNotificationToggle() {
  const { isSubscribed, subscribe, unsubscribe } =
    useNotificationSubscription();

  const handleToggle = async (checked: boolean) => {
    if (checked) {
      await subscribe();
    } else {
      await unsubscribe();
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
