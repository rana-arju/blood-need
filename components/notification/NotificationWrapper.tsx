"use client";

import FirebaseInit from "@/app/firebase-init";
import dynamic from "next/dynamic";

const NotificationPermission = dynamic(
  () => import("./NotificationPermission").then((mod) => mod.default),
  {
    ssr: false,
  }
);

export default function NotificationWrapper() {
  return (
    <>
      <NotificationPermission />
      <FirebaseInit />
    </>
  );
}
