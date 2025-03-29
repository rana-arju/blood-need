import { messaging } from "@/lib/firebase/firebase-config";
import { getToken, onMessage } from "firebase/messaging";
import { addToOfflineQueue, processOfflineQueue } from "../offline-queue";
// API response types
interface NotificationsResponse {
  success: boolean;
  message: string;
  data: any;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface PreferencesResponse {
  success: boolean;
  message: string;
  data: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

// Base API URL
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

// Helper function to handle API requests with offline support
async function apiRequest<T>(
  url: string,
  options: RequestInit = {},
  userId?: string
): Promise<T> {
      console.log("Fetching notifications for userId:", userId);

  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // Add userId as Bearer token in Authorization header if it exists
    if (userId) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${userId}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // If offline, add to queue for later processing
    if (!navigator.onLine) {
      await addToOfflineQueue(url, options, userId);
      throw new Error(
        "You are offline. This action will be processed when you are back online."
      );
    }
    throw error;
  }
}

// VAPID key from your backend
const VAPID_KEY = "";

// Function to fetch VAPID key from backend
export async function getVapidKey() {
  try {
    const response = await fetch(
      `${API_URL}/notifications/web-push/vapid-public-key`
    );
    const data = await response.json();

    if (data.success && data.data.publicKey) {
      return data.data.publicKey;
    }

    throw new Error("Failed to get VAPID key");
  } catch (error) {
    console.error("Error fetching VAPID key:", error);
    throw error;
  }
}

// Function to request notification permission
export async function requestNotificationPermission() {
  try {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  } catch (error) {
    console.error("Error requesting notification permission:", error);
    return false;
  }
}

// Function to register FCM token with backend
export async function registerFCMToken(token: string, userId?: string) {
  try {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: any;
    }>(
      `${API_URL}/notifications/token/register`,
      {
        method: "POST",
        body: JSON.stringify({
          token,
          device: navigator.userAgent,
        }),
      },
      userId
    );

    return response.success;
  } catch (error) {
    console.error("Error registering FCM token:", error);

    // Add to offline queue if network error
    if (error instanceof TypeError && error.message.includes("network")) {
      addToOfflineQueue(
        `${API_URL}/notifications/token/register`,
        {
          method: "POST",
          body: JSON.stringify({
            token,
            device: navigator.userAgent,
          }),
        },
        userId
      );
    }

    return false;
  }
}

// Function to unregister FCM token
export async function unregisterFCMToken(token: string, userId?: string) {
  try {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: any;
    }>(
      `${API_URL}/notifications/token/remove`,
      {
        method: "POST",
        body: JSON.stringify({ token }),
      },
      userId
    );

    return response.success;
  } catch (error) {
    console.error("Error unregistering FCM token:", error);

    // Add to offline queue if network error
    if (error instanceof TypeError && error.message.includes("network")) {
      addToOfflineQueue(
        `${API_URL}/notifications/token/remove`,
        {
          method: "POST",
          body: JSON.stringify({ token }),
        },
        userId
      );
    }

    return false;
  }
}

// Function to subscribe to web push
export async function subscribeToWebPush(
  subscription: PushSubscription,
  userId?: string
) {
  try {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: any;
    }>(
      `${API_URL}/notifications/web-push/subscribe`,
      {
        method: "POST",
        body: JSON.stringify(subscription),
      },
      userId
    );

    return response;
  } catch (error) {
    console.error("Error subscribing to web push:", error);
    return false;
  }
}

// Function to unsubscribe from web push
export async function unsubscribeFromWebPush(
  endpoint: string,
  userId?: string
) {
  try {
    const response = await apiRequest<{
      success: boolean;
      message: string;
      data: any;
    }>(
      `${API_URL}/notifications/web-push/unsubscribe`,
      {
        method: "POST",
        body: JSON.stringify({ endpoint }),
      },
      userId
    );

    return response.success;
  } catch (error) {
    console.error("Error unsubscribing from web push:", error);
    return false;
  }
}

// Function to initialize FCM
export async function initializeFCM(userId?: string) {
  if (!messaging) return null;

  try {
    // Check if permission is already granted
    if (Notification.permission !== "granted") {
      return null;
    }

    const vapidKey = await getVapidKey();

    // Get registration token
    const token = await getToken(messaging, {
      vapidKey,
    });

    if (token) {
      // Register token with backend
      await registerFCMToken(token, userId);
      return token;
    }

    return null;
  } catch (error) {
    console.error("Error initializing FCM:", error);
    return null;
  }
}

// Function to handle foreground messages
export function setupForegroundMessaging(callback: (payload: any) => void) {
  if (!messaging) return () => {};

  const unsubscribe = onMessage(messaging, (payload) => {
    console.log("Foreground message received:", payload);
    callback(payload);
  });

  return unsubscribe;
}

// Helper function to convert base64 to Uint8Array
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

// Setup auth state listener to register tokens when user logs in
export function setupAuthListener() {
  // Process offline queue when user logs in
  if (typeof window !== "undefined") {
    const userId = localStorage.getItem("userId");
    if (userId) {
      processOfflineQueue(userId);
    }

    // Listen for userId changes
    window.addEventListener("storage", (event) => {
      if (event.key === "userId" && event.newValue) {
        processOfflineQueue(event.newValue);
      }
    });
  }

  return () => {};
}

export const notificationService = {
  // Register device token with the server
  async registerDevice(
    token: string,
    userId?: string
  ): Promise<{ success: boolean }> {
    return apiRequest<{ success: boolean }>(
      `${API_URL}/notifications/token/register`,
      {
        method: "POST",
        body: JSON.stringify({ token, device: navigator.userAgent }),
      },
      userId
    );
  },

  // Get user notifications with pagination
  async getNotifications(
    page = 1,
    limit = 10,
    userId?: string
  ) {
        console.log("Fetching notifications for userId:");

    const response = await apiRequest<NotificationsResponse>(
      `${API_URL}/notifications?page=${page}&limit=${limit}`,
      {},
      userId
    );

    // Transform the response to match our expected format
    return {
      ...response,
      notifications: response.data,
      unreadCount: response.data.filter((n:any) => !n.isRead).length,
      totalCount: response.meta.total,
    };
  },

  // Mark a notification as read
  async markAsRead(id: string, userId?: string): Promise<{ success: boolean }> {
    return apiRequest<{ success: boolean }>(
      `${API_URL}/notifications/read/${id}`,
      {
        method: "PATCH",
      },
      userId
    );
  },

  // Mark all notifications as read
  async markAllAsRead(userId?: string): Promise<{ success: boolean }> {
    return apiRequest<{ success: boolean }>(
      `${API_URL}/notifications/read-all`,
      {
        method: "PATCH",
      },
      userId
    );
  },

  // Remove a notification
  async removeNotification(
    id: string,
    userId?: string
  ): Promise<{ success: boolean }> {
    return apiRequest<{ success: boolean }>(
      `${API_URL}/notifications/${id}`,
      {
        method: "DELETE",
      },
      userId
    );
  },

  // Get notification preferences - this is a placeholder as the backend doesn't have this endpoint yet
  async getPreferences(userId?: string): Promise<PreferencesResponse> {
    // Since the backend doesn't have this endpoint yet, return default values
    return {
      success: true,
      message: "Notification preferences retrieved",
      data: {
        email: true,
        push: true,
        sms: false,
      },
    };
  },

  // Update notification preferences - this is a placeholder as the backend doesn't have this endpoint yet
  async updatePreferences(
    preferences: {
      email: boolean;
      push: boolean;
      sms: boolean;
    },
    userId?: string
  ): Promise<{ success: boolean }> {
    // Since the backend doesn't have this endpoint yet, just return success
    console.log("Would update preferences:", preferences);
    return { success: true };
  },
};
