import { AUTH_HINT_KEY, tokenExchange } from "@/apis/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersKeys } from "../users/usersKeys";
import { useLocalStorage } from "usehooks-ts";

export default function useTokenExchangeMutation() {
  const queryClient = useQueryClient();
  const [_authHint, setAuthHint] = useLocalStorage(AUTH_HINT_KEY, "false");
  
  return useMutation({
    mutationFn: tokenExchange,
    onSuccess: () => {
      setAuthHint("true");
      queryClient.invalidateQueries({ queryKey: usersKeys.me });
    }
  });
}