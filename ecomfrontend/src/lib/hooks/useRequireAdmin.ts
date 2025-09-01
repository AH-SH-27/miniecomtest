import { useAppSelector } from "@/lib/hooks";
import { selectAuth } from "@/lib/features/auth/authSlice";
import { useMemo } from "react";

export const useRequireAdmin = (): boolean | null => {
  const { token, user } = useAppSelector(selectAuth);

  return useMemo(() => {
    if (user === undefined) {
      return null;
    }

    return !!(token && user && user.role === "ADMIN");
  }, [token, user]);
};

export const useAuth = () => {
  const { token, user } = useAppSelector(selectAuth);

  return useMemo(() => {
    const isLoading = user === undefined;
    const isAuthenticated = !!(token && user);
    const isAdmin = !!(token && user && user.role === "ADMIN");

    return {
      isLoading,
      isAuthenticated,
      isAdmin,
      user,
      token
    };
  }, [token, user]);
};