import { Card, CardContent, CardHeader } from "../ui/card";
import { FieldGroup } from "../ui/field";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

export const CourseFormSkeleton = () => (
  <div className="mx-auto max-w-3xl">
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="space-y-3">
        <Skeleton className="h-8 w-48 rounded" />
        <Skeleton className="h-5 w-64 rounded" />
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        <form className="space-y-8">
          <FieldGroup>
            <div>
              <Skeleton className="mb-3 h-5 w-40 rounded" />
              <Skeleton className="rounded-2xl border-2 border-dashed min-h-[260px] w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-32 rounded" />
              <Skeleton className="h-10 w-full rounded" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-40 rounded" />
              <Skeleton className="h-20 w-full rounded" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-40 rounded" />
              <Skeleton className="h-10 w-full rounded" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-40 rounded" />
              <Skeleton className="h-10 w-[180px] rounded" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-40 rounded" />
              <Skeleton className="h-10 w-[180px] rounded" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-40 rounded" />
              <Skeleton className="h-10 w-[180px] rounded" />
            </div>
            <Skeleton className="h-10 w-[160px] rounded" />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  </div>
);
