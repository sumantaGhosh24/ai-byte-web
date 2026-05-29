import { useAuth } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import type { AdminDashboardResponse } from "@/types/dashboard.type";

import { useApi } from "./use-api";

export const useAdminDashboard = () => {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery<AdminDashboardResponse>({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const response: AxiosResponse<AdminDashboardResponse> = await api.get("/dashboard/admin");
      return response.data;
    },
    enabled: isLoaded && isSignedIn,
    retry: false,
  });
};
