import { useEffect, useState, type ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AlertTriangle, ImagePlus, Loader2, Upload, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { achievementSchema, type AchievementFormValues } from "@/schemas/achievement.schema";
import { useAchievement, useUpdateAchievement } from "@/hooks/use-achievements";
import { useDestroyFile, useUploadImage } from "@/hooks/use-uploads";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CourseFormSkeleton } from "@/components/skeleton/course-form-skeleton";

const UpdateAchievementPage = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } = useAchievement(id);

  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<AchievementFormValues>({
    resolver: zodResolver(achievementSchema),
    defaultValues: {
      title: "",
      description: "",
      achievementType: "course_completion",
      achievementRarity: "common",
    },
  });

  useEffect(() => {
    if (data?.achievement?.id) {
      form.reset({
        title: data?.achievement?.title,
        description: data?.achievement?.description,
        achievementType: data?.achievement?.achievementType,
        achievementRarity: data?.achievement?.achievementRarity,
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreview(data?.achievement?.badgeImage);
    }
  }, [data, form]);

  const uploadImage = useUploadImage();

  const deleteImage = useDestroyFile();

  const updateAchievement = useUpdateAchievement();

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

  const onSubmit = (values: AchievementFormValues) => {
    if (file) {
      deleteImage.mutate(
        { public_id: data?.achievement?.badgeImagePublicId },
        {
          onError: (error) => toast.error(error.message),
        },
      );
      uploadImage.mutate(file, {
        onError: (error) => toast.error(error.message),
        onSuccess: (res) => {
          updateAchievement.mutate(
            {
              ...values,
              badgeImage: res.file.url,
              badgeImagePublicId: res.file.public_id,
              id: data?.achievement?.id,
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
    } else {
      updateAchievement.mutate(
        { ...values, id: data?.achievement?.id },
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
    }
  };

  if (isLoading || isFetching) {
    return <CourseFormSkeleton />;
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
          <CardTitle className="text-2xl font-bold">Update Achievement</CardTitle>
          <CardDescription className="mt-1">
            Update a achievement with all settings.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FieldGroup>
              <div>
                <Label className="mb-3">Achievement Badge</Label>
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
                          <p className="font-medium">Upload achievement badge</p>
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
                name="title"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Achievement Title</FieldLabel>
                    <Input
                      type="text"
                      placeholder="Enter achievement title"
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
                    <FieldLabel htmlFor={field.name}>Achievement Description</FieldLabel>
                    <Textarea
                      id={field.name}
                      placeholder="Enter achievement description"
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="achievementType"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Achievement Type</FieldLabel>
                    <Select
                      value={field.value}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select achievement type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="course_completion">Course Completion</SelectItem>
                          <SelectItem value="streak">Streak</SelectItem>
                          <SelectItem value="quiz_master">Quiz Master</SelectItem>
                          <SelectItem value="first_login">First Login</SelectItem>
                          <SelectItem value="milestone">Milestone</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="achievementRarity"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Achievement Rarity</FieldLabel>
                    <Select
                      value={field.value}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select achievement rarity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="common">Common</SelectItem>
                          <SelectItem value="rare">Rare</SelectItem>
                          <SelectItem value="epic">Epic</SelectItem>
                          <SelectItem value="legendary">Legendary</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Button
                type="submit"
                disabled={updateAchievement.isPending || uploadImage.isPending}
                className="min-w-[160px]"
              >
                {updateAchievement.isPending || uploadImage.isPending ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Achievement"
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateAchievementPage;
