import { Outlet } from "react-router-dom";

import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/app-sidebar";
import Header from "@/components/layout/header";

const AdminLayout = () => {
  return (
    <SidebarProvider className="flex">
      <AppSidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Header />
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
