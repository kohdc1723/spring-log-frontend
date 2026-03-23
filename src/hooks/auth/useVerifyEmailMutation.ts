import type { ErrorResponse } from "@/apis/api.types";
import { verifyEmail } from "@/apis/auth";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export default function useVerifyEmailMutation(options?: UseMutationOptions<unknown, AxiosError<ErrorResponse>, string, unknown>) {
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}