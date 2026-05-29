import { z } from "zod";

export const achievementTypeSchema = z.enum([
  "course_completion",
  "streak",
  "quiz_master",
  "first_login",
  "milestone",
]);

export const achievementRaritySchema = z.enum(["common", "rare", "epic", "legendary"]);

export const achievementSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required" })
    .max(150, { message: "Title must be less than 150 characters" }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description must be less than 500 characters" }),
  achievementType: achievementTypeSchema,
  achievementRarity: achievementRaritySchema,
});

export type AchievementFormValues = z.infer<typeof achievementSchema>;

export const grantAchievementSchema = z.object({
  userId: z.string().min(1, { message: "User id is required" }),
});

export type GrantAchievementFormValues = z.infer<typeof grantAchievementSchema>;
