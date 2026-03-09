import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";

import { logout } from "@/apis/auth";
import { AUTH_HINT_KEY } from "@/apis/api";
import { authKeys } from "@/hooks/auth/auth.keys";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "@/apis/api.types";

export default function useLogoutMutation(options: UseMutationOptions<void, AxiosError<ErrorResponse>, void, unknown>) {
  const queryClient = useQueryClient();
  const [_authHint, setAuthHint] = useLocalStorage(AUTH_HINT_KEY, "false");

  return useMutation({
    mutationFn: logout,
    onSuccess: (data, variables, onMutateResult, context) => {
      setAuthHint("false");
      queryClient.setQueryData(authKeys.me, null);
      options.onSuccess?.(data, variables, onMutateResult, context);
    },
    onError: options.onError,
  });
}