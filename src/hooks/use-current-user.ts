import { useAuth } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";

import { useApi } from "./use-api";

export function useCurrentUser() {
  const api = useApi();

  const { isLoaded, isSignedIn } = useAuth();

  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const response = await api.get("/profile");
      return response.data;
    },
    retry: false,
    enabled: isLoaded && isSignedIn,
  });
}
