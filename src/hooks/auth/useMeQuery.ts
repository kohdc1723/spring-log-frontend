import { useQuery } from "@tanstack/react-query";

import { getMe } from "@/apis/auth";
import { authKeys } from "@/hooks/auth/auth.keys";

export default function useMeQuery({
  enabled
}: {
  enabled: boolean;
}) {
  return useQuery({
    queryKey: authKeys.me,
    queryFn: getMe,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled,
  });
}