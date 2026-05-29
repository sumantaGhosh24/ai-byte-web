import { Skeleton } from "../ui/skeleton";

const DashboardSkeleton = () => (
  <div className="space-y-6 my-10">
    <div>
      <Skeleton className="h-8 w-1/4 mb-2" />
      <Skeleton className="h-5 w-1/3" />
    </div>
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[...Array(12)].map((_, idx) => (
          <Skeleton key={idx} className="h-24 w-full rounded-lg" />
        ))}
      </div>
      <div>
        <Skeleton className="h-6 w-1/6 mb-4" />
        <div className="space-y-5">
          {[...Array(3)].map((_, i) => (
            <div key={i}>
              <Skeleton className="h-4 w-1/4 mb-2" />
              <Skeleton className="h-3 w-full rounded" />
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div className="w-full h-[300px]">
          <Skeleton className="h-full w-full rounded" />
        </div>
        <div className="w-full h-[300px]">
          <Skeleton className="h-full w-full rounded" />
        </div>
        <div>
          <Skeleton className="h-6 w-1/5 mb-4" />
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-4 mb-2">
              {[...Array(5)].map((_, idx) => (
                <Skeleton key={idx} className="h-4 w-1/5" />
              ))}
            </div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Skeleton key={j} className="h-4 w-1/5" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <Skeleton className="h-6 w-1/5 mb-4" />
        <div className="grid grid-cols-2 gap-6">
          {[...Array(2)].map((_, idx) => (
            <Skeleton key={idx} className="h-20 w-full rounded" />
          ))}
        </div>
      </div>
      <div>
        <div className="w-full h-[300px] mb-4">
          <Skeleton className="h-full w-full rounded" />
        </div>
        <div>
          <Skeleton className="h-6 w-1/5 mb-4" />
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-8" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <Skeleton className="h-6 w-1/5 mb-4" />
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, idx) => (
            <Skeleton key={idx} className="h-20 w-full rounded" />
          ))}
        </div>
      </div>
      <div>
        <Skeleton className="h-6 w-1/4 mb-4" />
        <div className="border rounded-lg">
          <div className="flex gap-4 px-6 py-2">
            {[...Array(3)].map((_, idx) => (
              <Skeleton key={idx} className="h-4 w-1/5" />
            ))}
          </div>
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="flex gap-4 px-6 py-3">
              {[...Array(3)].map((_, j) => (
                <Skeleton key={j} className="h-4 w-1/5" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default DashboardSkeleton;
