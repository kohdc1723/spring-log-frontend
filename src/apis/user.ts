import { apiClient } from "@/apis/api";
import type { ApiResponse } from "@/apis/api.types";
import type { User } from "@/apis/user.types";

export const getAllUsers = async () => {
  const response = await apiClient.get<ApiResponse<User[]>>("/api/v1/admin/users");

  return response.data.data;
}