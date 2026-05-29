export interface AdminDashboardResponse {
  success: boolean;
  dashboard: {
    overview: {
      totalUsers: number;
      totalAdmins: number;
      totalCourses: number;
      totalLessons: number;
      totalQuizzes: number;
      totalEnrollments: number;
      totalBookmarks: number;
      totalReviews: number;
      totalNotifications: number;
      totalNotificationTokens: number;
      totalAchievements: number;
      totalUnlockedAchievements: number;
    };
    users: {
      onboardingCompletedUsers: number;
      onboardingPendingUsers: number;
      pushEnabledUsers: number;
      latestUsers: {
        id: string;
        email: string;
        role: string;
        createdAt: string;
      }[];
    };
    engagement: {
      completedEnrollments: number;
      completionRate: number;
    };
    courses: {
      averageRating: number;
      status: {
        status: string;
        _count: number;
      }[];
      difficulty: {
        difficulty: string;
        _count: number;
      }[];
      topCourses: {
        id: string;
        title: string;
        enrollments: number;
        bookmarks: number;
        reviews: number;
        averageRating: number;
      }[];
    };
    lessons: {
      totalLessons: number;
      status: {
        status: string;
        _count: number;
      }[];
      difficulty: {
        difficulty: string;
        _count: number;
      }[];
    };
    quizzes: {
      averageScore: number;
      highestScore: number;
      status: {
        status: string;
        _count: number;
      }[];
      difficulty: {
        difficulty: string;
        _count: number;
      }[];
    };
    achievements: {
      unlocked: number;
      rarity: {
        achievementRarity: string;
        _count: number;
      }[];
      topAchievements: {
        id: string;
        title: string;
        unlocks: number;
      }[];
    };
    notifications: {
      unreadNotifications: number;
      activeTokens: number;
      distribution: {
        type: string;
        _count: number;
      }[];
    };
  };
}
