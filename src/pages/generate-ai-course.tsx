import { useState, type ChangeEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ImagePlus, Loader2, Upload, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { generateAICourseSchema, type GenerateAICourseFormValues } from "@/schemas/course.schema";
import { useCategories } from "@/hooks/use-categories";
import { useGenerateAICourse } from "@/hooks/use-courses";
import { useUploadImage } from "@/hooks/use-uploads";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { CourseFormSkeleton } from "@/components/skeleton/course-form-skeleton";

const GenerateAICoursePage = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<GenerateAICourseFormValues>({
    resolver: zodResolver(generateAICourseSchema),
    defaultValues: {
      topic: "",
      difficulty: "beginner",
      lessonCount: "",
      categoryId: "",
    },
  });

  const { data: categories, isFetching, isLoading } = useCategories();

  const uploadImage = useUploadImage();

  const generateCourse = useGenerateAICourse();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFile(file);

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const removeImage = () => {
    setFile(null);

    setPreview(null);
  };

  const onSubmit = (values: GenerateAICourseFormValues) => {
    if (!file) return toast.error("Please upload thumbnail");

    uploadImage.mutate(file, {
      onError: (error) => toast.error(error.message),
      onSuccess: (res) => {
        generateCourse.mutate(
          {
            ...values,
            thumbnailUrl: res.file.url,
            thumbnailPublicId: res.file.public_id,
            lessonCount: Number(values.lessonCount),
          },
          {
            onError: (error) => toast.error(error.message),
            onSuccess: (data) => {
              form.reset();
              setPreview(null);
              setFile(null);
              toast.success(data.message);
            },
          },
        );
      },
    });
  };

  if (isLoading || isFetching) {
    return <CourseFormSkeleton />;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="space-y-3">
          <CardTitle className="text-2xl font-bold">Generate AI Course</CardTitle>
          <CardDescription className="mt-1">Generate a course using AI.</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FieldGroup>
              <div>
                <Label className="mb-3">Course Thumbnail</Label>
                <div className="space-y-4">
                  {!preview ? (
                    <Label
                      htmlFor="image-upload"
                      className={cn(
                        "group flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all",
                        "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/40",
                      )}
                    >
                      <div className="flex flex-col items-center justify-center space-y-4 p-6 text-center">
                        <div className="flex size-16 items-center justify-center rounded-full bg-muted">
                          <ImagePlus className="size-8 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">Upload course thumbnail</p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            PNG, JPG, WEBP up to 5MB
                          </p>
                        </div>
                        <Button type="button" variant="secondary" className="pointer-events-none">
                          <Upload className="mr-2 size-4" />
                          Choose Image
                        </Button>
                      </div>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </Label>
                  ) : (
                    <div className="relative overflow-hidden rounded-2xl border">
                      <img src={preview} alt="Preview" className="h-[320px] w-full object-cover" />
                      <div className="absolute inset-0 bg-black/0 transition-all hover:bg-black/20" />
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        className="absolute right-3 top-3 rounded-full"
                        onClick={removeImage}
                      >
                        <X className="size-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <Controller
                control={form.control}
                name="topic"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Course Topic</FieldLabel>
                    <Textarea
                      id={field.name}
                      placeholder="Enter course topic"
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="lessonCount"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Course Number Lessons</FieldLabel>
                    <Input
                      type="number"
                      placeholder="Enter course lessons count"
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
                name="categoryId"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Course Category</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select course category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {categories.categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="difficulty"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Course Difficulty</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select course difficulty" />
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
              <Button
                type="submit"
                disabled={generateCourse.isPending || uploadImage.isPending}
                className="min-w-[160px]"
              >
                {generateCourse.isPending || uploadImage.isPending ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Course"
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenerateAICoursePage;
