import type { Pagination } from "./user.type";

export interface BookmarkUser {
  id: string;
  email: string;
  profile: {
    name: string | null;
    username: string | null;
    avatarUrl: string | null;
  } | null;
}

export interface BookmarkCategory {
  id: string;
  name: string;
  imageUrl: string;
}

export interface BookmarkCourse {
  id: string;
  title: string;
  thumbnailUrl: string;
  category: BookmarkCategory;
}

export interface BookmarkItem {
  id: string;
  createdAt: string;
  user: BookmarkUser;
  course: BookmarkCourse;
}

export interface BookmarksResponse {
  success: boolean;
  result: {
    items: BookmarkItem[];
    paginations: Pagination;
  };
}

export interface UseBookmarksParams {
  courseId: string;
  page?: number;
  limit?: number;
  userId?: string;
}
