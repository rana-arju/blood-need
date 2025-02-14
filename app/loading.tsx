import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background dark:bg-gray-900">
      <div className="text-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <h2 className="mt-4 text-xl font-semibold text-foreground dark:text-gray-200">
          Loading...
        </h2>
        <p className="mt-2 text-muted-foreground dark:text-gray-400">
          Please wait while we prepare your content.
        </p>
      </div>
    </div>
  );
}
