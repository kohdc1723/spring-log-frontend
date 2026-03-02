import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";
import { toast } from "sonner";

import { logout } from "@/apis/auth";
import { AUTH_HINT_KEY } from "@/apis/api";
import { authKeys } from "@/hooks/auth/auth.keys";

export default function useLogoutMutation() {
  const queryClient = useQueryClient();
  const [_authHint, setAuthHint] = useLocalStorage(AUTH_HINT_KEY, "false");

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setAuthHint("false");
      queryClient.setQueryData(authKeys.me, null);
    },
    onError: () => {
      toast.error("Failed to logout");
    }
  });
}