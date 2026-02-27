export interface SignUpRequest {
  email: string;
  password: string;
}

export interface SignUpResponse {
  id: string;
  email: string;
  role: string;
  provider: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface TokenExchangeRequest {
  code: string;
}

export interface TokenExchangeResponse {
  accessToken: string;
}