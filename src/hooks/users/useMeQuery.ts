import { useQuery } from "@tanstack/react-query";

import { getMe } from "@/apis/user";
import { usersKeys } from "@/hooks/users/usersKeys";

export default function useMeQuery({
  enabled
}: {
  enabled: boolean;
}) {
  return useQuery({
    queryKey: usersKeys.me,
    queryFn: getMe,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled,
  });
}