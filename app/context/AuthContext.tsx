'use client';
/**
 * AuthContext — thin bridge layer over the Redux auth slice.
 *
 * Keeps the same `useAuth()` public API so that login/register/profile pages
 * and the Navbar don't need to know about Redux internals directly.
 * All state lives in the Redux store (app/features/auth/authSlice.ts).
 */
import { createContext, useContext, useEffect } from 'react';

import {
  clearAuthError,
  hydrateAuth,
  loginUser,
  logoutUser,
  registerUser,
  updateProfile as updateProfileAction,
} from '@/app/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';

import type { CustomerData, OwnerData, User, UserRole } from '@/app/features/auth/authSlice';
import type { ReactNode } from 'react';

// Re-export types so existing pages can keep their import paths
export type { CustomerData, OwnerData, User, UserRole };

// ─── Context type ────────────────────────────────────────────────────────────

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (
    email: string,
    password: string,
    role: UserRole,
  ) => Promise<{ ok: boolean; error?: string }>;
  register: (
    role: UserRole,
    data: CustomerData | OwnerData,
    password: string,
  ) => Promise<{ ok: boolean; error?: string }>;
  updateProfile: (data: CustomerData | OwnerData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector((state) => state.auth);

  // Hydrate session from localStorage once on mount
  useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);

  const login = async (email: string, password: string, role: UserRole) => {
    const result = await dispatch(loginUser({ email, password, role }));
    if (loginUser.rejected.match(result)) {
      return { ok: false, error: result.payload as string };
    }
    return { ok: true };
  };

  const register = async (role: UserRole, data: CustomerData | OwnerData, password: string) => {
    const result = await dispatch(registerUser({ role, data, password }));
    if (registerUser.rejected.match(result)) {
      return { ok: false, error: result.payload as string };
    }
    return { ok: true };
  };

  const updateProfile = (data: CustomerData | OwnerData) => {
    dispatch(updateProfileAction(data));
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  const clearError = () => {
    dispatch(clearAuthError());
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, error, login, register, updateProfile, logout }}
    >
      {/* Auto-clear stale auth errors when the component tree re-mounts */}
      {error && <span style={{ display: 'none' }} onClick={clearError} />}
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
