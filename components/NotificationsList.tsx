import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/hooks/useNotifications";
import Link from "next/link";

export function NotificationsList() {
  const { notifications, markAsRead } = useNotifications();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <p>No notifications</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((notification) => (
              <Link
                href={`/notifications/${notification.id}`}
                className="cursor-pointer"
                passHref
                key={notification.id}
              >
                <li
                  className={`p-4 border rounded ${
                    notification.isRead ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <h3 className="font-semibold">{notification.title}</h3>
                  <p>{notification.body}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {new Date(notification.createdAt).toLocaleString()}
                    </span>
                    {!notification.isRead && (
                      <Button onClick={() => markAsRead(notification.id)}>
                        Mark as Read
                      </Button>
                    )}
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
