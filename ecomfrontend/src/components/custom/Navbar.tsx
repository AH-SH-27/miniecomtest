"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  logout,
  selectAuth,
  selectIsAuthenticated,
} from "@/lib/features/auth/authSlice";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-foreground">
              ECOMTEST
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/"
                className="text-foreground hover:text-primary transition-colors px-3 py-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-foreground hover:text-primary transition-colors px-3 py-2 text-sm font-medium"
              >
                Products
              </Link>
              <Link
                href="/cart"
                className="text-foreground hover:text-primary transition-colors px-3 py-2 text-sm font-medium"
              >
                Cart
              </Link>
              {user?.role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="text-foreground hover:text-primary transition-colors px-3 py-2 text-sm font-medium"
                >
                  Admin
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Hello, {user?.fullName}
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
