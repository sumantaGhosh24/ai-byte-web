import { useAuth } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import type { ReviewsResponse, UseReviewsParams } from "@/types/review.type";

import { useApi } from "./use-api";

export function useReviews({ courseId, page = 1, limit = 10, userId }: UseReviewsParams) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<ReviewsResponse>({
    queryKey: ["reviews", courseId, page, limit, userId],
    queryFn: async () => {
      const response: AxiosResponse<ReviewsResponse> = await api.get(`/admin/reviews/${courseId}`, {
        params: {
          page,
          limit,
          userId,
        },
      });
      return response.data;
    },
    enabled: !!courseId && isLoaded && isSignedIn,
    retry: false,
  });
}
