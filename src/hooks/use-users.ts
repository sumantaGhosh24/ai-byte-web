import { useAuth, useClerk } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { AxiosResponse } from "axios";

import { queryClient } from "@/providers/query-provider";
import type { UsersResponse } from "@/types/user";

import { useApi } from "./use-api";

export function useLogout() {
  const { signOut } = useClerk();

  const navigate = useNavigate();

  async function logout() {
    await signOut();

    queryClient.clear();

    navigate("/");
  }

  return {
    logout,
  };
}

interface UseUsersparams {
  page?: number;
  limit?: number;
  search?: string;
}

export function useUsers({ page, limit, search }: UseUsersparams) {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<UsersResponse>({
    queryKey: ["users", page, limit, search],
    queryFn: async () => {
      const response: AxiosResponse<UsersResponse> = await api.get("/users", {
        params: { page, limit, search },
      });
      return response.data;
    },
    retry: false,
    enabled: isLoaded && isSignedIn,
  });
}
