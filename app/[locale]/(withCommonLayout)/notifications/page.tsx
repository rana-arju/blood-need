"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import io from "socket.io-client"
import { toast } from "sonner"

export default function Notifications() {
  const [notifications, setNotifications] = useState<any[]>([])

  useEffect(() => {
    const socket = io("http://localhost:3001") // Replace with your server URL

    socket.on("notification", (notification) => {
      setNotifications((prevNotifications) => [...prevNotifications, notification])
      toast.success( "New Notification",
      )
    })

    return () => {
      socket.disconnect()
    }
  }, [toast])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Notifications</h1>
      {notifications.length > 0 ? (
        <ul className="space-y-4">
          {notifications.map((notification: any, index) => (
            <li key={index} className="border p-4 rounded">
              <p>{notification.message}</p>
              <p className="text-sm text-gray-500">{new Date(notification.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications yet.</p>
      )}
    </div>
  )
}

