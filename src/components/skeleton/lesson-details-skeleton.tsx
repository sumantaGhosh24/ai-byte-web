import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const LessonDetailsSkeleton = () => (
  <div className="space-y-6 p-6">
    <Card className="overflow-hidden">
      <Skeleton className="h-[350px] w-full" />
      <CardContent className="space-y-6 p-6">
        <div>
          <Skeleton className="h-8 w-2/5 mb-2" />
          <Skeleton className="h-32 w-full" />
        </div>
        <div className="flex flex-wrap gap-3 mt-6">
          <Skeleton className="h-6 w-20 rounded" />
          <Skeleton className="h-6 w-16 rounded" />
          <Skeleton className="h-6 w-14 rounded" />
          <Skeleton className="h-6 w-20 rounded" />
          <Skeleton className="h-6 w-24 rounded" />
          <Skeleton className="h-6 w-24 rounded" />
          <Skeleton className="h-6 w-32 rounded" />
          <Skeleton className="h-6 w-40 rounded" />
        </div>
        <div className="mt-4 space-y-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-36" />
        </div>
        <div className="mt-6">
          <Skeleton className="h-48 w-full rounded" />
        </div>
        <div className="mt-6">
          <Skeleton className="h-6 w-24 mb-2" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-5 rounded-full" />
            <div>
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-20 mt-2" />
              <Skeleton className="h-5 w-20 mt-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default LessonDetailsSkeleton;
