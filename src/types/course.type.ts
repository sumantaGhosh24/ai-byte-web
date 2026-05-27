import type { Pagination } from "./user.type";

export type CourseDifficulty = "beginner" | "intermediate" | "expert";

export type CourseVisibility = "public" | "private";

export type CourseStatus = "pending" | "processing" | "completed" | "failed";

export interface CourseCategory {
  id: string;
  name: string;
  imageUrl: string;
  imagePublicId: string;
  visibility: CourseVisibility;
}

export interface CourseItem {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  thumbnailPublicId?: string;
  duration: string;
  difficulty: CourseDifficulty;
  visibility: CourseVisibility;
  status: CourseStatus;
  aiGenerated: boolean;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  category: CourseCategory;
  lessonsCount: number;
  quizzesCount: number;
  enrollsCount: number;
  bookmarksCount: number;
  reviewsCount: number;
  averageReview: number;
}

export interface CoursesResponse {
  success: boolean;
  result: {
    items: CourseItem[];
    paginations: Pagination;
  };
}

export interface CourseResponse {
  success: boolean;
  course: CourseItem;
}

export interface UseCoursesParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  difficulty?: CourseDifficulty;
  visibility?: CourseVisibility;
  status?: CourseStatus;
}

export interface CreateCoursePayload {
  categoryId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  thumbnailPublicId: string;
  difficulty: CourseDifficulty;
  duration: string;
  visibility: CourseVisibility;
}

export interface UpdateCoursePayload {
  courseId: string;
  categoryId?: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  thumbnailPublicId?: string;
  difficulty?: CourseDifficulty;
  duration?: string;
  visibility?: CourseVisibility;
}

export interface DeleteCoursePayload {
  id: string;
}

export interface GenerateAICoursePayload {
  topic: string;
  categoryId: string;
  difficulty: CourseDifficulty;
  lessonCount: number;
  thumbnailUrl: string;
  thumbnailPublicId: string;
}

export interface GenerateAICourseResponse {
  success: boolean;
  message: string;
  data: {
    courseId: string;
    status: CourseStatus;
  };
}
