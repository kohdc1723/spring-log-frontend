import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";

import { AUTH_HINT_KEY } from "@/apis/api";
import { login } from "@/apis/auth";
import { authKeys } from "@/hooks/auth/auth.keys";
import type { LoginRequest, LoginResponse } from "@/apis/auth.types";
import type { ErrorResponse } from "@/apis/api.types";
import type { AxiosError } from "axios";

export default function useLoginMutation(options: UseMutationOptions<LoginResponse, AxiosError<ErrorResponse>, LoginRequest, unknown>) {
  const queryClient = useQueryClient();
  const [_authHint, setAuthHint] = useLocalStorage(AUTH_HINT_KEY, "false");

  return useMutation({
    mutationFn: login,
    onSuccess: (data, variables, onMutateResult, context) => {
      setAuthHint("true");
      queryClient.invalidateQueries({ queryKey: authKeys.me });
      options.onSuccess?.(data, variables, onMutateResult, context);
    },
    onError: options.onError,
  });
}