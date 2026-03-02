import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";

import { AUTH_HINT_KEY } from "@/apis/api";
import { login } from "@/apis/auth";
import { authKeys } from "@/hooks/auth/auth.keys";

export default function useLoginMutation() {
  const queryClient = useQueryClient();
  const [_authHint, setAuthHint] = useLocalStorage(AUTH_HINT_KEY, "false");

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      setAuthHint("true");
      queryClient.invalidateQueries({ queryKey: authKeys.me });
    }
  });
}