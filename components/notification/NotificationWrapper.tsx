"use client";

import dynamic from "next/dynamic";

const NotificationPermission = dynamic(
  () => import("./NotificationPermission"),
  { ssr: false }
);

export default function NotificationWrapper() {
  return <NotificationPermission />;
}
