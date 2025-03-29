"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/contexts/notification-context";

export function NotificationBadge() {
  const { unreadCount, loadNotifications } = useNotifications();

  useEffect(() => {
    // Load initial unread count
    loadNotifications(1, 1);

    // Set up polling for new notifications (every 5 minutes)
    const interval = setInterval(() => {
      loadNotifications(1, 1);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [loadNotifications]);

  return (
    <Link href="/notifications" className="relative">
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </Button>
    </Link>
  );
}
