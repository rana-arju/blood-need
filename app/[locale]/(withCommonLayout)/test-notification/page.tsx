"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ServiceWorkerDebug from "@/components/debug/service-worker-debug";

export default function TestNotificationPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleEnableNotifications = async () => {
    setLoading(true);
    try {
     // const res = await enableNotifications();
      //setResult(res);
    } catch (error) {
      setResult({ success: false, error: String(error) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-2xl font-bold">Test Notifications</h1>

      <Card>
        <CardHeader>
          <CardTitle>Enable Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={handleEnableNotifications} disabled={loading}>
            {loading ? "Enabling..." : "Enable Notifications"}
          </Button>

          {result && (
            <div className="mt-4 p-4 rounded bg-gray-100 dark:bg-gray-800">
              <h3 className="font-semibold">Result:</h3>
              <pre className="text-xs mt-2 overflow-x-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>

      <ServiceWorkerDebug />
    </div>
  );
}
