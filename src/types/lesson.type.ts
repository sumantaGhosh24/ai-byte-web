import type { Pagination } from "./user.type";

export type LessonDifficulty = "beginner" | "intermediate" | "expert";

export type LessonVisibility = "public" | "private";

export type LessonStatus = "pending" | "processing" | "completed" | "failed";

export interface LessonItem {
  id: string;
  title: string;
  content: string;
  thumbnailUrl?: string;
  thumbnailPublicId?: string;
  videoUrl?: string;
  videoPublicId?: string;
  duration: string;
  difficulty: LessonDifficulty;
  visibility: LessonVisibility;
  status: LessonStatus;
  aiGenerated: boolean;
  orderIndex: number;
  courseId: string;
  progressCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface LessonResponse {
  success: boolean;
  lesson: LessonItem & {
    course: {
      id: string;
      title: string;
      visibility: LessonVisibility;
      status: LessonStatus;
    };
    _count: {
      progress: number;
    };
  };
}

export interface LessonsResponse {
  success: boolean;
  result: {
    items: LessonItem[];
    paginations: Pagination;
  };
}

export interface UseLessonsParams {
  page?: number;
  limit?: number;
  search?: string;
  difficulty?: LessonDifficulty;
  visibility?: LessonVisibility;
  status?: LessonStatus;
  courseId: string;
}

export interface CreateLessonPayload {
  courseId: string;
  title: string;
  content: string;
  thumbnailUrl?: string;
  thumbnailPublicId?: string;
  videoUrl?: string;
  videoPublicId?: string;
  duration: string;
  difficulty: LessonDifficulty;
  visibility: LessonVisibility;
}

export interface UpdateLessonPayload extends Partial<CreateLessonPayload> {
  id: string;
}

export interface DeleteLessonPayload {
  id: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
}

export interface FixLessonOrderPayload {
  courseId: string;
  lessons: {
    id: string;
    orderIndex: number;
  }[];
}

export interface GenerateLessonPayload {
  courseId: string;
  topic: string;
  difficulty: LessonDifficulty;
  thumbnailUrl: string;
  thumbnailPublicId: string;
  videoUrl: string;
  videoPublicId: string;
}
