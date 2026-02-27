import { Navigate, Outlet } from "react-router-dom";

import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/contexts/AuthProvider";

export default function ProtectedRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full p-8">
        <Spinner />
      </div>
    );
  }

  if (!user) return <Navigate to="/sign-in" replace />;

  return <Outlet />;
}