"use client";

import { NotificationsList } from "@/components/NotificationsList";

export default function Notifications() {

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Notifications</h1>
      <div className="mb-4">
        {
          // <PushNotificationToggle />
        }
      </div>
      <NotificationsList />
    </div>
  );
}
