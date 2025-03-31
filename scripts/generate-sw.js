const fs = require("fs");
const path = require("path");

// Read the template service worker file
const swTemplatePath = path.join(
  __dirname,
  "../public/firebase-messaging-sw-template.js"
);
const swOutputPath = path.join(__dirname, "../public/firebase-messaging-sw.js");

// Read the template
const swTemplate = fs.readFileSync(swTemplatePath, "utf8");

// Replace placeholders with actual environment variables
const swContent = swTemplate
  .replace("YOUR_API_KEY", process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "")
  .replace(
    "YOUR_AUTH_DOMAIN",
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || ""
  )
  .replace("YOUR_PROJECT_ID", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "")
  .replace(
    "YOUR_STORAGE_BUCKET",
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || ""
  )
  .replace(
    "YOUR_MESSAGING_SENDER_ID",
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || ""
  )
  .replace("YOUR_APP_ID", process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "");

// Write the generated service worker file
fs.writeFileSync(swOutputPath, swContent);

console.log("Firebase Messaging Service Worker generated successfully!");
