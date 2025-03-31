import PushNotificationTest from "@/components/push-notification-test";

export default function TestPushPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Push Notification Testing</h1>
      <p className="mb-6 text-gray-600">
        Use this page to test push notifications with Firebase Cloud Messaging.
      </p>

      <PushNotificationTest />

      <div className="mt-8 p-4 bg-gray-100 rounded-md">
        <h2 className="text-xl font-semibold mb-2">Testing Instructions</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            Click "Request Permission & Token" to request notification
            permission and get an FCM token
          </li>
          <li>
            Once you have a token, click "Send Test Notification" to send a test
            notification
          </li>
          <li>
            If the notification doesn't appear, check the browser console for
            errors
          </li>
          <li>
            You can also test push notifications using the Application tab in
            DevTools
          </li>
        </ol>
      </div>
    </div>
  );
}
