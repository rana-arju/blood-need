"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useNotifications } from "@/contexts/notification-context";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function NotificationBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const { data: session } = useSession();
  const { notificationsEnabled, isLoading, enableNotifications } =
    useNotifications();
  const t = useTranslations("Notifications");

  useEffect(() => {
    // Only show banner if:
    // 1. User is logged in
    // 2. Notifications are not enabled
    // 3. User hasn't dismissed the banner recently
    if (session?.user && notificationsEnabled === false) {
      const lastDismissed = localStorage.getItem(
        "notification-banner-dismissed"
      );
      const dismissedTime = lastDismissed
        ? Number.parseInt(lastDismissed, 10)
        : 0;
      const oneDayAgo = Date.now() - 86400000; // 24 hours in milliseconds

      if (!lastDismissed || dismissedTime < oneDayAgo) {
        // Show banner after a short delay
        const timer = setTimeout(() => {
          setShowBanner(true);
        }, 3000);

        return () => clearTimeout(timer);
      }
    }
  }, [session, notificationsEnabled]);

  const handleEnable = async () => {
    try {
      const result = await enableNotifications();
      if (result.success) {
        setShowBanner(false);
      }
    } catch (error) {
      console.error("Error enabling notifications:", error);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem(
      "notification-banner-dismissed",
      Date.now().toString()
    );
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-16 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg z-50 animate-in slide-in-from-bottom-5">
      <div className="flex items-start gap-3">
        <div className="bg-primary-foreground/20 rounded-full p-2">
          <Bell className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-sm">
            {t("enableNotificationsTitle")}
          </h4>
          <p className="text-xs text-primary-foreground/80 mt-1">
            {t("enableNotificationsDescription")}
          </p>
          <div className="flex gap-2 mt-3">
            <Button
              variant="secondary"
              size="sm"
              className="flex-1 text-xs"
              onClick={handleEnable}
              disabled={isLoading}
            >
              {isLoading ? t("enabling") : t("enable")}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 text-xs bg-primary-foreground/20 hover:bg-primary-foreground/30"
              onClick={handleDismiss}
            >
              {t("dismiss")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
