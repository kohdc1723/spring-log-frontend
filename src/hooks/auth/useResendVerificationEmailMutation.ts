import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "@/apis/api.types";
import { resendVerificationEmail } from "@/apis/auth";

export default function useResendVerificationEmailMutation(options: UseMutationOptions<unknown, AxiosError<ErrorResponse>, string, unknown>) {
  return useMutation({
    mutationFn: resendVerificationEmail,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}