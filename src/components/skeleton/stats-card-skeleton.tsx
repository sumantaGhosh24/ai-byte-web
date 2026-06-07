import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const StatsCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div className="space-y-3">
          <Skeleton className="h-4 w-25" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-3 w-30" />
        </div>
        <Skeleton className="h-12 w-12 rounded-xl" />
      </CardContent>
    </Card>
  );
};

export default StatsCardSkeleton;
