import useVerifyEmailMutation from "@/hooks/auth/useVerifyEmailMutation";
import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export default function EmailVerificationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const called = useRef(false);

  const {
    mutate: verifyEmail,
    isPending,
    isError,
  } = useVerifyEmailMutation({
    onSuccess: () => {
      toast.success("Email verification success");
      navigate("/sign-in");
    },
    onError: () => {
      toast.error("Email verification failed");
    }
  });

  useEffect(() => {
    if (token && !called.current) {
      called.current = true;
      verifyEmail(token);
    }
  }, [token]);

  if (!token) {
    return (
      <p>Missing verification token</p>
    );
  }

  if (isPending) {
    return (
      <p>Verifying email...</p>
    );
  }

  if (isError) {
    return (
      <p>Verfication failed</p>
    );
  }

  return null;
}