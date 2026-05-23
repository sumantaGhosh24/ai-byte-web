import type { ReactNode } from "react";
import { ClerkProvider } from "@clerk/react";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

interface Props {
  children: ReactNode;
}

const AppClerkProvider = ({ children }: Props) => {
  return <ClerkProvider publishableKey={clerkPubKey}>{children}</ClerkProvider>;
};

export default AppClerkProvider;
