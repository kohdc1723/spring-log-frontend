import {
  createContext,
  useContext,
  useMemo,
} from "react";
import { useLocalStorage } from "usehooks-ts";

import useMeQuery from "@/hooks/auth/useMeQuery";
import { AUTH_HINT_KEY } from "@/apis/api";
import type { AuthUser } from "@/apis/auth.types";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authHint] = useLocalStorage(AUTH_HINT_KEY, "false");
  const isLoggedIn = authHint === "true";

  const {
    data: me,
    isLoading,
    isFetching,
  } = useMeQuery({
    enabled: !!isLoggedIn,
  });

  const user = me ?? null;
  const isPending = isLoggedIn && (isLoading || isFetching);

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    isLoading: isPending,
  }), [user, isPending]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}