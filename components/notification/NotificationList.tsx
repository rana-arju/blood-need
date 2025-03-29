"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { Bell, Trash2, Check, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNotifications } from "@/contexts/notification-context";
import type { Notification } from "@/contexts/notification-context";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function NotificationList() {
  const {
    notifications,
    loading,
    loadNotifications,
    markAsRead,
    markAllAsRead,
    removeNotification,
  } = useNotifications();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  useEffect(() => {
    loadNotifications(1, limit);
  }, [loadNotifications]);

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    await loadNotifications(nextPage, limit);
    setPage(nextPage);

    // If we received fewer notifications than the limit, there are no more
    if (notifications.length < nextPage * limit) {
      setHasMore(false);
    }
  };

  const handleRefresh = async () => {
    setPage(1);
    setHasMore(true);
    await loadNotifications(1, limit);
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  const formatNotificationDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    // If it's today, show relative time (e.g., "2 hours ago")
    if (date.toDateString() === now.toDateString()) {
      return formatDistanceToNow(date, { addSuffix: true });
    }

    // Otherwise, show the date
    return format(date, "MMM d, yyyy");
  };

  if (loading && notifications.length === 0) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          <Bell className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No notifications yet</h3>
        <p className="text-muted-foreground mt-1 mb-4">
          You'll see notifications about blood donation requests, matches, and
          updates here.
        </p>
        <Button onClick={handleRefresh} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button
          onClick={handleMarkAllAsRead}
          variant="outline"
          size="sm"
          disabled={loading || notifications.every((n:any) => n.isRead)}
        >
          <Check className="h-4 w-4 mr-2" />
          Mark all as read
        </Button>
        <Button
          onClick={handleRefresh}
          variant="ghost"
          size="sm"
          disabled={loading}
        >
          <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
        </Button>
      </div>

      {notifications.map((notification: Notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={markAsRead}
          onRemove={removeNotification}
        />
      ))}

      {hasMore && (
        <div className="text-center pt-2">
          <Button onClick={handleLoadMore} variant="outline" disabled={loading}>
            {loading ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}
    </div>
  );
}

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
}

function NotificationItem({
  notification,
  onMarkAsRead,
  onRemove,
}: NotificationItemProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isMarking, setIsMarking] = useState(false);

  const handleMarkAsRead = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (notification.isRead) return;

    setIsMarking(true);
    await onMarkAsRead(notification.id);
    setIsMarking(false);
  };

  const handleRemove = async (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsRemoving(true);
    await onRemove(notification.id);
    setIsRemoving(false);
  };

  const handleClick = async () => {
    if (!notification.isRead) {
      await onMarkAsRead(notification.id);
    }
  };

  const formatNotificationDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    // If it's today, show relative time (e.g., "2 hours ago")
    if (date.toDateString() === now.toDateString()) {
      return formatDistanceToNow(date, { addSuffix: true });
    }

    // Otherwise, show the date
    return format(date, "MMM d, yyyy");
  };

  const cardContent = (
    <CardContent className="p-4">
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex-shrink-0 rounded-full p-2",
            notification.isRead ? "bg-muted" : "bg-primary/10"
          )}
        >
          <Bell
            className={cn(
              "h-5 w-5",
              notification.isRead ? "text-muted-foreground" : "text-primary"
            )}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h4
            className={cn(
              "text-sm font-medium line-clamp-1",
              !notification.isRead && "font-semibold"
            )}
          >
            {notification.title}
          </h4>

          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {notification.body}
          </p>

          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">
              {formatNotificationDate(notification.createdAt)}
            </span>

            <div className="flex items-center gap-2">
              {!notification.isRead && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2"
                  onClick={handleMarkAsRead}
                  disabled={isMarking}
                >
                  <Check className="h-4 w-4" />
                  <span className="sr-only">Mark as read</span>
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-destructive hover:text-destructive"
                onClick={handleRemove}
                disabled={isRemoving}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  );

  if (notification.url) {
    return (
      <Card
        className={cn(
          "transition-colors hover:bg-muted/50 cursor-pointer",
          !notification.isRead && "border-l-4 border-l-primary"
        )}
      >
        <Link href={notification.url} onClick={handleClick}>
          {cardContent}
        </Link>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "transition-colors hover:bg-muted/50 cursor-pointer",
        !notification.isRead && "border-l-4 border-l-primary"
      )}
      onClick={handleClick}
    >
      {cardContent}
    </Card>
  );
}
