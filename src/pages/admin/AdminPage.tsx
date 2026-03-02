import type { Account, RefreshToken, User } from "@/apis/admin.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import { Dialog, DialogTitle, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import useAllUsersQuery from "@/hooks/admin/users/useAllUsersQuery";
import { createColumnHelper, type CellContext, type ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import "dayjs/locale/en";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import { PiPasswordBold } from "react-icons/pi";
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AccountPopover } from "@/components/AccountPopover";
import { RefreshTokenPopover } from "@/components/RefreshTokenPopover";

dayjs.extend(timezone);
dayjs.extend(utc);

dayjs.locale("en");

const columnHelper = createColumnHelper<User>();

const userColumns: ColumnDef<User, any>[] = [
  // columnHelper.accessor("id", {
  //   header: "ID",
  //   cell: (id) => id.getValue(),
  // }),
  columnHelper.accessor("email", {
    header: () => (
      <div className="text-xs font-semibold">
        Email
      </div>
    ),
    cell: (email) => (
      <div className="text-xs">
        {email.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor("role", {
    header: () => (
      <div className="text-xs font-semibold">
        Role
      </div>
    ),
    cell: (role) => (
      <div className="text-xs">
        {role.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor("createdAt", {
    header: () => (
      <div className="text-xs font-semibold">
        Created
      </div>
    ),
    cell: (createdAt) => (
      <div className="flex flex-col text-xs font-mono">
        <span>
          {dayjs(createdAt.getValue()).format("YYYY-MM-DD")}
        </span>
        <span>
          {dayjs(createdAt.getValue()).format("HH:mm:ss")}
        </span>
      </div>
    ),
  }),
  columnHelper.accessor("updatedAt", {
    header: () => (
      <div className="text-xs font-semibold">
        Updated
      </div>
    ),
    cell: (createdAt) => (
      <div className="flex flex-col text-xs font-mono">
        <span>
          {dayjs(createdAt.getValue()).format("YYYY-MM-DD")}
        </span>
        <span>
          {dayjs(createdAt.getValue()).format("HH:mm:ss")}
        </span>
      </div>
    ),
  }),
  columnHelper.accessor("accounts", {
    header: () => (
      <div className="text-xs font-semibold">
        Accounts
      </div>
    ),
    cell: (info: CellContext<User, Account[]>) => {
      const accounts = info.getValue();
      const email = info.row.original.email;

      return (
        <div className="text-xs flex gap-1 items-center">
          {accounts.map(account => (
            <AccountPopover
              key={account.id}
              email={email}
              account={account}
            />
          ))}
        </div>
      );
    },
  }),
  columnHelper.accessor("refreshTokens", {
    header: () => (
      <div className="text-xs font-semibold">
        Refresh Tokens
      </div>
    ),
    cell: (info: CellContext<User, RefreshToken[]>) => (
      <div className="text-xs flex gap-1 items-center">
        {info.getValue().map(refreshToken => (
          <RefreshTokenPopover
            key={refreshToken.token}
            refreshToken={refreshToken}
          />
        ))}
      </div>
    )
  }),
];

export default function AdminPage() {
  const {
    data: allUsers,
    isLoading,
  } = useAllUsersQuery();

  console.log(allUsers);

  return (
    <div>
      <DataTable
        columns={userColumns}
        data={allUsers?.data || []}
      />
    </div>
  );
}