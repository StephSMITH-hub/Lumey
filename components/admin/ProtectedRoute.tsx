"use client";
import { ReactNode, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, checkAuth } = useAuth();
  const pathname = usePathname();
  const navigate = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
    };

    verifyAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-lumey-orange" />
          <p className="text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page and preserve the intended destination
    navigate.replace("/admin/login");
    return;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
