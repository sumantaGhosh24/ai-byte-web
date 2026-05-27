import { z } from "zod";

export const lessonSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(200, { message: "Title must be at most 200 characters" }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters" })
    .max(10000, { message: "Content must be at most 10000 characters" }),
  duration: z.string().min(1, { message: "Duration is required" }),
  difficulty: z.enum(["beginner", "intermediate", "expert"]),
  visibility: z.enum(["public", "private"]),
});

export type LessonFormValues = z.infer<typeof lessonSchema>;

export const generateAILessonSchema = z.object({
  topic: z.string().min(3).max(200),
  difficulty: z.enum(["beginner", "intermediate", "expert"]),
});

export type GenerateAILessonFormValues = z.infer<typeof generateAILessonSchema>;
