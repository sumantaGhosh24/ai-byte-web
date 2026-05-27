import { Skeleton } from "../ui/skeleton";

const LessonOrderSkeleton = () => {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4 bg-background flex items-center gap-3">
            <div className="flex items-center justify-center">
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-muted">
                <Skeleton className="h-5 w-3 rounded bg-muted-foreground/40" />
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        ))}
      </div>
      <div>
        <Skeleton className="h-10 w-32 mt-2" />
      </div>
    </div>
  );
};

export default LessonOrderSkeleton;
