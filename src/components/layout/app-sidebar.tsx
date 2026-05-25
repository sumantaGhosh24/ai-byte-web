import { Link } from "react-router-dom";
import { useAuth } from "@clerk/react";
import { Book, LayoutDashboard, Tags, Users } from "lucide-react";

import { useCurrentUser } from "@/hooks/use-profile";

import { Skeleton } from "../ui/skeleton";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../ui/sidebar";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/users",
    icon: Users,
  },
  {
    label: "Categories",
    href: "/categories",
    icon: Tags,
  },
  {
    label: "Courses",
    href: "/courses",
    icon: Book,
  },
];

const AppSidebar = () => {
  const { isLoaded, isSignedIn } = useAuth();

  const { data, isLoading } = useCurrentUser();

  if (!isLoaded || isLoading) {
    return <Skeleton className="w-[200px] h-20" />;
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <img
                  src="/favicon-32x32.png"
                  alt="logo"
                  height={40}
                  width={40}
                  className="size-4"
                />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">AI Interview Preparation</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {isSignedIn && (
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            {data?.user?.role === "admin" && (
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton asChild>
                        <Link to={item.href}>
                          <item.icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            )}
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
