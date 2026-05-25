import type { Pagination } from "./user.type";

export interface EnrollUser {
  id: string;
  email: string;
  profile: {
    name: string | null;
    username: string | null;
    avatarUrl: string | null;
  };
}

export interface EnrollCategory {
  id: string;
  name: string;
  imageUrl: string;
  imagePublicId: string;
  visibility: "public" | "private";
}

export interface EnrollCourse {
  id: string;
  title: string;
  thumbnailUrl: string;
  category: EnrollCategory;
}

export interface EnrollItem {
  id: string;
  completed: boolean;
  finishedLessons: number;
  startedAt: string;
  finishedAt: string | null;
  userId: string;
  courseId: string;
  user: EnrollUser;
  course: EnrollCourse;
}

export interface EnrollsResponse {
  success: boolean;
  result: {
    items: EnrollItem[];
    paginations: Pagination;
  };
}

export interface UseEnrollsParams {
  page?: number;
  limit?: number;
  courseId?: string;
  userId?: string;
  completed?: boolean;
}
