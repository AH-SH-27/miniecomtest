import { useMemo } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectAuth } from "@/lib/features/auth/authSlice";

export const useRequireAuth = (): boolean | null => {
  const { token, user } = useAppSelector(selectAuth);

  return useMemo(() => {
    if (user === undefined) {
      return null;
    }

    return !!(token && user);
  }, [token, user]);
};