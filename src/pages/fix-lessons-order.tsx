import { Link, useParams } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

import { useLessons } from "@/hooks/use-lessons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import LessonOrderSkeleton from "@/components/skeleton/lesson-order-skeleton";
import LessonOrderManager from "@/components/order/lesson-order-manager";

const FixLessonsOrderPage = () => {
  const { id } = useParams();

  const {
    data: lessons,
    isFetching,
    isLoading,
    isError,
    error,
  } = useLessons({ page: 1, limit: 50, courseId: id });

  if (isLoading || isFetching) {
    return <LessonOrderSkeleton />;
  }

  if (isError) {
    return (
      <Alert>
        <AlertTriangle />
        <AlertTitle>Something went wrong!</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Fix Lessons Order</CardTitle>
              <CardDescription className="mt-1">Fix course lessons order.</CardDescription>
            </div>
            <div>
              <Button asChild>
                <Link to={`/course/${id}`}>Back to Course</Link>
              </Button>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <LessonOrderManager courseId={id} lessons={lessons?.result?.items ?? []} />
        </CardContent>
      </Card>
    </div>
  );
};

export default FixLessonsOrderPage;
