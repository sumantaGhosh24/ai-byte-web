import { Link, useParams } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

import { useQuiz } from "@/hooks/use-quizzes";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuizDetailsSkeleton from "@/components/skeleton/quiz-details-skeleton";
import QuizQuestionsTable from "@/components/tables/quiz-questions-table";
import QuizAttemptsTable from "@/components/tables/quiz-attempts-table";

const QuizDetailsPage = () => {
  const { id } = useParams();

  const { data, isLoading, isFetching, isError, error } = useQuiz(id);

  if (isLoading || isFetching) {
    return <QuizDetailsSkeleton />;
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

  const quiz = data.quiz;

  return (
    <div className="space-y-6 p-6">
      <Card className="overflow-hidden">
        <CardContent className="space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold capitalize">{quiz.title}</h1>
              <h1 className="text-lg capitalize">{quiz.description}</h1>
            </div>
            <Button asChild>
              <Link to={`/course/${quiz?.courseId}`}>Back to Course</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <Badge
              variant={
                quiz.difficulty === "beginner"
                  ? "success"
                  : quiz.difficulty === "intermediate"
                    ? "default"
                    : "destructive"
              }
            >
              {quiz.difficulty}
            </Badge>
            <Badge variant={quiz.aiGenerated ? "warning" : "success"}>
              {quiz.aiGenerated ? "True" : "False"}
            </Badge>
            <Badge variant={quiz.visibility === "public" ? "success" : "warning"}>
              {quiz.visibility}
            </Badge>
            <Badge
              variant={
                quiz.status === "completed"
                  ? "success"
                  : quiz.status === "processing"
                    ? "warning"
                    : quiz.status === "pending"
                      ? "warning"
                      : "destructive"
              }
            >
              {quiz.status}
            </Badge>
            <Badge variant="outline">Passing score: {quiz.passingScore}</Badge>
            <Badge variant="secondary">Questions: {quiz._count?.questions ?? 0}</Badge>
            <Badge variant="secondary">Attempts: {quiz._count?.attemts ?? 0}</Badge>
          </div>
        </CardContent>
      </Card>
      <Tabs defaultValue="questions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-[400px]">
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="attempts">Attempts</TabsTrigger>
        </TabsList>
        <TabsContent value="questions">
          <QuizQuestionsTable />
        </TabsContent>
        <TabsContent value="attempts">
          <QuizAttemptsTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuizDetailsPage;
