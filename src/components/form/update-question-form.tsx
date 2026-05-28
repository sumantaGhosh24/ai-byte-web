import { useState, useEffect } from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Pen } from "lucide-react";

import { useUpdateQuestion } from "@/hooks/use-questions";
import { questionSchema, type QuestionFormValues } from "@/schemas/question.schema";
import type { QuestionDifficulty, QuestionVisibility } from "@/types/question.type";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { ScrollArea } from "../ui/scroll-area";

interface UpdateQuestionFormProps {
  question: {
    id: string;
    question: string;
    explanation?: string | null;
    difficulty: string;
    visibility: string;
    status: string;
    options: {
      id?: string;
      text: string;
      isCorrect: boolean;
    }[];
  };
  disabled: boolean;
}

const UpdateQuestionForm = ({ question, disabled }: UpdateQuestionFormProps) => {
  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question: "",
      explanation: "",
      difficulty: "beginner",
      visibility: "private",
      options: [
        { text: "", isCorrect: true },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    },
  });

  useEffect(() => {
    if (question.id) {
      form.reset({
        question: question.question,
        explanation: question.explanation || "",
        difficulty: question.difficulty as QuestionDifficulty,
        visibility: question.visibility as QuestionVisibility,
        options:
          question.options.length === 4
            ? question.options.map((option) => ({
                text: option.text,
                isCorrect: option.isCorrect,
              }))
            : [
                { text: "", isCorrect: true },
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
                { text: "", isCorrect: false },
              ],
      });
    }
  }, [question, form]);

  const { fields } = useFieldArray({
    control: form.control,
    name: "options",
  });

  const [selectedCorrectIndex, setSelectedCorrectIndex] = useState<number>(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/incompatible-library
    const subscription = form.watch((values) => {
      const options = values.options ?? [];
      const idx = options.findIndex((option: { isCorrect: boolean }) => option && option.isCorrect);
      setSelectedCorrectIndex(idx >= 0 ? idx : 0);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const handleCorrectAnswerChange = (index: number) => {
    form.setValue(
      "options",
      form.getValues("options").map((opt, i) => ({
        ...opt,
        isCorrect: i === index,
      })),
    );
  };

  const updateQuestion = useUpdateQuestion();

  const onSubmit = (values: QuestionFormValues) => {
    updateQuestion.mutate(
      {
        ...values,
        questionId: question.id,
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
    <Sheet>
      <SheetTrigger asChild disabled={disabled}>
        <Button>
          <Pen className="mr-2 h-4 w-4" /> Update
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full md:w-1/2 p-5">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Update Question</SheetTitle>
          <SheetDescription className="mt-1">Update a question for this quiz.</SheetDescription>
        </SheetHeader>
        <Separator />
        <div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FieldGroup>
              <ScrollArea className="h-[700px]">
                <Controller
                  control={form.control}
                  name="question"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Question</FieldLabel>
                      <Input
                        type="text"
                        placeholder="Enter question"
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
                  name="explanation"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="my-5">
                      <FieldLabel htmlFor={field.name}>Explanation</FieldLabel>
                      <Textarea
                        id={field.name}
                        placeholder="Enter explanation"
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
                      <FieldLabel htmlFor={field.name}>Question Difficulty</FieldLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select question difficulty" />
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
                    <Field data-invalid={fieldState.invalid} className="my-5">
                      <FieldLabel htmlFor={field.name}>Question Visibility</FieldLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select question visibility" />
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
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Answer Options</h3>
                    <p className="text-muted-foreground text-sm">
                      Select exactly one correct answer.
                    </p>
                  </div>
                  <RadioGroup
                    value={String(selectedCorrectIndex)}
                    onValueChange={(value) => handleCorrectAnswerChange(Number(value))}
                  >
                    {fields.map((item, index) => (
                      <div key={item.id} className="flex items-center gap-3 rounded-lg border p-4">
                        <RadioGroupItem value={String(index)} />
                        <Controller
                          control={form.control}
                          name={`options.${index}.text`}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="flex-1">
                              <Input
                                placeholder={`Option ${index + 1}`}
                                aria-invalid={fieldState.invalid}
                                {...field}
                              />
                              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                          )}
                        />
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </ScrollArea>
              <Button type="submit" disabled={updateQuestion.isPending} className="min-w-[160px]">
                {updateQuestion.isPending ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Question"
                )}
              </Button>
            </FieldGroup>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UpdateQuestionForm;
