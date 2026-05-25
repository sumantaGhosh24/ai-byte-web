import { useAuth } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import type { BookmarksResponse, UseBookmarksParams } from "@/types/bookmark.type";

import { useApi } from "./use-api";

export function useBookmarks({ courseId, page = 1, limit = 10, userId }: UseBookmarksParams) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<BookmarksResponse>({
    queryKey: ["bookmarks", courseId, page, limit, userId],
    queryFn: async () => {
      const response: AxiosResponse<BookmarksResponse> = await api.get(`/bookmarks/${courseId}`, {
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
