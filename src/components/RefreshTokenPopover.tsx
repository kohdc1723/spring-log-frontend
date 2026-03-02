import { jwtDecode } from "jwt-decode";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { SiJsonwebtokens } from "react-icons/si";
import type { RefreshToken } from "@/apis/admin.types";
import dayjs from "dayjs";

export const RefreshTokenPopover = ({ refreshToken }: { refreshToken: any }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="rounded-md"
        >
          <SiJsonwebtokens className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="bottom"
        className="flex flex-col gap-2"
      >
        <PopoverHeader>
          <PopoverTitle className="text-xs">
            Decoded Information
          </PopoverTitle>
        </PopoverHeader>
        <pre className="text-xs font-mono rounded-lg border p-2 bg-accent">
          {JSON.stringify(refreshToken.decoded, null, 2)}
        </pre>
      </PopoverContent>
    </Popover>
  );
}