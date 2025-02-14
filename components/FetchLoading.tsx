import { Loader2 } from "lucide-react";

export default function FetchLoading() {
  return (
    <div className="flex items-center justify-center p-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2 text-sm text-muted-foreground dark:text-gray-400">
        Fetching data...
      </span>
    </div>
  );
}
