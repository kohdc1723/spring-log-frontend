import { useMutation } from "@tanstack/react-query";

import { signUp } from "@/apis/auth";

export default function useSignUpMutation() {
  return useMutation({
    mutationFn: signUp
  });
}