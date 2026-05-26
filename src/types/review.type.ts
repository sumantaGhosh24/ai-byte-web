import type { Pagination } from "./user.type";

export interface ReviewUser {
  id: string;
  email: string;
  profile: {
    name: string | null;
    username: string | null;
    avatarUrl: string | null;
  } | null;
}

export interface ReviewCourse {
  id: string;
  title: string;
  thumbnailUrl: string;
  category: {
    id: string;
    name: string;
  };
}

export interface ReviewItem {
  id: string;
  message: string;
  rating: number;
  createdAt: string;
  user: ReviewUser;
  course: ReviewCourse;
}

export interface ReviewsResponse {
  success: boolean;
  result: {
    items: ReviewItem[];
    paginations: Pagination;
  };
}

export interface UseReviewsParams {
  courseId: string;
  page?: number;
  limit?: number;
  userId?: string;
}
