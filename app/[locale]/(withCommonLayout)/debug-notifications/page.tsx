import NotificationDebugger from "@/components/notification-debugger"

export default function DebugNotificationsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Push Notification Debugging</h1>
      <p className="mb-6 text-gray-600">
        Use this page to diagnose and fix push notification issues. Follow the step-by-step process and check the
        console for detailed logs.
      </p>

      <NotificationDebugger />

      <div className="mt-8 p-4 bg-gray-100 rounded-md">
        <h2 className="text-xl font-semibold mb-2">Debugging Instructions</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Open your browser's developer tools (F12 or right-click and select "Inspect")</li>
          <li>Go to the "Console" tab to see detailed logs</li>
          <li>Click "Run Step-by-Step Tests" to diagnose issues</li>
          <li>Check the "Application" tab  "Service Workers" section to verify registration</li>
          <li>Use the "Push" button in the Service Workers panel to test push notifications</li>
        </ol>
      </div>
    </div>
  )
}

