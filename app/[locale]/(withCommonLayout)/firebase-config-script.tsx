"use client";

import Script from "next/script";

export default function FirebaseConfigScript() {
  // Create a safe version of the Firebase config for the client
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  return (
    <Script
      id="firebase-config"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          // Make Firebase config available to service worker
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
              registration.active.postMessage({
                type: 'FIREBASE_CONFIG',
                config: ${JSON.stringify(firebaseConfig)}
              });
            });
          }
        `,
      }}
    />
  );
}
