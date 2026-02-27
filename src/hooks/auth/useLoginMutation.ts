import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";

import { AUTH_HINT_KEY, login } from "@/apis/auth";
import { usersKeys } from "@/hooks/users/usersKeys";

export default function useLoginMutation() {
  const queryClient = useQueryClient();
  const [_authHint, setAuthHint] = useLocalStorage(AUTH_HINT_KEY, "false");

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      setAuthHint("true");
      queryClient.invalidateQueries({ queryKey: usersKeys.me });
    }
  });
}