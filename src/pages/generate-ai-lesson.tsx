import { useState, type ChangeEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ImagePlus, Loader2, Upload, Video, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { generateAILessonSchema, type GenerateAILessonFormValues } from "@/schemas/lesson.schema";
import { useGenerateLesson } from "@/hooks/use-lessons";
import { useUploadImage, useUploadVideo } from "@/hooks/use-uploads";
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

const GenerateAILessonPage = () => {
  const { id } = useParams();

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const form = useForm<GenerateAILessonFormValues>({
    resolver: zodResolver(generateAILessonSchema),
    defaultValues: {
      topic: "",
      difficulty: "beginner",
    },
  });

  const uploadImage = useUploadImage();

  const uploadVideo = useUploadVideo();

  const generateLesson = useGenerateLesson();

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const removeThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview(null);
  };

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const removeVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
  };

  const onSubmit = (values: GenerateAILessonFormValues) => {
    if (!thumbnailFile) {
      return toast.error("Please upload thumbnail");
    }

    if (!videoFile) {
      return toast.error("Please upload lesson video");
    }

    uploadImage.mutate(thumbnailFile, {
      onSuccess: (thumbnail) => {
        uploadVideo.mutate(videoFile, {
          onSuccess: (video) => {
            generateLesson.mutate(
              {
                ...values,
                thumbnailUrl: thumbnail.file.url,
                thumbnailPublicId: thumbnail.file.public_id,
                videoUrl: video.file.url,
                videoPublicId: video.file.public_id,
                courseId: id!,
              },
              {
                onSuccess: (data) => {
                  form.reset();
                  setThumbnailPreview(null);
                  setVideoPreview(null);
                  toast.success(data.message);
                },
                onError: (error) => toast.error(error.message),
              },
            );
          },
          onError: (error) => toast.error(error.message),
        });
      },
      onError: (error) => toast.error(error.message),
    });
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Generate AI Lesson</CardTitle>
              <CardDescription className="mt-1">Generate a lesson using AI.</CardDescription>
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
              <div>
                <Label className="mb-3">Lesson Thumbnail</Label>
                <div className="space-y-4">
                  {!thumbnailPreview ? (
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
                          <p className="font-medium">Upload lesson thumbnail</p>
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
                        onChange={handleThumbnailChange}
                      />
                    </Label>
                  ) : (
                    <div className="relative overflow-hidden rounded-2xl border">
                      <img
                        src={thumbnailPreview}
                        alt="Preview"
                        className="h-[320px] w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 transition-all hover:bg-black/20" />
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        className="absolute right-3 top-3 rounded-full"
                        onClick={removeThumbnail}
                      >
                        <X className="size-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Label className="mb-3">Lesson Video</Label>
                <div className="space-y-4">
                  {!videoPreview ? (
                    <Label
                      htmlFor="video-upload"
                      className={cn(
                        "group flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed",
                        "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/40",
                      )}
                    >
                      <div className="flex flex-col items-center justify-center space-y-4 p-6 text-center">
                        <div className="flex size-16 items-center justify-center rounded-full bg-muted">
                          <Video className="size-8 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">Upload lesson video</p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            MP4, MOV, WEBM up to 500MB
                          </p>
                        </div>
                        <Button type="button" variant="secondary" className="pointer-events-none">
                          <Upload className="mr-2 size-4" />
                          Choose Video
                        </Button>
                      </div>
                      <Input
                        id="video-upload"
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={handleVideoChange}
                      />
                    </Label>
                  ) : (
                    <div className="relative overflow-hidden rounded-2xl border">
                      <video
                        src={videoPreview}
                        controls
                        className="max-h-[500px] w-full bg-black"
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        className="absolute right-3 top-3 rounded-full"
                        onClick={removeVideo}
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
                    <FieldLabel htmlFor={field.name}>Lesson Topic</FieldLabel>
                    <Textarea
                      id={field.name}
                      placeholder="Enter lesson topic"
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
                    <FieldLabel htmlFor={field.name}>Lesson Difficulty</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select lesson difficulty" />
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
                disabled={
                  generateLesson.isPending || uploadImage.isPending || uploadVideo.isPending
                }
                className="min-w-[160px]"
              >
                {generateLesson.isPending || uploadImage.isPending || uploadVideo.isPending ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Lesson"
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenerateAILessonPage;
