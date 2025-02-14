import { Loader2 } from "lucide-react";

export default function PageLoading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h3 className="mt-2 text-lg font-medium text-foreground dark:text-gray-200">
          Loading page...
        </h3>
      </div>
    </div>
  );
}
