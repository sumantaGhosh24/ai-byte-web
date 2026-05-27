import { useEffect, useState, type ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AlertTriangle, ImagePlus, Loader2, Upload, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { categorySchema, type CategoryFormValues } from "@/schemas/category.schema";
import { useCategory, useUpdateCategory } from "@/hooks/use-categories";
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
import { UpdateCategoryFormSkeleton } from "@/components/skeleton/update-category-form-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const UpdateCategoryPage = () => {
  const { id } = useParams();

  const { data, isFetching, isLoading, isError, error } = useCategory(id);

  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      visibility: "public",
    },
  });

  useEffect(() => {
    if (data?.category) {
      form.reset({
        name: data.category.name,
        visibility: data?.category?.visibility,
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreview(data?.category?.imageUrl);
    }
  }, [data, form]);

  const updateCategory = useUpdateCategory();

  const uploadImage = useUploadImage();

  const deleteImage = useDestroyFile();

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

  const onSubmit = (values: CategoryFormValues) => {
    if (file) {
      deleteImage.mutate(
        { public_id: data.category.imagePublicId },
        {
          onError: (error) => toast.error(error.message),
        },
      );

      uploadImage.mutate(file, {
        onError: (error) => toast.error(error.message),
        onSuccess: (res) => {
          setFile(null);

          updateCategory.mutate(
            {
              id: data?.category?.id,
              name: values.name,
              imageUrl: res?.file?.url,
              imagePublicId: res?.file?.public_id,
              visibility: values.visibility,
            },
            {
              onError: (error) => toast.error(error.message),
              onSuccess: (data) => {
                form.reset();
                setPreview(null);
                toast.success(data.message);
              },
            },
          );
        },
      });
    } else {
      updateCategory.mutate(
        { id: data.category.id, name: values.name, visibility: values.visibility },
        {
          onError: (error) => toast.error(error.message),
          onSuccess: (data) => {
            toast.success(data.message);
          },
        },
      );
    }
  };

  if (isFetching || isLoading) {
    return <UpdateCategoryFormSkeleton />;
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
          <CardTitle className="text-2xl font-bold">Update Category</CardTitle>
          <CardDescription className="mt-1">
            Update a category image and visibility settings.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FieldGroup>
              <Controller
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Category Name</FieldLabel>
                    <Input
                      type="text"
                      placeholder="Enter name"
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <div>
                <Label className="mb-3">Category Image</Label>
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
                          <p className="font-medium">Upload category image</p>
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
                name="visibility"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Category Visibility</FieldLabel>
                    <Select
                      value={field.value}
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select category visibility" />
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
              <Button
                type="submit"
                disabled={
                  updateCategory.isPending || uploadImage.isPending || deleteImage.isPending
                }
                className="min-w-[160px]"
              >
                {updateCategory.isPending || uploadImage.isPending || deleteImage.isPending ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Category"
                )}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateCategoryPage;
