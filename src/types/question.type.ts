import type { Pagination } from "./user.type";

export type QuestionDifficulty = "beginner" | "intermediate" | "expert";

export type QuestionVisibility = "public" | "private";

export type QuestionStatus = "pending" | "processing" | "completed" | "failed";

export interface UseQuestionsParams {
  page?: number;
  limit?: number;
  search?: string;
  difficulty?: QuestionDifficulty | null;
  visibility?: QuestionVisibility | null;
  status?: QuestionStatus | null;
  quizId?: string;
}

export interface QuestionOption {
  id?: string;
  text: string;
  isCorrect: boolean;
}

export interface QuestionItem {
  id: string;
  quizId: string;
  question: string;
  explanation?: string;
  correctAnswer: string;
  difficulty: QuestionDifficulty;
  visibility: QuestionVisibility;
  status: QuestionStatus;
  aiGenerated: boolean;
  answersCount: number;
  createdAt: string;
  updatedAt: string;
  options: QuestionOption[];
}

export interface QuestionsResponse {
  success: boolean;
  result: {
    items: QuestionItem[];
    paginations: Pagination;
  };
}

export interface CreateQuestionPayload {
  quizId: string;
  question: string;
  explanation?: string;
  difficulty: QuestionDifficulty;
  visibility: QuestionVisibility;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
}

export interface UpdateQuestionPayload {
  questionId: string;
  quizId?: string;
  question?: string;
  explanation?: string;
  difficulty?: QuestionDifficulty;
  visibility?: QuestionVisibility;
  options?: {
    text: string;
    isCorrect: boolean;
  }[];
}

export interface DeleteQuestionPayload {
  id: string;
}
