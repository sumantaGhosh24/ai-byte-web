import { Skeleton } from "@/components/ui/skeleton";

const QuizDetailsSkeleton = () => {
  return (
    <div className="space-y-6 p-6 my-10">
      <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="space-y-6 p-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-10 w-36" />
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-36 rounded-full" />
            <Skeleton className="h-6 w-32 rounded-full" />
            <Skeleton className="h-6 w-28 rounded-full" />
          </div>
        </div>
      </div>
      <div>
        <div className="grid w-full grid-cols-5 gap-4 lg:w-[400px] mb-4">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <div className="col-span-3" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-32 w-full rounded-md" />
          <Skeleton className="h-32 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default QuizDetailsSkeleton;
