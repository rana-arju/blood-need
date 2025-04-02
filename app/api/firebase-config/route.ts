import { NextResponse } from "next/server";

export async function GET() {
  // Create a JavaScript file that sets Firebase config in the service worker
  const configScript = `
    // This script injects Firebase config into the service worker
    self.FIREBASE_API_KEY = "${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}";
    self.FIREBASE_AUTH_DOMAIN = "${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}";
    self.FIREBASE_PROJECT_ID = "${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}";
    self.FIREBASE_STORAGE_BUCKET = "${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}";
    self.FIREBASE_MESSAGING_SENDER_ID = "${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}";
    self.FIREBASE_APP_ID = "${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}";
  `;

  return new NextResponse(configScript, {
    headers: {
      "Content-Type": "application/javascript",
    },
  });
}
