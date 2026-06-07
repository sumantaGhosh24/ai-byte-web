import { Link, useParams } from "react-router-dom";
import { AlertTriangle, Book } from "lucide-react";

import { useLesson } from "@/hooks/use-lessons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarkdownPreview from "@/components/editor/markdown-preview";
import LessonDetailsSkeleton from "@/components/skeleton/lesson-details-skeleton";
import LessonProgressTable from "@/components/tables/lesson-progress-table";

const LessonDetailsPage = () => {
  const { id } = useParams();

  const { data, isLoading, isFetching, isError, error } = useLesson(id);

  if (isLoading || isFetching) {
    return <LessonDetailsSkeleton />;
  }

  if (isError) {
    return (
      <Alert className="my-5">
        <AlertTriangle />
        <AlertTitle>Something went wrong!</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  const lesson = data?.lesson;

  return (
    <div className="space-y-6 p-6">
      <Card className="overflow-hidden">
        {lesson?.thumbnailUrl && (
          <img
            src={lesson?.thumbnailUrl}
            alt={lesson?.title}
            className="h-87.5 w-full object-cover"
          />
        )}
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold capitalize">{lesson?.title}</h1>
            <Button asChild>
              <Link to={`/course/${lesson?.courseId}`}>Back to Course</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <Badge
              variant={
                lesson?.difficulty === "beginner"
                  ? "success"
                  : lesson?.difficulty === "intermediate"
                    ? "default"
                    : "destructive"
              }
            >
              {lesson?.difficulty}
            </Badge>
            <Badge variant={lesson?.aiGenerated ? "warning" : "success"}>
              {lesson?.aiGenerated ? "True" : "False"}
            </Badge>
            <Badge>{lesson?.duration}</Badge>
            <Badge variant={lesson?.visibility === "public" ? "success" : "warning"}>
              {lesson?.visibility}
            </Badge>
            <Badge
              variant={
                lesson?.status === "completed"
                  ? "success"
                  : lesson?.status === "processing"
                    ? "warning"
                    : lesson?.status === "pending"
                      ? "warning"
                      : "destructive"
              }
            >
              {lesson?.status}
            </Badge>
            <Badge variant="outline">Order: {lesson?.orderIndex}</Badge>
            <Badge variant="secondary">Progress: {lesson?._count?.progress ?? 0}</Badge>
          </div>
          <MarkdownPreview content={lesson?.content as string} />
          {lesson?.videoUrl && (
            <div className="mt-6">
              <video controls className="w-full rounded shadow">
                <source src={lesson?.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Course</h2>
            {lesson?.course ? (
              <div className="flex items-center gap-3">
                <Book className="w-5 h-5" />
                <div>
                  <span className="font-medium">{lesson?.course?.title}</span>
                  <Badge
                    className="ml-2"
                    variant={lesson?.course?.visibility === "public" ? "success" : "warning"}
                  >
                    {lesson?.course?.visibility}
                  </Badge>
                  <Badge
                    className="ml-2"
                    variant={lesson?.course?.status === "completed" ? "success" : "warning"}
                  >
                    {lesson?.course?.status}
                  </Badge>
                </div>
              </div>
            ) : (
              <span>No parent course found</span>
            )}
          </div>
        </CardContent>
      </Card>
      <Tabs defaultValue="progress" className="space-y-6">
        <TabsList className="grid">
          <TabsTrigger value="progress">Progresses</TabsTrigger>
        </TabsList>
        <TabsContent value="progress">
          <LessonProgressTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LessonDetailsPage;
