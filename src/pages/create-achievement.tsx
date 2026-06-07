import { useState, type ChangeEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ImagePlus, Loader2, Upload, X } from "lucide-react";

import { achievementSchema, type AchievementFormValues } from "@/schemas/achievement.schema";
import { useCreateAchievement } from "@/hooks/use-achievements";
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

const CreateAchievementPage = () => {
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

  const uploadImage = useUploadImage();

  const createAchievement = useCreateAchievement();

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
    if (!file) return toast.error("Please upload thumbnail");

    uploadImage.mutate(file, {
      onError: (error) => toast.error(error.message),
      onSuccess: (res) => {
        if (!res.file) return;

        createAchievement.mutate(
          {
            ...values,
            badgeImage: res.file.url,
            badgeImagePublicId: res.file.public_id,
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

  return (
    <div className="my-20">
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="space-y-3">
          <CardTitle className="text-2xl font-bold">Create Achievement</CardTitle>
          <CardDescription className="mt-1">
            Add a new achievement with all settings.
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
                      className="group flex min-h-65 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/40"
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
                      <img src={preview} alt="Preview" className="h-80 w-full object-cover" />
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
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-45">
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
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-45">
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
                disabled={createAchievement.isPending || uploadImage.isPending}
                className="min-w-40"
              >
                {createAchievement.isPending || uploadImage.isPending ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Achievement"
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAchievementPage;
