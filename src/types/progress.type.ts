import type { Pagination } from "./user.type";

export interface ProgressUser {
  id: string;
  email: string;
  profile: {
    name: string | null;
    username: string | null;
    avatarUrl: string | null;
  } | null;
}

export interface ProgressItem {
  id: string;
  completed: boolean;
  startedAt: string;
  finishedAt: string | null;

  userId: string;
  lessonId: string;

  user: ProgressUser;
}

export interface ProgressesResponse {
  success: boolean;
  result: {
    items: ProgressItem[];
    paginations: Pagination;
  };
}

export interface UseProgressesParams {
  lessonId: string;
  page?: number;
  limit?: number;
  userId?: string;
  completed?: boolean;
}
