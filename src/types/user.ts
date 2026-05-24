export type UserRole = "admin" | "user";

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
  nextPage: number | null;
  previousPage: number | null;
}

export interface UserProfile {
  id: string;
  name: string | null;
  username: string | null;
  avatarUrl?: string | null;
}

export interface UserItem {
  id: string;
  clerkId: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;

  profile: UserProfile | null;

  enrollsCount: number;
  progressCount: number;
  bookmarksCount: number;
  achievementsCount: number;
  notificationsCount: number;
  quizAttemptsCount: number;

  streak: {
    currentStreak: number;
    longestStreak: number;
  };
}

export interface UsersResponse {
  success: boolean;
  users: {
    items: UserItem[];

    stats: {
      totalUsers: number;
      totalAdmins: number;
      totalNormalUsers: number;
    };

    paginations: Pagination;
  };
}
