import { useAuth } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import type { ProgressesResponse, UseProgressesParams } from "@/types/progress.type";

import { useApi } from "./use-api";

export function useProgresses({
  lessonId,
  page = 1,
  limit = 10,
  userId,
  completed,
}: UseProgressesParams) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<ProgressesResponse>({
    queryKey: ["progresses", lessonId, page, limit, userId, completed],
    queryFn: async () => {
      const response: AxiosResponse<ProgressesResponse> = await api.get(`/progresses/${lessonId}`, {
        params: {
          page,
          limit,
          userId,
          completed,
        },
      });
      return response.data;
    },
    retry: false,
    enabled: !!lessonId && isLoaded && isSignedIn,
  });
}
