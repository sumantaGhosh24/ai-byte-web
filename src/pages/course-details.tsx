import { useParams } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

import { useCourse } from "@/hooks/use-courses";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import CourseDetailsSkeleton from "@/components/skeleton/course-details-skeleton";
import StatsCard from "@/components/card/stats-card";
import CourseEnrollsTable from "@/components/tables/course-enrolls-table";
import CourseBookmarksTable from "@/components/tables/course-bookmarks-table";
import CourseReviewsTable from "@/components/tables/course-reviews-table";
import CourseLessonsTable from "@/components/tables/course-lessons-table";
import CourseQuizzesTable from "@/components/tables/course-quizzes-table";

const CourseDetailsPage = () => {
  const { id } = useParams();

  const { data, isLoading, isFetching, isError, error } = useCourse(id);

  const course = data?.course;

  if (isLoading || isFetching) {
    return <CourseDetailsSkeleton />;
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

  return (
    <div className="space-y-6 p-6">
      <Card className="overflow-hidden">
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="h-[350px] w-full object-cover"
        />
        <CardContent className="space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-bold capitalize">{course.title}</h1>
            <p className="mt-3 text-muted-foreground">{course.description}</p>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <img
              src={course.category.imageUrl}
              alt={course.category.name}
              className="h-12 w-12 rounded-md object-cover border"
            />
            <span className="text-lg font-semibold capitalize">{course.category.name}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Badge
              variant={
                course.difficulty === "beginner"
                  ? "success"
                  : course.difficulty === "intermediate"
                    ? "default"
                    : "destructive"
              }
            >
              {course.difficulty}
            </Badge>
            <Badge variant={course.aiGenerated ? "warning" : "success"}>
              {course.aiGenerated ? "True" : "False"}
            </Badge>
            <Badge>{course.duration}</Badge>
            <Badge variant={course.visibility === "public" ? "success" : "warning"}>
              {course.visibility}
            </Badge>
            <Badge
              variant={
                course.status === "completed"
                  ? "success"
                  : course.status === "processing"
                    ? "warning"
                    : course.status === "pending"
                      ? "warning"
                      : "destructive"
              }
            >
              {course.status}
            </Badge>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-4">
            <StatsCard title="Lessons" value={course.lessonsCount} />
            <StatsCard title="Bookmarks" value={course.bookmarksCount} />
            <StatsCard title="Quizzes" value={course.quizzesCount} />
            <StatsCard title="Enrolls" value={course.enrollsCount} />
            <StatsCard title="Reviews" value={course.reviewsCount} />
          </div>
        </CardContent>
      </Card>
      <Tabs defaultValue="lessons" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-[400px]">
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="enrolls">Enrolls</TabsTrigger>
          <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
        </TabsList>
        <TabsContent value="lessons">
          <CourseLessonsTable />
        </TabsContent>
        <TabsContent value="enrolls" className="space-y-6">
          <CourseEnrollsTable />
        </TabsContent>
        <TabsContent value="bookmarks" className="space-y-6">
          <CourseBookmarksTable />
        </TabsContent>
        <TabsContent value="reviews" className="space-y-6">
          <CourseReviewsTable />
        </TabsContent>
        <TabsContent value="quizzes">
          <CourseQuizzesTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseDetailsPage;
