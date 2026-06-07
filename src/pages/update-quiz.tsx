import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AlertTriangle, Loader2 } from "lucide-react";

import { useQuiz, useUpdateQuiz } from "@/hooks/use-quizzes";
import { quizSchema, type QuizFormValues } from "@/schemas/quiz.schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import FormSkeleton from "@/components/skeleton/form-skeleton";

const UpdateQuizPage = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } = useQuiz(id);

  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: "",
      description: "",
      passingScore: "",
      difficulty: "beginner",
      visibility: "private",
    },
  });

  useEffect(() => {
    if (data?.quiz.id) {
      form.reset({
        title: data?.quiz?.title,
        description: data?.quiz?.description,
        passingScore: String(data?.quiz?.passingScore),
        difficulty: data?.quiz?.difficulty,
        visibility: data?.quiz?.visibility,
      });
    }
  }, [data, form]);

  const updateQuiz = useUpdateQuiz();

  const onSubmit = (values: QuizFormValues) => {
    if (!id) return;

    updateQuiz.mutate(
      {
        ...values,
        passingScore: Number(values.passingScore),
        id,
        courseId: data?.quiz?.courseId,
      },
      {
        onSuccess: (data) => {
          form.reset();
          toast.success(data.message);
        },
        onError: (error) => toast.error(error.message),
      },
    );
  };

  if (isLoading || isFetching) {
    return <FormSkeleton count={5} />;
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
    <div className="my-20">
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Update Quiz</CardTitle>
              <CardDescription className="mt-1">Update a Quiz with all settings.</CardDescription>
            </div>
            <div>
              <Button asChild>
                <Link to={`/course/${data?.quiz?.courseId}`}>Back to Course</Link>
              </Button>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FieldGroup>
              <Controller
                control={form.control}
                name="title"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Quiz Title</FieldLabel>
                    <Input
                      type="text"
                      placeholder="Enter quiz title"
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Quiz Description</FieldLabel>
                    <Textarea
                      id={field.name}
                      placeholder="Enter quiz description"
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="passingScore"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Quiz Passing Score</FieldLabel>
                    <Input
                      type="text"
                      placeholder="Enter quiz passing score"
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="difficulty"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Quiz Difficulty</FieldLabel>
                    <Select
                      value={field.value}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-45">
                        <SelectValue placeholder="Select quiz difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="visibility"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Quiz Visibility</FieldLabel>
                    <Select
                      value={field.value}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-45">
                        <SelectValue placeholder="Select quiz visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Button type="submit" disabled={updateQuiz.isPending} className="min-w-40">
                {updateQuiz.isPending ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Quiz"
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateQuizPage;
