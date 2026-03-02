import { Outlet, Link } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { SiSpring } from "react-icons/si";
import { SunIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import UserDropdownMenu from "@/components/UserDropdownMenu";
import { useAuth } from "@/contexts/AuthProvider";

export default function GlobalLayout() {
  const { user, isLoading } = useAuth();

  return (
    <div className="min-h-dvh flex flex-col items-center">
      <header className="w-full h-15 border-b flex justify-center">
        <div className="flex items-center justify-between h-full px-6 w-full max-w-3xl">
          <Link
            to={"/"}
            className="flex items-center gap-4"
          >
            <SiSpring className="size-8" />
            <h1 className="font-bold text-lg">
              Spring Log
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="size-9 rounded-full p-0 flex items-center justify-center"
            >
              <SunIcon className="size-6" />
            </Button>
            {isLoading ? (
              <Skeleton className="size-9 rounded-full" />
            ) : user ? (
              <UserDropdownMenu user={user} />
            ) : null}
          </div>
        </div>
      </header>
      <main className="flex-1 w-full max-w-3xl border-x p-8">
        <Outlet />
        <Toaster position="bottom-right" />
      </main>
    </div>
  );
}