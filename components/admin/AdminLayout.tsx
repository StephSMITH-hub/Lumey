"use client";
import {
  LayoutDashboard,
  FileText,
  Package,
  LogOut,
  Plus,
  Settings,
  Users,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

const AdminLayout = ({ children }: any) => {
  const pathname = usePathname();
  const { push } = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    logout();
  };

  // Get current page title based on route
  const getCurrentPageTitle = () => {
    const path = pathname;

    if (path === "/admin") return "Dashboard";
    if (path.includes("/admin/blogs")) {
      if (path.includes("/new")) return "Create New Blog";
      if (path.includes("/edit")) return "Edit Blog";
      return "Manage Blogs";
    }
    if (path.includes("/admin/products")) {
      if (path.includes("/new")) return "Create New Product";
      if (path.includes("/edit")) return "Edit Product";
      return "Manage Products";
    }

    return "Admin";
  };

  return (
    <>
      <ProtectedRoute>
        <SidebarProvider defaultOpen={true}>
          <div className=" flex w-full bg-gray-50 text-gray-900">
            {/* Modern sidebar implementation using shadcn/ui Sidebar */}
            <Sidebar className="border-r border-gray-200 ">
              <SidebarHeader className="border-b border-gray-200 p-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-lumey-yellow">
                    <div className="flex items-center">
                      <Link href="/admin" className="flex items-center gap-2">
                        <img
                          src="/Lumey_Favicon/4x/Lumey_Favicon_32x32@4x.png"
                          alt="Lumey logo"
                          className="rounded-full w-[50px] object-cover"
                        />
                      </Link>
                    </div>
                  </div>
                  <h1 className="text-xl font-bold text-lumey-dark">
                    Lumey Admin
                  </h1>
                </div>
              </SidebarHeader>

              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname === "/admin"}
                          tooltip="Dashboard"
                        >
                          <Link href="/admin">
                            <LayoutDashboard className="h-5 w-5" />
                            <span>Dashboard</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                  <SidebarGroupLabel>Content</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem className="flex">
                        <SidebarMenuButton
                          asChild
                          isActive={pathname.includes("/admin/blogs")}
                          tooltip="Blogs"
                        >
                          <Link href="/admin/blogs">
                            <FileText className="h-5 w-5" />
                            <span>Blogs</span>
                          </Link>
                        </SidebarMenuButton>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 group-hover:opacity-100 group-focus:opacity-100 md:opacity-0"
                          onClick={() => push("/admin/blogs/new")}
                          title="New Blog Post"
                        >
                          <Plus size={16} />
                        </Button>
                      </SidebarMenuItem>

                      <SidebarMenuItem className="flex ">
                        <SidebarMenuButton
                          asChild
                          isActive={pathname.includes("/admin/products")}
                          tooltip="Products"
                        >
                          <Link href="/admin/products">
                            <Package className="h-5 w-5" />
                            <span>Products</span>
                          </Link>
                        </SidebarMenuButton>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 group-hover:opacity-100 group-focus:opacity-100 md:opacity-0"
                          onClick={() => push("/admin/products/new")}
                          title="New Product"
                        >
                          <Plus size={16} />
                        </Button>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                {/* Additional menu groups can be added here */}
                <SidebarGroup>
                  <SidebarGroupLabel>System</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Settings">
                          <Settings className="h-5 w-5" />
                          <span>Settings</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Users">
                          <Users className="h-5 w-5" />
                          <span>Users</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>

              <SidebarFooter className="border-t border-gray-200 p-4">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </Button>
              </SidebarFooter>
            </Sidebar>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
              {/* Admin Header */}
              <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <SidebarTrigger>
                    <ArrowLeft />
                  </SidebarTrigger>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold">
                      {getCurrentPageTitle()}
                    </h2>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut size={16} />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </header>

              {/* Main Content Area */}
              <main className="flex-1 p-6 overflow-auto pt-16">{children}</main>
            </div>
          </div>
        </SidebarProvider>
      </ProtectedRoute>
    </>
  );
};

export default AdminLayout;
