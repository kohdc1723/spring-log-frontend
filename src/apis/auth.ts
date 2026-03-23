import { apiClient, setAccessToken } from "@/apis/api";
import type { ApiResponse } from "@/apis/api.types";
import type {
  AuthUser,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest,
  SignUpRequest,
  SignUpResponse,
  TokenExchangeRequest,
  TokenExchangeResponse,
} from "@/apis/auth.types";

export const getMe = async () => {
  const response = await apiClient.get<ApiResponse<AuthUser>>("/api/v1/auth/me");

  return response.data.data;
}

export const signUp = async (request: SignUpRequest) => {
  const response = await apiClient.post<ApiResponse<SignUpResponse>>("/api/v1/auth/sign-up", request);

  return response.data.data;
}

export const login = async (request: LoginRequest) => {
  const response = await apiClient.post<ApiResponse<LoginResponse>>("/api/v1/auth/login", request);
  setAccessToken(response.data.data.accessToken);

  return response.data.data;
}

export const logout = async () => {
  await apiClient.post<ApiResponse<null>>("/api/v1/auth/logout");
  setAccessToken(null);
}

export const tokenExchange = async (request: TokenExchangeRequest) => {
  const response = await apiClient.post<ApiResponse<TokenExchangeResponse>>("/api/v1/auth/token", request);
  setAccessToken(response.data.data.accessToken);
  
  return response.data.data;
}

export const verifyEmail = async (token: string) => {
  const response = await apiClient.get<ApiResponse<null>>("/api/v1/auth/email-verification", {
    params: { token }
  });

  return response.data.data;
}

export const resendVerificationEmail = async (email: string) => {
  const response = await apiClient.post<ApiResponse<null>>("/api/v1/auth/resend-verification-email", { email });

  return response.data.data;
}

export const forgotPassword = async ({
  email
}: ForgotPasswordRequest) => {
  await apiClient.post<ApiResponse<null>>("/api/v1/auth/forgot-password", { email });
}

export const resetPassword = async ({
  token,
  newPassword
}: ResetPasswordRequest) => {
  await apiClient.post<ApiResponse<null>>("/api/v1/auth/reset-password", { token, newPassword });
}