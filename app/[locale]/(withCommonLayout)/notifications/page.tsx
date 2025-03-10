"use client";

import { NotificationsList } from "@/components/NotificationsList";

export default function Notifications() {

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
        Notifications
      </h2>
      <div className="mb-4">
        {
          // <PushNotificationToggle />
        }
      </div>
      <NotificationsList />
    </div>
  );
}
