import dayjs from "dayjs";
import { SiJsonwebtokens } from "react-icons/si";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import type { DecodedRefreshToken } from "@/types/admin/decoded-refresh-token";

interface RefreshTokenPopoverProps {
  decodedRefreshToken: DecodedRefreshToken;
}

export const RefreshTokenPopover = ({ decodedRefreshToken }: RefreshTokenPopoverProps) => {
  const { createdAt, rotatedAt, decoded } = decodedRefreshToken;

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
          <PopoverTitle className="text-sm">
            Refresh Token
          </PopoverTitle>
        </PopoverHeader>
        <div className="flex flex-col gap-2 text-xs">
          <div className="flex flex-col gap-1">
            <p className="font-mono flex items-center gap-1">
              <span className="font-medium">
                Created:
              </span>
              <span className="text-muted-foreground">
                {dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss")}
              </span>
            </p>
            <p className="font-mono flex items-center gap-1">
              <span className="font-medium">
                Rotated:
              </span>
              <span className="text-muted-foreground">
                {dayjs(rotatedAt).format("YYYY-MM-DD HH:mm:ss")}
              </span>
            </p>
          </div>
          <pre className="text-xs font-mono rounded-lg border p-2 bg-accent">
            {JSON.stringify(decoded, null, 2)}
          </pre>
        </div>
      </PopoverContent>
    </Popover>
  );
}