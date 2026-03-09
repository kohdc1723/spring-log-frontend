import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";

import { AUTH_HINT_KEY } from "@/apis/api";
import { tokenExchange } from "@/apis/auth";
import { authKeys } from "@/hooks/auth/auth.keys";
import type { TokenExchangeRequest, TokenExchangeResponse } from "@/apis/auth.types";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "@/apis/api.types";

export default function useTokenExchangeMutation(options: UseMutationOptions<TokenExchangeResponse, AxiosError<ErrorResponse>, TokenExchangeRequest, unknown>) {
  const queryClient = useQueryClient();
  const [_authHint, setAuthHint] = useLocalStorage(AUTH_HINT_KEY, "false");
  
  return useMutation({
    mutationFn: tokenExchange,
    onSuccess: (data, variables, onMutateResult, context) => {
      setAuthHint("true");
      queryClient.invalidateQueries({ queryKey: authKeys.me });
      options.onSuccess?.(data, variables, onMutateResult, context);
    },
    onError: options.onError,
  });
}