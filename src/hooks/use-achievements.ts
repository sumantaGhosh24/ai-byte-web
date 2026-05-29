import { useAuth } from "@clerk/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import type {
  AchievementResponse,
  AchievementsResponse,
  CreateAchievementPayload,
  CreateUserAchievementPayload,
  DeleteAchievementPayload,
  UpdateAchievementPayload,
  UseAchievementsParams,
  UserAchievementsResponse,
} from "@/types/achievement.type";
import { queryClient } from "@/providers/query-provider";

import { useApi } from "./use-api";

export function useAchievements({
  page = 1,
  limit = 10,
  search = "",
  achievementType,
  achievementRarity,
}: UseAchievementsParams) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<AchievementsResponse>({
    queryKey: ["achievements", page, limit, search, achievementType, achievementRarity],
    queryFn: async () => {
      const response: AxiosResponse<AchievementsResponse> = await api.get("/achievements", {
        params: {
          page,
          limit,
          search,
          achievementType,
          achievementRarity,
        },
      });
      return response.data;
    },
    enabled: isLoaded && isSignedIn,
    retry: false,
  });
}

export function useAchievement(id?: string) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<AchievementResponse>({
    queryKey: ["achievement", id],
    queryFn: async () => {
      const response: AxiosResponse<AchievementResponse> = await api.get(`/achievements/${id}`);
      return response.data;
    },
    enabled: !!id && isLoaded && isSignedIn,
    retry: false,
  });
}

export function useUserAchievements(userId?: string) {
  const api = useApi();

  return useQuery<UserAchievementsResponse>({
    queryKey: ["user-achievements", userId],
    queryFn: async () => {
      const response: AxiosResponse<UserAchievementsResponse> = await api.get(
        `/users/${userId}/achievements`,
      );
      return response.data;
    },
    enabled: !!userId,
    retry: false,
  });
}

export function useCreateAchievement() {
  const api = useApi();

  return useMutation({
    mutationFn: async (payload: CreateAchievementPayload) => {
      const response = await api.post("/achievements", payload);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["achievements"] });
    },
  });
}

export function useUpdateAchievement() {
  const api = useApi();

  return useMutation({
    mutationFn: async ({ id, ...payload }: UpdateAchievementPayload) => {
      const response = await api.put(`/achievements/${id}`, payload);
      return response.data;
    },
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["achievements"] });
      await queryClient.invalidateQueries({ queryKey: ["achievement", variables.id] });
    },
  });
}

export function useDeleteAchievement() {
  const api = useApi();

  return useMutation({
    mutationFn: async ({ id }: DeleteAchievementPayload) => {
      const response = await api.delete(`/achievements/${id}`);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["achievements"] });
    },
  });
}

export function useGrantAchievement() {
  const api = useApi();

  return useMutation({
    mutationFn: async (payload: CreateUserAchievementPayload) => {
      const response = await api.post("/users/achievement", payload);
      return response.data;
    },
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["user-achievements", variables.userId] });
    },
  });
}

export function useRemoveAchievement() {
  const api = useApi();

  return useMutation({
    mutationFn: async (payload: CreateUserAchievementPayload) => {
      const response = await api.delete("/users/achievement", {
        data: payload,
      });
      return response.data;
    },
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["user-achievements", variables.userId] });
    },
  });
}
