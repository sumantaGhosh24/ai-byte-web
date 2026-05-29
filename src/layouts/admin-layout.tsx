import { Outlet } from "react-router-dom";

import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/app-sidebar";
import Header from "@/components/layout/header";

const AdminLayout = () => {
  return (
    <SidebarProvider className="flex">
      <AppSidebar />
      <div className="min-h-screen w-full">
        <Header />
        <div className="container mx-auto">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
