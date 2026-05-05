'use client';
/**
 * AuthContext — wraps NextAuth (session/JWT) with the same useAuth() API
 * so login, register, and profile pages require no changes.
 */
import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';

import { signIn, signOut, useSession } from 'next-auth/react';

import type { CustomerData, OwnerData, User, UserRole } from '@/lib/types';

// Re-export so existing pages keep their import paths
export type { CustomerData, OwnerData, User, UserRole };

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
  const { status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isLoading = status === 'loading' || (status === 'authenticated' && user === null);

  useEffect(() => {
    // When unauthenticated: defer setState out of the effect body
    if (status === 'unauthenticated') {
      void Promise.resolve().then(() => setUser(null));
      return;
    }

    if (status !== 'authenticated') return;

    // Fetch the full User DTO (includes CustomerData / OwnerData)
    let cancelled = false;
    fetch('/api/auth/me', { credentials: 'include' })
      .then((r) => (r.ok ? (r.json() as Promise<User>) : null))
      .then((data) => { if (!cancelled) setUser(data); })
      .catch(() => { if (!cancelled) setUser(null); });

    return () => { cancelled = true; };
  }, [status]);

  // ─── Auth actions ──────────────────────────────────────────────────────────

  const login = async (email: string, password: string, role: UserRole) => {
    setError(null);
    const result = await signIn('credentials', { email, password, role, redirect: false });
    if (result?.error) {
      const raw = decodeURIComponent(result.error).replace(/^Error:\s*/i, '');
      const msg = raw === 'CredentialsSignin' ? 'Invalid email or password' : raw;
      setError(msg);
      return { ok: false, error: msg };
    }
    return { ok: true };
  };

  const register = async (role: UserRole, data: CustomerData | OwnerData, password: string) => {
    setError(null);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, password, ...data }),
      });

      if (!res.ok) {
        const json = (await res.json()) as { message: string };
        setError(json.message);
        return { ok: false, error: json.message };
      }

      // Auto sign-in via NextAuth after successful registration
      const signInResult = await signIn('credentials', {
        email: data.email,
        password,
        role,
        redirect: false,
      });

      if (signInResult?.error) {
        return { ok: false, error: 'Account created — please sign in.' };
      }

      return { ok: true };
    } catch {
      const msg = 'Registration failed. Please try again.';
      setError(msg);
      return { ok: false, error: msg };
    }
  };

  const updateProfile = async (data: CustomerData | OwnerData) => {
    setError(null);
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = (await res.json()) as { message: string };
        setError(json.message);
        return { ok: false, error: json.message };
      }

      const updated = (await res.json()) as User;
      setUser(updated);
      return { ok: true };
    } catch {
      const msg = 'Failed to update profile.';
      setError(msg);
      return { ok: false, error: msg };
    }
  };

  const logout = () => {
    setUser(null);
    void signOut({ callbackUrl: '/' });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, register, updateProfile, logout }}>
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
