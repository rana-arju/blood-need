"use client";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNotifications } from "@/contexts/notification-context";
import { useSession } from "next-auth/react";
import { Bell, BellOff, BellRing, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function NotificationSettings() {
  const {
    notificationsEnabled,
    isLoading,
    enableNotifications,
    disableNotifications,
  } = useNotifications();
  const { theme } = useTheme();
  const t = useTranslations("NotificationSettings");
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;

  const handleToggleNotifications = async () => {
    if (!isLoggedIn) {
      toast.error("You must be logged in to manage notifications");
      return;
    }

    try {
      if (notificationsEnabled) {
        // Disable notifications
        const result = await disableNotifications();

        if (result.success) {
          toast.success(t("disableSuccess"));
        } else {
          toast.error(t("disableError"));
        }
      } else {
        // Enable notifications
        const result = await enableNotifications();

        if (result.success) {
          toast.success(t("enableSuccess"));
        } else {
          toast.error(t("enableError"));
        }
      }
    } catch (error) {
      console.error("Error toggling notifications:", error);
      toast.error(t("toggleError"));
    }
  };

  // Don't show settings if user is not logged in
  if (!isLoggedIn) {
    return (
      <Card
        className={`${
          theme === "dark" ? "bg-gray-800 text-white" : ""
        } border border-gray-200 shadow-sm`}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellOff className="h-5 w-5" />
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You need to be logged in to manage notification settings.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`${
        theme === "dark" ? "bg-gray-800 text-white" : ""
      } border border-gray-200 shadow-sm`}
    >
      <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
        <CardTitle className="flex items-center gap-2">
          {notificationsEnabled ? (
            <BellRing className="h-5 w-5 text-red-500" />
          ) : (
            <BellOff className="h-5 w-5 text-gray-500" />
          )}
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-6">
          <motion.div
            className="flex items-center justify-between p-4 rounded-lg bg-red-50 dark:bg-red-900/20"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <p className="font-medium flex items-center gap-2">
                <Bell className="h-4 w-4 text-red-500" />
                {t("pushNotifications")}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {notificationsEnabled
                  ? t("pushNotificationsEnabledDesc")
                  : t("pushNotificationsDisabledDesc")}
              </p>
            </div>
            <Switch
              checked={!!notificationsEnabled}
              onCheckedChange={handleToggleNotifications}
              disabled={isLoading}
              className="data-[state=checked]:bg-red-500"
            />
          </motion.div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <Info className="h-5 w-5 text-gray-500 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p>
                {notificationsEnabled
                  ? "You will receive notifications about urgent blood requests, upcoming blood drives, and when your donation helps save a life."
                  : "Enable notifications to stay informed about urgent blood requests and donation opportunities."}
              </p>
            </div>
          </div>

          {notificationsEnabled && (
            <Button
              variant="outline"
              onClick={handleToggleNotifications}
              disabled={isLoading}
              className="w-full mt-2"
            >
              {isLoading ? (
                <>
                  <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
                  {t("disabling")}
                </>
              ) : (
                <>
                  <BellOff className="h-4 w-4 mr-2" />
                  {t("unsubscribe")}
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
