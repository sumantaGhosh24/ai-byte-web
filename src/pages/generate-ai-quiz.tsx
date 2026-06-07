import { Link, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { useGenerateQuiz } from "@/hooks/use-quizzes";
import { generateQuizSchema, type GenerateQuizFormValues } from "@/schemas/quiz.schema";
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
import { Textarea } from "@/components/ui/textarea";

const GenerateAIQuizPage = () => {
  const { id } = useParams();

  const form = useForm<GenerateQuizFormValues>({
    resolver: zodResolver(generateQuizSchema),
    defaultValues: {
      topic: "",
      difficulty: "beginner",
      numberOfQuestions: "",
    },
  });

  const generateQuiz = useGenerateQuiz();

  const onSubmit = (values: GenerateQuizFormValues) => {
    generateQuiz.mutate(
      {
        ...values,
        courseId: id!,
        numberOfQuestions: Number(values.numberOfQuestions),
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

  return (
    <div className="my-20">
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Generate AI Quiz</CardTitle>
              <CardDescription className="mt-1">Generate a quiz using AI.</CardDescription>
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FieldGroup>
              <Controller
                control={form.control}
                name="topic"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Quiz Topic</FieldLabel>
                    <Textarea
                      id={field.name}
                      placeholder="Enter quiz topic"
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="numberOfQuestions"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Quiz Questions Number</FieldLabel>
                    <Input
                      type="number"
                      placeholder="Enter quiz questions number"
                      min={1}
                      max={50}
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
                    <Select value={field.value} onValueChange={field.onChange}>
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
              <Button type="submit" disabled={generateQuiz.isPending} className="min-w-40">
                {generateQuiz.isPending ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Quiz"
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenerateAIQuizPage;
