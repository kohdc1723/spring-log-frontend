import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

import { getAllUsers } from "@/apis/user";
import { adminUsersKeys } from "@/hooks/admin/users/adminUsersKeys";
import dayjs from "dayjs";

export default function useMeQuery() {
  return useQuery({
    queryKey: adminUsersKeys.all,
    queryFn: getAllUsers,
    select: (response) => ({
      ...response,
      data: response.data.map(user => ({
        ...user,
        refreshTokens: user.refreshTokens.map(refreshToken => {
          const decoded = jwtDecode(refreshToken.token);
          const { sub, jti, ...rest } = decoded;

          return {
            ...refreshToken,
            decoded: {
              ...rest,
              iat: rest.iat ? dayjs.unix(rest.iat).format("YYYY-MM-DD HH:mm:ss") : null,
              exp: rest.exp ? dayjs.unix(rest.exp).format("YYYY-MM-DD HH:mm:ss") : null,
            }
          }
        })
      }))
    })
  });
}