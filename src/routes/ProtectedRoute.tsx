import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/contexts/AuthProvider";
import { Spinner } from "@/components/ui/spinner";
import type { Role } from "@/types/role";

interface ProtectedRouteProps {
  allowedRoles: Role[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full p-8">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  const hasAccess = allowedRoles.includes(user.role);

  if (!hasAccess) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}