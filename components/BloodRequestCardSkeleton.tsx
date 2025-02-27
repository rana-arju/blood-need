import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const BloodRequestCardSkeleton: React.FC = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="flex items-center space-x-4 p-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2 flex-grow">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </CardContent>
    </Card>
  );
};

export default BloodRequestCardSkeleton;
