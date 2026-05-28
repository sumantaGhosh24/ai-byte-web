import { z } from "zod";

export const quizSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required" })
    .max(200, { message: "Title must not exceed 200 characters" }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description must not exceed 500 characters" }),
  passingScore: z
    .string()
    .min(1, { message: "Passing score is required" })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) < 100, {
      message: "Passing score must be a valid number greater than 0 and less that 100",
    }),
  difficulty: z.enum(["beginner", "intermediate", "expert"]),
  visibility: z.enum(["public", "private"]),
});

export type QuizFormValues = z.infer<typeof quizSchema>;

export const generateQuizSchema = z.object({
  topic: z
    .string()
    .trim()
    .min(3, { message: "Topic must be at least 3 characters" })
    .max(200, { message: "Topic must not exceed 200 characters" }),
  difficulty: z.enum(["beginner", "intermediate", "expert"]),
  numberOfQuestions: z
    .string()
    .min(1, { message: "Number of questions is required" })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) < 25, {
      message: "Number of questions must be a valid number greater than 0 and less that 25",
    }),
});

export type GenerateQuizFormValues = z.infer<typeof generateQuizSchema>;
