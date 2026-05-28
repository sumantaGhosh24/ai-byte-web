import type { Pagination } from "./user.type";

export type QuizDifficulty = "beginner" | "intermediate" | "expert";

export type QuizVisibility = "public" | "private";

export type QuizStatus = "pending" | "processing" | "completed" | "failed";

export interface QuizItem {
  id: string;
  courseId: string;
  title: string;
  description: string;
  difficulty: QuizDifficulty;
  visibility: QuizVisibility;
  status: QuizStatus;
  passingScore: number;
  aiGenerated: boolean;
  questionsCount: number;
  attemptsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface QuizResponse {
  success: boolean;
  quiz: QuizItem & {
    _count: {
      questions: number;
      attemts: number;
    };
  };
}

export interface QuizzesResponse {
  success: boolean;
  result: {
    items: QuizItem[];
    paginations: Pagination;
  };
}

export interface UseQuizzesParams {
  courseId: string;
  page?: number;
  limit?: number;
  search?: string;
  difficulty?: QuizDifficulty;
  visibility?: QuizVisibility;
  status?: QuizStatus;
}

export interface CreateQuizPayload {
  courseId: string;
  title: string;
  description: string;
  difficulty: QuizDifficulty;
  visibility: QuizVisibility;
  passingScore: number;
}

export interface UpdateQuizPayload {
  id: string;
  courseId?: string;
  title?: string;
  description?: string;
  difficulty?: QuizDifficulty;
  visibility?: QuizVisibility;
  status?: QuizStatus;
  passingScore?: number;
}

export interface GenerateQuizPayload {
  topic: string;
  difficulty: QuizDifficulty;
  courseId: string;
  numberOfQuestions: number;
}
