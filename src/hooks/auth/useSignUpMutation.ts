import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { signUp } from "@/apis/auth";
import type { SignUpRequest, SignUpResponse } from "@/apis/auth.types";
import type { ErrorResponse } from "@/apis/api.types";

export default function useSignUpMutation(options: UseMutationOptions<SignUpResponse, AxiosError<ErrorResponse>, SignUpRequest, unknown>) {
  return useMutation({
    mutationFn: signUp,
    onSuccess: options.onSuccess,
    onError: options.onError,
  });
}