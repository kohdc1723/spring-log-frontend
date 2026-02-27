import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { AUTH_HINT_KEY, logout } from "@/apis/auth";
import { usersKeys } from "@/hooks/users/usersKeys";
import { useLocalStorage } from "usehooks-ts";

export default function useLogoutMutation() {
  const queryClient = useQueryClient();
  const [_authHint, setAuthHint] = useLocalStorage(AUTH_HINT_KEY, "false");

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setAuthHint("false");
      queryClient.setQueryData(usersKeys.me, null);
    },
    onError: () => {
      toast.error("Failed to logout");
    }
  });
}