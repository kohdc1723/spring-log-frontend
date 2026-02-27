import { apiClient } from "@/apis/api";
import type { ApiResponse } from "@/apis/api.types";
import type { User } from "@/apis/user.types";

export const getMe = async (): Promise<ApiResponse<User>> => {
  const response = await apiClient.get<ApiResponse<User>>("/api/v1/users/me");

  return response.data;
}