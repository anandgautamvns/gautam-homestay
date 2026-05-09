'use client';
import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { signIn } from 'next-auth/react';

import { useAuth, type UserRole } from '@/app/context/AuthContext';

// ─── Google icon SVG ──────────────────────────────────────────────────────────

function GoogleIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

// ─── OAuth error → human-readable message ────────────────────────────────────

function oauthErrorMsg(code: string): string {
  const map: Record<string, string> = {
    OAuthSignin: 'Could not start Google sign-in. Please try again.',
    OAuthCallback: 'Google sign-in failed. Please try again.',
    OAuthCreateAccount: 'Failed to create account with Google.',
    OAuthAccountNotLinked: 'This email is already registered with a different sign-in method.',
    Callback: 'Authentication error. Please try again.',
    CredentialsSignin: 'Invalid email or password.',
  };
  return map[code] ?? 'Sign-in failed. Please try again.';
}

// ─── Inner component (uses useSearchParams — requires Suspense) ───────────────

function LoginContent() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlError = searchParams.get('error');

  const [role, setRole] = useState<UserRole>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setFormError('');
    setLoading(true);
    const result = await login(email, password, role);
    setLoading(false);
    if (!result.ok) {
      setFormError(result.error ?? 'Login failed.');
    } else {
      router.push('/profile');
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await signIn('google', { callbackUrl: '/profile' });
    // Page will redirect — no need to reset loading
  };

  const displayError = urlError ? oauthErrorMsg(urlError) : formError;

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-stone-800 dark:text-stone-100 tracking-tight hover:text-amber-700 dark:hover:text-amber-400 transition-colors">
            Gautam Homestay
          </Link>
          <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">Welcome back</p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700 p-8">
          <h1 className="text-xl font-semibold text-stone-800 dark:text-stone-100 mb-6">
            Sign in to your account
          </h1>

          {/* ── Google Sign-In ───────────────────────────────────────── */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 border border-stone-300 dark:border-stone-600 rounded-xl px-4 py-2.5 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 disabled:opacity-50 transition-colors"
          >
            <GoogleIcon />
            {googleLoading ? 'Redirecting to Google…' : 'Continue with Google'}
          </button>

          {/* ── Divider ──────────────────────────────────────────────── */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200 dark:border-stone-700" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white dark:bg-stone-900 px-3 text-stone-400 dark:text-stone-500">
                or continue with email
              </span>
            </div>
          </div>

          {/* ── Role Tabs ────────────────────────────────────────────── */}
          <div className="flex rounded-xl bg-stone-100 dark:bg-stone-800 p-1 mb-6">
            {(['customer', 'owner'] as UserRole[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => { setRole(r); setFormError(''); }}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all capitalize ${
                  role === r
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                }`}
              >
                {r === 'customer' ? 'Guest / Customer' : 'Property Owner'}
              </button>
            ))}
          </div>

          {/* ── Credentials Form ─────────────────────────────────────── */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-stone-300 dark:border-stone-600 rounded-xl px-4 py-2.5 text-sm text-stone-800 dark:text-stone-100 bg-white dark:bg-stone-800 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-stone-300 dark:border-stone-600 rounded-xl px-4 py-2.5 text-sm text-stone-800 dark:text-stone-100 bg-white dark:bg-stone-800 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
            </div>

            {displayError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm rounded-xl px-4 py-3">
                {displayError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-stone-500 dark:text-stone-400 mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-amber-700 dark:text-amber-400 font-medium hover:text-amber-800 dark:hover:text-amber-300 transition-colors">
            Create one
          </Link>
        </p>

        <p className="text-center mt-3">
          <Link href="/" className="text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}

// ─── Page (Suspense wrapper required for useSearchParams) ─────────────────────

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
