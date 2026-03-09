import { createColumnHelper, type CellContext, type ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import DataTable from "@/components/ui/data-table";
import { RefreshTokenPopover } from "@/components/RefreshTokenPopover";
import { AccountPopover } from "@/components/AccountPopover";
import type { DecodedRefreshToken, UserWithDecodedRefreshTokens } from "@/hooks/admin/users/useAllUsersQuery";
import useAllUsersQuery from "@/hooks/admin/users/useAllUsersQuery";
import type { Account } from "@/apis/user.types";

const columnHelper = createColumnHelper<UserWithDecodedRefreshTokens>();

const userColumns: ColumnDef<UserWithDecodedRefreshTokens, any>[] = [
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
    cell: (info: CellContext<UserWithDecodedRefreshTokens, Account[]>) => {
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
    cell: (info: CellContext<UserWithDecodedRefreshTokens, DecodedRefreshToken[]>) => (
      <div className="text-xs flex gap-1 items-center">
        {info.getValue().map(refreshToken => (
          <RefreshTokenPopover
            key={refreshToken.id}
            decodedRefreshToken={refreshToken}
          />
        ))}
      </div>
    )
  }),
];

export default function AdminUserTable() {
  const {
    data: allUsers,
    isLoading,
  } = useAllUsersQuery();

  return (
    <DataTable
      columns={userColumns}
      data={allUsers ?? []}
    />
  );
}