import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

import type { ApiResponse, ErrorResponse } from "@/apis/api.types";

export const AUTH_HINT_KEY = "spring_log_auth_hint";

export const publicRequests = [
  "/api/v1/auth/sign-up",
  "/api/v1/auth/login",
  "/api/v1/auth/token",
  "/api/v1/auth/refresh",
  "/api/v1/auth/email-verification",
] as const;

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
}

export const getAccessToken = () => accessToken;

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 30 * 1000, // 30 seconds
});

const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 30 * 1000, // 30 seconds
});

let refreshPromise: Promise<string | null> | null = null;

apiClient.interceptors.request.use(async (config) => {
  const authHint = localStorage.getItem(AUTH_HINT_KEY);
  const isLoggedIn = authHint === "true";

  const isPublicRequest = publicRequests.some(path => config.url?.includes(path));

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else if (!accessToken && !isLoggedIn && !isPublicRequest) {
    const newAccessToken = await refreshAccessTokenOrNull();

    if (newAccessToken) {
      config.headers.Authorization = `Bearer ${newAccessToken}`;
    }
  }

  return config;
});

apiClient.interceptors.response.use(undefined, async (error: AxiosError<ErrorResponse>) => {
  const originalRequest = error.config as CustomAxiosRequestConfig;

  const isUnauthorized = error.response?.status === 401;
  const isRetrying = originalRequest?._retry;
  const isPublicRequest = publicRequests.some(path => originalRequest?.url?.includes(path));

  if (originalRequest && isUnauthorized && !isRetrying && !isPublicRequest) {
    originalRequest._retry = true;

    const newAccessToken = await refreshAccessTokenOrNull();

    if (newAccessToken) {
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return apiClient(originalRequest);
    }
  }

  return Promise.reject(error);
});

export const refreshAccessTokenOrNull = async (): Promise<string | null> => {
  if (!refreshPromise) {
    refreshPromise = refreshClient.post<ApiResponse<{ accessToken: string }>>("/api/v1/auth/refresh")
      .then((response) => {
        const newAccessToken = response.data.data.accessToken;
        setAccessToken(newAccessToken);
        return newAccessToken;
      })
      .catch(() => {
        setAccessToken(null);
        return null;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}
