"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectAuth } from "@/lib/features/auth/authSlice";

interface GuestRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
  redirectTo?: string;
}

export const GuestRoute = ({
  children,
  fallback,
  redirectTo = "/",
}: GuestRouteProps) => {
  const router = useRouter();
  const { token, user } = useAppSelector(selectAuth);
  const [authState, setAuthState] = useState<
    "loading" | "guest" | "authenticated"
  >("loading");

  useEffect(() => {
    if (user === undefined) {
      setAuthState("loading");
      return;
    }

    const isAuthenticated = !!(token && user);

    if (isAuthenticated) {
      setAuthState("authenticated");
      const timer = setTimeout(() => {
        router.replace(redirectTo);
      }, 100);

      return () => clearTimeout(timer);
    } else {
      setAuthState("guest");
    }
  }, [token, user, router, redirectTo]);

  if (authState === "loading") {
    return (
      fallback || (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-500">Loading...</p>
          </div>
        </div>
      )
    );
  }

  if (authState === "authenticated") {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Redirecting...</p>
      </div>
    );
  }

  return <>{children}</>;
};
