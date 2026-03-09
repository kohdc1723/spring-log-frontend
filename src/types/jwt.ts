export interface JwtClaims {
  sub: string;
  jti: string;
  provider: string;
  email: string;
  role: string;
  type: string;
  iat: number;
  exp: number;
}