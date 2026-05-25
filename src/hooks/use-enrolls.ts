import { useAuth } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import type { EnrollsResponse, UseEnrollsParams } from "@/types/enroll.type";

import { useApi } from "./use-api";

export function useEnrolls({
  page = 1,
  limit = 10,
  search = "",
  courseId,
  userId,
  completed,
}: UseEnrollsParams) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<EnrollsResponse>({
    queryKey: ["enrolls", page, limit, search, courseId, userId, completed],
    queryFn: async () => {
      const response: AxiosResponse<EnrollsResponse> = await api.get(`/enrolls/${courseId}`, {
        params: {
          page,
          limit,
          search,
          userId,
          completed,
        },
      });
      return response.data;
    },
    retry: false,
    enabled: !!courseId && isLoaded && isSignedIn,
  });
}
