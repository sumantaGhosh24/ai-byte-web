import type { AxiosResponse } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/react";

import { queryClient } from "@/providers/query-provider";
import type {
  CourseResponse,
  CoursesResponse,
  CreateCoursePayload,
  DeleteCoursePayload,
  GenerateAICoursePayload,
  GenerateAICourseResponse,
  UpdateCoursePayload,
  UseCoursesParams,
} from "@/types/course.type";

import { useApi } from "./use-api";

export function useCourses({
  page = 1,
  limit = 10,
  search = "",
  categoryId,
  difficulty,
  visibility,
  status,
}: UseCoursesParams) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<CoursesResponse>({
    queryKey: ["courses", page, limit, search, categoryId, difficulty, visibility, status],
    queryFn: async () => {
      const response: AxiosResponse<CoursesResponse> = await api.get("/courses", {
        params: {
          page,
          limit,
          search,
          categoryId,
          difficulty,
          visibility,
          status,
        },
      });

      return response.data;
    },
    enabled: isLoaded && isSignedIn,
    retry: false,
  });
}

export function useCourse(courseId?: string) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<CourseResponse>({
    queryKey: ["course", courseId],
    queryFn: async () => {
      const response: AxiosResponse<CourseResponse> = await api.get(`/courses/${courseId}`);

      return response.data;
    },
    enabled: !!courseId && isLoaded && isSignedIn,
    retry: false,
  });
}

export function useCreateCourse() {
  const api = useApi();

  return useMutation({
    mutationFn: async (payload: CreateCoursePayload) => {
      const response = await api.post("/courses", payload);
      return response.data;
    },
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useUpdateCourse() {
  const api = useApi();

  return useMutation({
    mutationFn: async ({ courseId, ...payload }: UpdateCoursePayload) => {
      const response = await api.put(`/courses/${courseId}`, payload);
      return response.data;
    },
    retry: false,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["courses"] });
      await queryClient.invalidateQueries({ queryKey: ["course", variables.courseId] });
    },
  });
}

export function useDeleteCourse() {
  const api = useApi();

  return useMutation({
    mutationFn: async ({ id }: DeleteCoursePayload) => {
      const response = await api.delete(`/courses/${id}`);
      return response.data;
    },
    retry: false,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["courses"] });
      await queryClient.invalidateQueries({ queryKey: ["course", variables.id] });
    },
  });
}

export function useGenerateAICourse() {
  const api = useApi();

  return useMutation({
    mutationFn: async (payload: GenerateAICoursePayload) => {
      const response: AxiosResponse<GenerateAICourseResponse> = await api.post(
        "/courses/generate",
        payload,
      );
      return response.data;
    },
    retry: false,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}
