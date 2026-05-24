import { Card, CardContent, CardHeader } from "../ui/card";
import { FieldGroup } from "../ui/field";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

export const UpdateCategoryFormSkeleton = () => {
  return (
    <div className="mx-auto max-w-3xl">
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="space-y-3">
          <Skeleton className="h-8 w-40 rounded" />
          <Skeleton className="mt-2 h-5 w-[250px] rounded" />
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <form className="space-y-8">
            <FieldGroup>
              <div className="space-y-2">
                <Skeleton className="h-5 w-32 rounded" />
                <Skeleton className="h-10 w-full rounded" />
              </div>
              <div>
                <Skeleton className="h-5 w-32 rounded mb-3" />
                <Skeleton className="rounded-2xl border-2 border-dashed min-h-[260px] w-full" />
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
};
