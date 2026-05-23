import { useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/react";

import { queryClient } from "@/providers/query-provider";

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
