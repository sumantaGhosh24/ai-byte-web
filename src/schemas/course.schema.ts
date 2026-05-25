import { z } from "zod";

export const courseSchema = z.object({
  categoryId: z.string().min(1),
  title: z.string().min(3).max(200),
  description: z.string().min(10).max(5000),
  difficulty: z.enum(["beginner", "intermediate", "expert"]),
  duration: z.string().min(1),
  visibility: z.enum(["public", "private"]),
});

export type CourseFormValues = z.infer<typeof courseSchema>;

export const generateAICourseSchema = z.object({
  topic: z.string().min(3).max(200),
  categoryId: z.string().min(1),
  difficulty: z.enum(["beginner", "intermediate", "expert"]),
  lessonCount: z
    .string()
    .min(1, { message: "Lesson count is required" })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) < 10, {
      message: "Lesson count must be a valid number greater than 0 and less that 10",
    }),
});

export type GenerateAICourseFormValues = z.infer<typeof generateAICourseSchema>;
