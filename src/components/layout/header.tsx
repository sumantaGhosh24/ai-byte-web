import { useState } from "react";
import { useAuth } from "@clerk/react";
import { MenuIcon, XIcon } from "lucide-react";

import { useLogout } from "@/hooks/use-users";
import { useCurrentUser } from "@/hooks/use-profile";

import { ModeToggle } from "../global/mode-toggle";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import {
  NavigationMenu,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Header = () => {
  const [open, setOpen] = useState(false);

  const { isLoaded, isSignedIn } = useAuth();

  const { data, isLoading } = useCurrentUser();

  const { logout } = useLogout();

  if (!isLoaded || isLoading) {
    return <Skeleton className="w-full h-20" />;
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto container md:flex items-center justify-between px-6 py-4 md:px-8">
        <div className="flex items-center justify-between md:block">
          <Button variant="outline" asChild className="h-9 px-4 ml-4">
            <SidebarTrigger />
          </Button>
          <div className="md:hidden">
            <Button className="rounded-md p-2 outline-none" onClick={() => setOpen(!open)}>
              {open ? <XIcon color="white" /> : <MenuIcon color="white" />}
            </Button>
          </div>
        </div>
        <div
          className={`mt-8 flex-1 justify-end pb-3 md:mt-0 md:block md:pb-0 ${open ? "block" : "hidden"}`}
        >
          <NavigationMenu className={open ? "mx-auto" : "ml-auto"}>
            <NavigationMenuList className="flex-col items-center gap-4 md:flex-row">
              {isSignedIn && (
                <>
                  <Button
                    variant="secondary"
                    className={navigationMenuTriggerStyle({
                      className: "hover:bg-transparent bg-transparent",
                    })}
                    onClick={logout}
                  >
                    Logout
                  </Button>
                  <Avatar size="lg">
                    <AvatarImage src={data?.user?.profile?.avatarUrl as string} />
                    <AvatarFallback>
                      {(data?.user?.profile?.name?.slice(0, 2) || "User").toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <ModeToggle />
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
