export interface UserProps {
  id: string;
  clerkId: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
  profile: {
    id: string;
    avatarPublicId: string | null;
    avatarUrl: string | null;
    bio: string | null;
    dailyReminderEnabled: boolean;
    dailyReminderTime: string | null;
    emailNotificationsEnabled: boolean;
    goals: string[];
    interests: string[];
    lessonReminderEnabled: boolean;
    name: string | null;
    onboardingCompleted: boolean;
    pushNotificationsEnabled: boolean;
    streakReminderEnabled: boolean;
    userId: string;
    username: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ProfileResponse {
  success: boolean;
  user: UserProps;
}

export interface UserResponse {
  success: boolean;
  user: {
    lastEnroll: string | null;
    lastProgress: string | null;
    stats: {
      achievementsCount: number;
      averageScore: number;
      currentStreak: number;
      enrollsCount: number;
      finishedCoursesCount: number;
      finishedLessonsCount: number;
      highestScore: number;
      longestStreak: number;
      lowestScore: number;
      progressCount: number;
      totalAnswerSubmissions: number;
      totalBookmarks: number;
      totalNotifications: number;
      totalQuizAttempts: number;
    };
    user: UserProps;
    xp: {
      achievementXP: number;
      bookmarkXP: number;
      courseXP: number;
      firstLoginXP: number;
      lessonXP: number;
      onboardingXP: number;
      quizXP: number;
      streakXP: number;
      totalXP: number;
    };
  };
}
