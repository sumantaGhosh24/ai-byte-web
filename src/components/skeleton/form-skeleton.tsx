import { Card, CardContent, CardHeader } from "../ui/card";
import { FieldGroup } from "../ui/field";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

interface FormSkeletonProps {
  count: number;
}

const FormSkeleton = ({ count }: FormSkeletonProps) => (
  <div className="my-20">
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="space-y-3">
        <Skeleton className="h-8 w-48 rounded" />
        <Skeleton className="h-5 w-64 rounded" />
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        <form className="space-y-8">
          <FieldGroup>
            {[...Array(count)].map((_, i) => (
              <div key={i}>
                <Skeleton className="mb-3 h-5 w-40 rounded" />
                <Skeleton className="rounded-2xl border-2 border-dashed min-h-[260px] w-full" />
              </div>
            ))}
            <Skeleton className="h-10 w-[160px] rounded" />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  </div>
);

export default FormSkeleton;
