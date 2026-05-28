import { useAuth } from "@clerk/react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { queryClient } from "@/providers/query-provider";
import type {
  CreateQuestionPayload,
  DeleteQuestionPayload,
  QuestionsResponse,
  UpdateQuestionPayload,
  UseQuestionsParams,
} from "@/types/question.type";

import { useApi } from "./use-api";

export function useQuestions({
  quizId,
  page = 1,
  limit = 10,
  search = "",
  difficulty,
  visibility,
  status,
}: UseQuestionsParams) {
  const api = useApi();
  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<QuestionsResponse>({
    queryKey: ["questions", quizId, page, limit, search, difficulty, visibility, status],
    queryFn: async () => {
      const response = await api.get(`/questions/${quizId}`, {
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
    enabled: !!quizId && isLoaded && isSignedIn,
    retry: false,
  });
}

export function useCreateQuestion() {
  const api = useApi();

  return useMutation({
    mutationFn: async (payload: CreateQuestionPayload) => {
      const response = await api.post("/questions", payload);
      return response.data;
    },
    retry: false,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["questions", variables.quizId] });
    },
  });
}

export function useUpdateQuestion() {
  const api = useApi();

  return useMutation({
    mutationFn: async ({ questionId, ...payload }: UpdateQuestionPayload) => {
      const response = await api.put(`/questions/${questionId}`, payload);
      return response.data;
    },
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
}

export function useDeleteQuestion() {
  const api = useApi();

  return useMutation({
    mutationFn: async ({ id }: DeleteQuestionPayload) => {
      const response = await api.delete(`/questions/${id}`);
      return response.data;
    },
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
  });
}
