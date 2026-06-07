import type { Pagination } from "./user.type";

export type AchievementType =
  | "course_completion"
  | "streak"
  | "quiz_master"
  | "first_login"
  | "milestone";

export type AchievementRarity = "common" | "rare" | "epic" | "legendary";

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  badgeImage: string;
  badgeImagePublicId: string;
  achievementType: AchievementType;
  achievementRarity: AchievementRarity;
  createdAt: string;
  updatedAt: string;
}

export interface UseAchievementsParams {
  page?: number;
  limit?: number;
  search?: string;
  achievementType?: AchievementType | null;
  achievementRarity?: AchievementRarity | null;
}

export interface UserAchievement {
  id: string;
  unlockedAt: string;
  userId: string;
  achievementId: string;
  achievement: AchievementItem;
}

export interface AchievementResponse {
  success: boolean;
  achievement: AchievementItem;
}

export interface AchievementsResponse {
  success: boolean;
  result: {
    items: AchievementItem[];
    paginations: Pagination;
  };
}

export interface UserAchievementsResponse {
  success: boolean;
  achievements: UserAchievement[];
}

export interface CreateAchievementPayload {
  title: string;
  description: string;
  badgeImage: string;
  badgeImagePublicId: string;
  achievementType: AchievementType;
  achievementRarity: AchievementRarity;
}

export interface UpdateAchievementPayload extends Partial<CreateAchievementPayload> {
  id: string;
}

export interface DeleteAchievementPayload {
  id: string;
}

export interface CreateUserAchievementPayload {
  userId: string;
  achievementId: string;
}
