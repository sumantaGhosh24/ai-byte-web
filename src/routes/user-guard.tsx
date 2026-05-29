import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@clerk/react";

import FullPageLoader from "@/components/global/full-page-loader";
import { useCurrentUser } from "@/hooks/use-profile";

interface Props {
  children: React.ReactNode;
}

const UserGuard = ({ children }: Props) => {
  const location = useLocation();

  const { isLoaded, isSignedIn } = useAuth();

  const { data, isLoading } = useCurrentUser();

  if (!isLoaded || isLoading) {
    return <FullPageLoader />;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  if (data?.user?.role === "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default UserGuard;
