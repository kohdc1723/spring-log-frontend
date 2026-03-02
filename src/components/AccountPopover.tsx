import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import { PiPasswordBold } from "react-icons/pi";

import type { Account } from "@/apis/admin.types";

interface AccountPopoverProps {
  email: string;
  account: Account;
}

export const AccountPopover = ({ email, account }: AccountPopoverProps) => {
  const initials = email.slice(0, 2).toUpperCase();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon-sm"
          className="rounded-md"
        >
          {(account.provider === "GOOGLE") ? (
            <FcGoogle className="size-4" />
          ) : (account.provider === "GITHUB") ? (
            <SiGithub className="size-4" />
          ) : (
            <PiPasswordBold className="size-4" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="bottom"
        className="flex flex-col gap-2"
      >
        <PopoverHeader>
          <PopoverTitle className="text-xs flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src={account.profileImageUrl ?? undefined}
                alt="profile-image"
                referrerPolicy="no-referrer"
                className="object-cover rounded-full border"
              />
              <AvatarFallback className="border">
                {initials}
              </AvatarFallback>
            </Avatar>
            {email}
          </PopoverTitle>
        </PopoverHeader>
        <PopoverDescription className="text-xs font-mono">
          {account.provider}@{account.providerId}
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  );
}