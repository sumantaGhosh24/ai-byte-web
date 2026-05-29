import { Skeleton } from "../ui/skeleton";
import StatsCardSkeleton from "./stats-card-skeleton";

const CourseDetailsSkeleton = () => {
  return (
    <div className="space-y-6 p-6 my-10">
      <Skeleton className="h-[350px] w-full rounded-xl" />
      <div className="space-y-4">
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-[90%]" />
      </div>
      <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-4">
        {[...Array(5)].map((_, i) => (
          <StatsCardSkeleton key={i} />
        ))}
      </div>
      <div className="space-y-6">
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[120px]" />
          <Skeleton className="h-10 w-[120px]" />
          <Skeleton className="h-10 w-[120px]" />
          <Skeleton className="h-10 w-[120px]" />
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsSkeleton;
