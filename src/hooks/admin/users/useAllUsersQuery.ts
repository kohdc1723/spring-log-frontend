import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

import { getAllUsers } from "@/apis/user";
import { adminUsersKeys } from "@/hooks/admin/users/adminUsersKeys";
import type { JwtClaims } from "@/types/jwt";
import type { RefreshToken, User } from "@/apis/user.types";

export interface DecodedRefreshToken extends RefreshToken {
  decoded: Omit<JwtClaims, "sub" | "jti">;
}

export interface UserWithDecodedRefreshTokens extends User {
  refreshTokens: DecodedRefreshToken[];
}

export default function useAllUsersQuery() {
  return useQuery({
    queryKey: adminUsersKeys.all,
    queryFn: getAllUsers,
    select: (data) => data.map(user => ({
      ...user,
      refreshTokens: user.refreshTokens.map(rt => {
        const decoded = jwtDecode<JwtClaims>(rt.token);
        const { sub, jti, ...rest } = decoded;

        return {
          ...rt,
          decoded: rest,
        };
      })
    })),
  });
}