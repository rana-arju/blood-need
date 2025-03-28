// contexts/NotificationContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { 
  requestNotificationPermission, 
  setupMessageHandler, 
  getUserNotifications,
  subscribeToWebPush
} from '@/services/notificationService';
import { toast } from 'sonner';

interface NotificationContextType {
  notifications: any[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  requestPermission: () => Promise<void>;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  // Initialize notifications when user is authenticated
  useEffect(() => {
    if (session) {
      fetchNotifications();
      initializeNotifications();
    }
  }, [session]);

  // Initialize notification services
  const initializeNotifications = async () => {
    try {
      // Check if service worker is supported
      if ('serviceWorker' in navigator) {
        // Register service worker
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        console.log('Service Worker registered with scope:', registration.scope);
        
        // Try both FCM and Web Push
        try {
          await requestPermission();
        } catch (fcmError) {
          console.warn('FCM initialization failed, trying Web Push:', fcmError);
          try {
            await subscribeToWebPush();
          } catch (webPushError) {
            console.error('Web Push initialization failed:', webPushError);
          }
        }
      }
    } catch (error) {
      console.error('Error initializing notifications:', error);
    }
  };

  // Request notification permission
  const requestPermission = async () => {
    try {
      setLoading(true);
      await requestNotificationPermission();
      setLoading(false);
    } catch (error) {
      setError('Failed to request notification permission');
      setLoading(false);
      throw error;
    }
  };

  // Set up message handler for foreground messages
  useEffect(() => {
    const unsubscribe = setupMessageHandler((payload:any) => {
      // Show toast notification
      toast(payload.notification.title, {
        description: payload.notification.body,
        action: {
          label: 'View',
          onClick: () => {
            if (payload.data?.url) {
              router.push(payload.data.url);
            }
          },
        },
      });
      
      // Refresh notifications
      fetchNotifications();
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [router]);

  // Fetch user notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await getUserNotifications();
      setNotifications(response.data);
      setUnreadCount(response.data.filter((n: any) => !n.isRead).length);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch notifications');
      setLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (id: string) => {
    try {
      await markNotificationAsRead(id);
      setNotifications(
        notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount(Math.max(0, unreadCount - 1));
    } catch (error) {
      setError('Failed to mark notification as read');
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications(
        notifications.map((n) => ({ ...n, isRead: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      setError('Failed to mark all notifications as read');
    }
  };

  // Delete notification
  const deleteNotification = async (id: string) => {
    try {
      await deleteNotification(id);
      const updatedNotifications = notifications.filter((n) => n.id !== id);
      setNotifications(updatedNotifications);
      setUnreadCount(updatedNotifications.filter((n) => !n.isRead).length);
    } catch (error) {
      setError('Failed to delete notification');
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        error,
        requestPermission,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};