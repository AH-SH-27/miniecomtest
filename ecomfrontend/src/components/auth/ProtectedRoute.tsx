"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectAuth } from "@/lib/features/auth/authSlice";

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute = ({ 
  children, 
  fallback,
  redirectTo = "/login" 
}: ProtectedRouteProps) => {
  const router = useRouter();
  const { token, user } = useAppSelector(selectAuth);
  const [authState, setAuthState] = useState<'loading' | 'authorized' | 'unauthorized'>('loading');

  useEffect(() => {
    if (user === undefined) {
      setAuthState('loading');
      return;
    }

    const isAuthenticated = !!(token && user);

    if (isAuthenticated) {
      setAuthState('authorized');
    } else {
      setAuthState('unauthorized');
      const timer = setTimeout(() => {
        router.replace(redirectTo);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [token, user, router, redirectTo]);

  if (authState === 'loading') {
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

  if (authState === 'unauthorized') {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Redirecting to login...</p>
      </div>
    );
  }

  return <>{children}</>;
};