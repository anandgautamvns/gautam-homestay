'use client';
/**
 * AuthContext — bridges RTK Query auth API and the Redux auth slice.
 *
 * Keeps the same public useAuth() API so login/register/profile pages
 * and the Navbar require no changes.
 */
import { createContext, type ReactNode,useContext, useEffect } from 'react';

import {
  useGetMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateProfileMutation,
} from '@/app/features/api/authApi';
import { clearAuthError, clearUser, setUser } from '@/app/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';

import type { CustomerData, OwnerData, User, UserRole } from '@/lib/types';

// Re-export so existing pages keep their import paths
export type { CustomerData, OwnerData, User, UserRole };

// ─── Helpers ─────────────────────────────────────────────────────────────────

function extractMsg(e: unknown): string {
  if (typeof e === 'object' && e !== null && 'data' in e) {
    const d = (e as { data: unknown }).data;
    if (typeof d === 'object' && d !== null && 'message' in d) {
      return (d as { message: string }).message;
    }
  }
  return 'Something went wrong.';
}

// ─── Context type ─────────────────────────────────────────────────────────────

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string, role: UserRole) => Promise<{ ok: boolean; error?: string }>;
  register: (
    role: UserRole,
    data: CustomerData | OwnerData,
    password: string,
  ) => Promise<{ ok: boolean; error?: string }>;
  updateProfile: (data: CustomerData | OwnerData) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector((state) => state.auth);

  // Hydrate current user by calling /api/auth/me on mount
  const { data: me, isLoading: meLoading } = useGetMeQuery();
  useEffect(() => {
    if (!meLoading) {
      if (me) dispatch(setUser(me));
      else dispatch(clearUser());
    }
  }, [me, meLoading, dispatch]);

  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const [logoutMutation] = useLogoutMutation();
  const [updateProfileMutation] = useUpdateProfileMutation();

  const login = async (email: string, password: string, role: UserRole) => {
    try {
      await loginMutation({ email, password, role }).unwrap();
      return { ok: true };
    } catch (e) {
      return { ok: false, error: extractMsg(e) };
    }
  };

  const register = async (role: UserRole, data: CustomerData | OwnerData, password: string) => {
    try {
      await registerMutation({ role, data, password }).unwrap();
      return { ok: true };
    } catch (e) {
      return { ok: false, error: extractMsg(e) };
    }
  };

  const updateProfile = async (data: CustomerData | OwnerData) => {
    try {
      await updateProfileMutation(data).unwrap();
      return { ok: true };
    } catch (e) {
      return { ok: false, error: extractMsg(e) };
    }
  };

  const logout = () => {
    logoutMutation();
  };

  const clearError = () => dispatch(clearAuthError());

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, register, updateProfile, logout }}>
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
