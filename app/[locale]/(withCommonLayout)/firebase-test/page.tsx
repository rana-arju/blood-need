import FirebaseInitTest from "@/components/firebase-init-test";

export default function FirebaseTestPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Firebase Initialization Test</h1>
      <p className="mb-6 text-gray-600">
        This page tests if Firebase is properly initialized in your application.
      </p>

      <FirebaseInitTest />

      <div className="mt-8 p-4 bg-gray-100 rounded-md">
        <h2 className="text-xl font-semibold mb-2">Troubleshooting Steps</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            Check that all Firebase environment variables are properly set
          </li>
          <li>
            Verify that your Firebase project is properly configured for web
          </li>
          <li>
            Make sure you've enabled Firebase Cloud Messaging in your Firebase
            console
          </li>
          <li>Check the browser console for detailed error messages</li>
          <li>
            Try using a different browser to rule out browser-specific issues
          </li>
        </ol>
      </div>
    </div>
  );
}
