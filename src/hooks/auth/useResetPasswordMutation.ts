import type { ErrorResponse } from "@/apis/api.types";
import { resetPassword } from "@/apis/auth";
import type { ResetPasswordRequest } from "@/apis/auth.types";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export default function useResetPasswordMutation(
  options?: UseMutationOptions<void, AxiosError<ErrorResponse>, ResetPasswordRequest, unknown>
) {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}