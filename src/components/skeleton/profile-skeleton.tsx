import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="space-y-6 p-4 md:p-6 my-10">
      <Card className="overflow-hidden">
        <div className="h-32 bg-muted" />
        <CardContent className="relative pt-0">
          <div className="-mt-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <Skeleton className="h-32 w-32 rounded-full border-4 border-background" />
              <div className="space-y-3">
                <div className="space-y-2">
                  <Skeleton className="h-8 w-55" />
                  <Skeleton className="h-4 w-35" />
                  <Skeleton className="h-4 w-50" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-28 rounded-full" />
                </div>
              </div>
            </div>
            <Card className="w-full lg:w-[320px]">
              <CardHeader className="pb-3">
                <Skeleton className="h-6 w-30" />
                <Skeleton className="h-4 w-45" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-3 w-full" />
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-25" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-12 w-12 rounded-xl" />
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i}>
            <CardContent className="flex items-center justify-between p-6">
              <div className="space-y-3">
                <Skeleton className="h-4 w-30" />
                <Skeleton className="h-8 w-17.5" />
                <Skeleton className="h-3 w-25" />
              </div>
              <Skeleton className="h-14 w-14 rounded-xl" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="space-y-6">
        <div className="flex gap-2">
          <Skeleton className="h-10 w-30" />
          <Skeleton className="h-10 w-30" />
          <Skeleton className="h-10 w-30" />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-45" />
                <Skeleton className="h-4 w-55" />
              </CardHeader>
              <CardContent className="space-y-5">
                {[...Array(4)].map((__, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-30" />
                      <Skeleton className="h-4 w-12.5" />
                    </div>
                    <Skeleton className="h-3 w-full" />
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-4 rounded-xl border p-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-25" />
                    <Skeleton className="h-8 w-15" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-35" />
                    <Skeleton className="h-8 w-15" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
