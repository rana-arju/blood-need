"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WifiOff, Home, RefreshCw } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="max-w-md mx-auto">
        <div className="mb-8 p-4 rounded-full bg-amber-100 dark:bg-amber-900/30 inline-block">
          <WifiOff className="h-12 w-12 text-amber-600 dark:text-amber-400" />
        </div>

        <h1 className="text-3xl font-bold mb-4">You're offline</h1>

        <p className="text-muted-foreground mb-8">
          It looks like you're not connected to the internet. Some features may
          be unavailable until you're back online.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline">
            <Link href="/" className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Go to Homepage
            </Link>
          </Button>

          <Button
            onClick={() => window.location.reload()}
            className="flex items-center"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
