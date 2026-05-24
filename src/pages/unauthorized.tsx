import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { useLogout } from "@/hooks/use-users";

const UnauthorizedPage = () => {
  const { logout } = useLogout();

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="bg-background w-[80%] h-125 rounded-md shadow-md flex flex-col items-center justify-center gap-5 dark:shadow-white/40">
        <Empty>
          <EmptyHeader>
            <EmptyTitle className="text-2xl font-bold">Access Denied</EmptyTitle>
            <EmptyDescription className="text-lg">
              You do not have permission to access the AIByte Admin Dashboard.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={logout} size="xl">
              Logout
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
