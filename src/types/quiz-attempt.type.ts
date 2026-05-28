import type { Pagination } from "./user.type";

export interface UseQuizAttemptsParams {
  quizId: string;
  page?: number;
  limit?: number;
}

export interface QuizAttemptUser {
  id: string;
  email: string;
  profile: {
    name: string | null;
    username: string | null;
    avatarUrl: string | null;
  } | null;
}

export interface QuizAttemptItem {
  id: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  submittedAt: string;
  createdAt: string;
  userId: string;
  quizId: string;
  user: QuizAttemptUser;
}

export interface QuizAttemptsResponse {
  success: boolean;
  result: {
    items: QuizAttemptItem[];
    paginations: Pagination;
  };
}
