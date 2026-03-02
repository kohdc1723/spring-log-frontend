import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/contexts/AuthProvider";
import { Spinner } from "@/components/ui/spinner";

export default function PublicRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full p-8">
        <Spinner />
      </div>
    );
  }

  if (user) return <Navigate to="/" replace />;

  return <Outlet />;
}