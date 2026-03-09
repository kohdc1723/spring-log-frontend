import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import useTokenExchangeMutation from "@/hooks/auth/useTokenExchangeMutation";

export default function OAuth2CallbackPage() {
  const [searchParams] = useSearchParams();
  const authCode = searchParams.get("code");

  const called = useRef(false);

  const { mutate: tokenExchange } = useTokenExchangeMutation({
    onError: () => {
      toast.error("OAuth2 login failed");
    }
  });

  useEffect(() => {
    if (!authCode || called.current) return;

    called.current = true;

    tokenExchange({ code: authCode });
  }, [authCode, tokenExchange]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <p>Please wait...</p>
    </div>
  );
}