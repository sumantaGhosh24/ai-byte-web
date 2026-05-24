import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, { message: "Category name must be at least 2 characters" })
    .max(100, { message: "Category name must be at most 100 characters" }),
  visibility: z.enum(["public", "private"]),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
