"use client"

import { NotificationsList } from "@/components/NotificationsList"
import { PushNotificationToggle } from "@/components/PushNotificationToggle"
import { useState, useEffect } from "react"


export default function Notifications() {
  const [notifications, setNotifications] = useState<any[]>([])

 

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Notifications</h1>
      <PushNotificationToggle />
     <NotificationsList />
    </div>
  )
}

