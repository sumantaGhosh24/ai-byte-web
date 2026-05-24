import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <Card className="overflow-hidden">
        <div className="h-32 bg-muted" />
        <CardContent className="relative pt-0">
          <div className="-mt-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <Skeleton className="h-32 w-32 rounded-full border-4 border-background" />
              <div className="space-y-3">
                <div className="space-y-2">
                  <Skeleton className="h-8 w-[220px]" />
                  <Skeleton className="h-4 w-[140px]" />
                  <Skeleton className="h-4 w-[200px]" />
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
                <Skeleton className="h-6 w-[120px]" />
                <Skeleton className="h-4 w-[180px]" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-3 w-full" />
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-[100px]" />
                    <Skeleton className="h-4 w-[80px]" />
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
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-8 w-[70px]" />
                <Skeleton className="h-3 w-[100px]" />
              </div>
              <Skeleton className="h-14 w-14 rounded-xl" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="space-y-6">
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[120px]" />
          <Skeleton className="h-10 w-[120px]" />
          <Skeleton className="h-10 w-[120px]" />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-[180px]" />
                <Skeleton className="h-4 w-[220px]" />
              </CardHeader>
              <CardContent className="space-y-5">
                {[...Array(4)].map((__, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-[120px]" />
                      <Skeleton className="h-4 w-[50px]" />
                    </div>
                    <Skeleton className="h-3 w-full" />
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-4 rounded-xl border p-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-8 w-[60px]" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[140px]" />
                    <Skeleton className="h-8 w-[60px]" />
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
