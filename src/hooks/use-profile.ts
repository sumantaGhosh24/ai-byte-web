import { useAuth } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import type { ProfileResponse, UserResponse } from "@/types/profile";

import { useApi } from "./use-api";

export function useCurrentUser() {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<ProfileResponse>({
    queryKey: ["current-user"],
    queryFn: async () => {
      const response: AxiosResponse<ProfileResponse> = await api.get("/profile");
      return response.data;
    },
    retry: false,
    enabled: isLoaded && isSignedIn,
  });
}

export function useUser(userId: string) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<UserResponse>({
    queryKey: [`user-${userId}`],
    queryFn: async () => {
      const response: AxiosResponse<UserResponse> = await api.get(`/profile/${userId}`);
      return response.data;
    },
    retry: false,
    enabled: isLoaded && isSignedIn,
  });
}
