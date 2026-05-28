import { useAuth } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import type { QuizAttemptsResponse, UseQuizAttemptsParams } from "@/types/quiz-attempt.type";

import { useApi } from "./use-api";

export function useQuizAttempts({ quizId, page = 1, limit = 10 }: UseQuizAttemptsParams) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<QuizAttemptsResponse>({
    queryKey: ["quiz-attempts", quizId, page, limit],

    queryFn: async () => {
      const response: AxiosResponse<QuizAttemptsResponse> = await api.get(
        `/attempts/quiz/${quizId}`,
        {
          params: {
            page,
            limit,
          },
        },
      );
      return response.data;
    },
    enabled: !!quizId && isLoaded && isSignedIn,
    retry: false,
  });
}
