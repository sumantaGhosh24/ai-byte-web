import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@clerk/react";

import FullPageLoader from "@/components/global/full-page-loader";

interface Props {
  children: React.ReactNode;
}

const UserGuard = ({ children }: Props) => {
  const location = useLocation();

  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <FullPageLoader />;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  return children;
};

export default UserGuard;
