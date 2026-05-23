import { Navigate } from "react-router-dom";
import { useAuth } from "@clerk/react";

import { useCurrentUser } from "@/hooks/use-current-user";
import FullPageLoader from "@/components/global/full-page-loader";

interface Props {
  children: React.ReactNode;
}

const PublicGuard = ({ children }: Props) => {
  const { isLoaded, isSignedIn } = useAuth();

  const { data, isLoading } = useCurrentUser();

  if (!isLoaded || isLoading) {
    return <FullPageLoader />;
  }

  if (isSignedIn && data?.user?.role === "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicGuard;
