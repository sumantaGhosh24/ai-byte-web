import { useAuth } from "@clerk/react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { queryClient } from "@/providers/query-provider";
import type {
  CreateQuizPayload,
  GenerateQuizPayload,
  QuizResponse,
  QuizzesResponse,
  UpdateQuizPayload,
  UseQuizzesParams,
} from "@/types/quiz.type";

import { useApi } from "./use-api";

export function useQuizzes({
  courseId,
  page = 1,
  limit = 10,
  search = "",
  difficulty,
  visibility,
  status,
}: UseQuizzesParams) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<QuizzesResponse>({
    queryKey: ["quizzes", courseId, page, limit, search, difficulty, visibility, status],
    queryFn: async () => {
      const response = await api.get(`/quizzes/${courseId}`, {
        params: {
          page,
          limit,
          search,
          difficulty,
          visibility,
          status,
        },
      });
      return response.data;
    },
    enabled: !!courseId && isLoaded && isSignedIn,
  });
}

export function useQuiz(id?: string) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<QuizResponse>({
    queryKey: ["quiz", id],
    queryFn: async () => {
      const response = await api.get(`/quiz/${id}`);
      return response.data;
    },
    enabled: !!id && isLoaded && isSignedIn,
  });
}

export function useCreateQuiz() {
  const api = useApi();

  return useMutation({
    mutationFn: async (payload: CreateQuizPayload) => {
      const response = await api.post("/quizzes", payload);
      return response.data;
    },
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["quizzes", variables.courseId] });
      await queryClient.invalidateQueries({ queryKey: ["course", variables.courseId] });
    },
  });
}

export function useUpdateQuiz() {
  const api = useApi();

  return useMutation({
    mutationFn: async ({ id, ...payload }: UpdateQuizPayload) => {
      const response = await api.put(`/quizzes/${id}`, payload);
      return response.data;
    },
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["quiz", variables.id] });
      await queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
  });
}

export function useDeleteQuiz() {
  const api = useApi();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const response = await api.delete(`/quizzes/${id}`);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
  });
}

export function useGenerateQuiz() {
  const api = useApi();

  return useMutation({
    mutationFn: async ({ courseId, ...payload }: GenerateQuizPayload) => {
      const response = await api.post(`/quizzes/generate/${courseId}`, payload);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
  });
}
