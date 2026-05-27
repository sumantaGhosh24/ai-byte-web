import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { queryClient } from "@/providers/query-provider";
import type {
  CreateLessonPayload,
  DeleteLessonPayload,
  FixLessonOrderPayload,
  GenerateLessonPayload,
  LessonResponse,
  LessonsResponse,
  UpdateLessonPayload,
  UseLessonsParams,
} from "@/types/lesson.type";

import { useApi } from "./use-api";

export function useLessons({
  page = 1,
  limit = 10,
  search = "",
  difficulty,
  visibility,
  status,
  courseId,
}: UseLessonsParams) {
  const api = useApi();

  return useQuery<LessonsResponse>({
    queryKey: ["lessons", page, limit, search, difficulty, visibility, status, courseId],
    queryFn: async () => {
      const response: AxiosResponse<LessonsResponse> = await api.get(`/lessons/${courseId}`, {
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
    enabled: !!courseId,
    retry: false,
  });
}

export function useLesson(id?: string) {
  const api = useApi();

  return useQuery<LessonResponse>({
    queryKey: ["lesson", id],
    queryFn: async () => {
      const response: AxiosResponse<LessonResponse> = await api.get(`/lesson/${id}`);
      return response.data;
    },
    enabled: !!id,
    retry: false,
  });
}

export function useCreateLesson() {
  const api = useApi();

  return useMutation({
    mutationFn: async (payload: CreateLessonPayload) => {
      const response = await api.post("/lessons", payload);
      return response.data;
    },
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["lessons", variables.courseId] });
      await queryClient.invalidateQueries({ queryKey: ["course", variables.courseId] });
    },
  });
}

export function useUpdateLesson() {
  const api = useApi();

  return useMutation({
    mutationFn: async ({ id, ...payload }: UpdateLessonPayload) => {
      const response = await api.put(`/lessons/${id}`, payload);
      return response.data;
    },
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["lesson", variables.id] });
      await queryClient.invalidateQueries({ queryKey: ["lessons"] });
      await queryClient.invalidateQueries({ queryKey: ["course"] });
    },
  });
}

export function useDeleteLesson() {
  const api = useApi();

  return useMutation({
    mutationFn: async ({ id }: DeleteLessonPayload) => {
      const response = await api.delete(`/lessons/${id}`);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["lessons"] });
      await queryClient.invalidateQueries({ queryKey: ["course"] });
    },
  });
}

export function useFixLessonOrder() {
  const api = useApi();

  return useMutation({
    mutationFn: async ({ courseId, lessons }: FixLessonOrderPayload) => {
      const response = await api.patch(`/lessons/${courseId}/fix-order`, { lessons });
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["lessons"] });
    },
  });
}

export function useGenerateLesson() {
  const api = useApi();

  return useMutation({
    mutationFn: async ({ courseId, ...payload }: GenerateLessonPayload) => {
      const response = await api.post(`/lessons/generate/${courseId}`, payload);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["lessons"] });
    },
  });
}
