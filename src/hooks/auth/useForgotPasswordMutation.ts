import type { ErrorResponse } from "@/apis/api.types";
import { forgotPassword } from "@/apis/auth";
import type { ForgotPasswordRequest } from "@/apis/auth.types";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export default function useForgotPasswordMutation(
  options?: UseMutationOptions<void, AxiosError<ErrorResponse>, ForgotPasswordRequest, unknown>
) {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}