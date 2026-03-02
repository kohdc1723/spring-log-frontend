import type { Role } from "@/types/role";

export interface User {
  id: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
  accounts: Account[];
  refreshTokens: RefreshToken[];
}

export interface Account {
  id: string;
  provider: string;
  providerId: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RefreshToken {
  token: string;
}
