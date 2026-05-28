import { z } from "zod";

export const questionSchema = z.object({
  question: z
    .string()
    .min(1, { message: "Question must be at least 1 character" })
    .max(200, { message: "Question must be at most 200 characters" }),
  explanation: z.string().optional(),
  difficulty: z.enum(["beginner", "intermediate", "expert"]),
  visibility: z.enum(["public", "private"]),
  options: z
    .array(
      z.object({
        text: z.string().min(1, { message: "Option text must be at least 1 character" }),
        isCorrect: z.boolean(),
      }),
    )
    .length(4, { message: "Exactly 4 options are required" })
    .refine((options) => options.filter((option) => option.isCorrect).length === 1, {
      message: "Exactly one option must be correct",
      path: ["options"],
    }),
});

export type QuestionFormValues = z.infer<typeof questionSchema>;
