import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="border rounded-md">
          <div className="p-4 border-b">
            <div className="grid grid-cols-6 gap-4">
              <Skeleton className="h-5 col-span-2" />
              <Skeleton className="h-5 col-span-1" />
              <Skeleton className="h-5 col-span-1" />
              <Skeleton className="h-5 col-span-1" />
              <Skeleton className="h-5 col-span-1" />
            </div>
          </div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-4 border-b">
              <div className="grid grid-cols-6 gap-4">
                <Skeleton className="h-5 col-span-2" />
                <Skeleton className="h-5 col-span-1" />
                <Skeleton className="h-5 col-span-1" />
                <Skeleton className="h-5 col-span-1" />
                <Skeleton className="h-5 col-span-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
