import { LogOut, UserCog } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import useLogoutMutation from "@/hooks/auth/useLogoutMutation";
import type { AuthUser } from "@/apis/auth.types";

interface UserDropdownMenuProps {
  user: AuthUser;
}

export default function UserDropdownMenu({ user }: UserDropdownMenuProps) {
  const { mutate: logout } = useLogoutMutation();
  const initials = user.email.slice(0, 2).toUpperCase();

  const handleLogout = () => logout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-9 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0 p-0 hover:opacity-90"
        >
          {user.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="profile-image"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="w-full h-full rounded-full flex items-center justify-center font-medium text-base border">
              {initials}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end"
        className="w-3xs"
      >
        <DropdownMenuGroup className="flex items-center gap-4 px-4 py-2">
          {user.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="profile-image"
              className="size-9 rounded-full object-cover"
            />
          ) : (
            <span className="size-9 rounded-full flex items-center justify-center font-medium text-base border">
              {initials}
            </span>
          )}
          <p className="text-accent-foreground text-xs font-medium">
            {user.email}
          </p>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex items-center gap-4 px-4">
            <UserCog className="size-4 text-accent-foreground" />
            Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={handleLogout}
            className="flex items-center gap-4 px-4"
          >
            <LogOut className="size-4 text-accent-foreground" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}