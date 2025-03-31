// API service for notifications

// Get VAPID key from backend
export const getVapidKey = async (): Promise<string> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/web-push/vapid-public-key`
    );

    if (!response.ok) {
      throw new Error("Failed to get VAPID key");
    }

    const data = await response.json();
    return data.data.publicKey;
  } catch (error) {
    console.error("Error getting VAPID key:", error);
    throw error;
  }
};

// Register FCM token with backend
export const registerFCMToken = async (
  token: string,
  userId: string
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/token/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userId}`,
        },
        body: JSON.stringify({ token }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to register FCM token");
    }

    return true;
  } catch (error) {
    console.error("Error registering FCM token:", error);
    return false;
  }
};

// Unregister FCM token
export const unregisterFCMToken = async (
  token: string,
  userId: string
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/token/remove`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userId}`,
        },
        body: JSON.stringify({ token }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to unregister FCM token");
    }

    return true;
  } catch (error) {
    console.error("Error unregistering FCM token:", error);
    return false;
  }
};

// Get user notifications
export const notificationService = {
  getNotifications: async (page: number, limit: number, userId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${userId}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await response.json();

      return {
        notifications: data.data,
        unreadCount: data.data.filter((n: any) => !n.isRead).length,
        meta: data.meta,
      };
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  },

  markAsRead: async (id: string, userId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/read/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${userId}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark notification as read");
      }

      return await response.json();
    } catch (error) {
      console.error("Error marking notification as read:", error);
      throw error;
    }
  },

  markAllAsRead: async (userId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/read-all`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${userId}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark all notifications as read");
      }

      return await response.json();
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      throw error;
    }
  },

  removeNotification: async (id: string, userId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/notifications/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${userId}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove notification");
      }

      return await response.json();
    } catch (error) {
      console.error("Error removing notification:", error);
      throw error;
    }
  },
};
