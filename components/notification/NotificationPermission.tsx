"use client";

import { useState, useEffect } from "react";
import { Bell, BellRing, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useNotificationSubscription } from "@/utils/pushNotifications";

export default function NotificationPermission() {
  const t = useTranslations("NotificationPermission");
  const [showDialog, setShowDialog] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { isSubscribed, isLoading, subscribe } = useNotificationSubscription();

  // Check if user has already interacted with the permission dialog
  useEffect(() => {
    if (!userId) return;

    const hasInteractedBefore = localStorage.getItem(
      "notification-permission-interacted"
    );

    // If user hasn't interacted and permission isn't granted, show dialog after delay
    if (
      !hasInteractedBefore &&
      !isSubscribed &&
      Notification.permission !== "granted"
    ) {
      const timer = setTimeout(() => {
        setShowDialog(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [userId, isSubscribed]);

  const handleRequestPermission = async () => {
    if (!userId) {
      toast.error("You must be logged in to enable notifications");
      return;
    }

    try {
      const success = await subscribe();

      if (success) {
        toast.success("Notifications enabled");
      }

      // Mark as interacted regardless of outcome
      localStorage.setItem("notification-permission-interacted", "true");
      setShowDialog(false);
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      toast.error(t("enableError"));
    }
  };

  const handleClose = () => {
    localStorage.setItem("notification-permission-interacted", "true");
    setShowDialog(false);
  };

  // Don't render anything if user is not logged in, already subscribed, or permission is already granted
  if (!userId || isSubscribed || Notification.permission === "granted") {
    return null;
  }

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-md rounded-xl overflow-y-auto max-h-screen p-0 gap-0">
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
          <DialogHeader className="text-white">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <BellRing className="h-5 w-5" />
              {t("title")}
            </DialogTitle>
            <DialogDescription className="text-white/90">
              {t("description")}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-center py-4">
            <div className="relative">
              <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-30"></div>
              <div className="relative rounded-full bg-red-100 p-6">
                <Bell className="h-12 w-12 text-red-500" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-medium">{t("benefitsTitle")}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50">
                <Shield className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium dark:text-gray-400">
                    {t("benefit1Title")}
                  </p>
                  <p className="text-xs text-gray-500">{t("benefit1Desc")}</p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50">
                <Heart className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium dark:text-gray-400">
                    {t("benefit2Title")}
                  </p>
                  <p className="text-xs text-gray-500">{t("benefit2Desc")}</p>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
              <p className="font-medium text-gray-700 mb-1">
                {t("privacyTitle")}
              </p>
              <p>{t("privacyDesc")}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 p-4 bg-gray-50">
          <Button
            variant="outline"
            onClick={handleClose}
            className="sm:w-auto w-full"
          >
            {t("notNow")}
          </Button>
          <Button
            onClick={handleRequestPermission}
            disabled={isLoading}
            className="sm:w-auto w-full bg-red-500 hover:bg-red-600"
          >
            {isLoading ? (
              <>
                <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
                {t("enabling")}
              </>
            ) : (
              t("enable")
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
