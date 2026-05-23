import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@clerk/react";

import { useCurrentUser } from "@/hooks/use-current-user";
import FullPageLoader from "@/components/global/full-page-loader";

interface Props {
  children: React.ReactNode;
}

const AdminGuard = ({ children }: Props) => {
  const location = useLocation();

  const { isLoaded, isSignedIn } = useAuth();

  const { data, isLoading } = useCurrentUser();

  if (!isLoaded || isLoading) {
    return <FullPageLoader />;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  if (data?.user?.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default AdminGuard;
