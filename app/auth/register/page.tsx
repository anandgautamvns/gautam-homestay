'use client';
import { type ChangeEvent, Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { signIn } from 'next-auth/react';

import {
  type CustomerData,
  type OwnerData,
  useAuth,
  type UserRole,
} from '@/app/context/AuthContext';

// ─── Shared styles ────────────────────────────────────────────────────────────

const inputClass =
  'w-full border border-stone-300 dark:border-stone-600 rounded-xl px-4 py-2.5 text-sm text-stone-800 dark:text-stone-100 bg-white dark:bg-stone-800 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition';

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

// ─── Field component ──────────────────────────────────────────────────────────

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
        {label}
        {required && <span className="text-amber-600 ml-0.5">*</span>}
        {hint && <span className="text-stone-400 font-normal ml-1">({hint})</span>}
      </label>
      {children}
    </div>
  );
}

// ─── Initial form state ───────────────────────────────────────────────────────

const initialCustomer: CustomerData = { name: '', email: '', phone: '', dob: '', address: '' };
const initialOwner: OwnerData = {
  name: '',
  email: '',
  phone: '',
  propertyName: '',
  propertyAddress: '',
  rooms: 1,
  gst: '',
};

// ─── Inner component (uses useSearchParams — requires Suspense) ───────────────

function RegisterContent() {
  const { register } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlError = searchParams.get('error');

  const [role, setRole] = useState<UserRole>('customer');
  const [customerData, setCustomerData] = useState<CustomerData>(initialCustomer);
  const [ownerData, setOwnerData] = useState<OwnerData>(initialOwner);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(urlError ? 'Google sign-up failed. Please try again.' : '');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const updateCustomer = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomerData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateOwner = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = e.target.name === 'rooms' ? Number(e.target.value) : e.target.value;
    setOwnerData((prev) => ({ ...prev, [e.target.name]: val }));
  };

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) return setError('Password must be at least 6 characters.');
    if (password !== confirmPassword) return setError('Passwords do not match.');

    const data = role === 'customer' ? customerData : ownerData;
    if (!data.name.trim() || !data.email.trim() || !data.phone.trim()) {
      return setError('Please fill in all required fields.');
    }
    if (role === 'owner') {
      const o = ownerData;
      if (!o.propertyName.trim() || !o.propertyAddress.trim() || o.rooms < 1) {
        return setError('Please fill in all required property fields.');
      }
    }

    setLoading(true);
    const result = await register(role, data, password);
    setLoading(false);

    if (!result.ok) {
      setError(result.error ?? 'Registration failed.');
    } else {
      router.push('/profile');
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await signIn('google', { callbackUrl: '/profile' });
    // Page will redirect — no need to reset loading
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-stone-800 dark:text-stone-100 tracking-tight hover:text-amber-700 dark:hover:text-amber-400 transition-colors">
            Gautam Homestay
          </Link>
          <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">Create your account</p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-700 p-8">
          <h1 className="text-xl font-semibold text-stone-800 dark:text-stone-100 mb-6">Register</h1>

          {/* ── Google Sign-Up ───────────────────────────────────────── */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 border border-stone-300 dark:border-stone-600 rounded-xl px-4 py-2.5 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 disabled:opacity-50 transition-colors"
          >
            <GoogleIcon />
            {googleLoading ? 'Redirecting to Google…' : 'Sign up with Google'}
          </button>

          <p className="text-xs text-stone-400 dark:text-stone-500 text-center mt-2">
            Google sign-up creates a customer account automatically.
          </p>

          {/* ── Divider ──────────────────────────────────────────────── */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200 dark:border-stone-700" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white dark:bg-stone-900 px-3 text-stone-400 dark:text-stone-500">
                or sign up with email
              </span>
            </div>
          </div>

          {/* ── Role Tabs ────────────────────────────────────────────── */}
          <div className="flex rounded-xl bg-stone-100 dark:bg-stone-800 p-1 mb-6">
            {(['customer', 'owner'] as UserRole[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => { setRole(r); setError(''); }}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                  role === r
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                }`}
              >
                {r === 'customer' ? 'Guest / Customer' : 'Property Owner'}
              </button>
            ))}
          </div>

          {/* ── Form ─────────────────────────────────────────────────── */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Shared fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Full Name" required>
                <input name="name" type="text" required value={role === 'customer' ? customerData.name : ownerData.name} onChange={role === 'customer' ? updateCustomer : updateOwner} placeholder="Anita Sharma" className={inputClass} />
              </Field>
              <Field label="Email Address" required>
                <input name="email" type="email" required value={role === 'customer' ? customerData.email : ownerData.email} onChange={role === 'customer' ? updateCustomer : updateOwner} placeholder="anita@example.com" className={inputClass} />
              </Field>
            </div>

            <Field label="Phone Number" required>
              <input name="phone" type="tel" required value={role === 'customer' ? customerData.phone : ownerData.phone} onChange={role === 'customer' ? updateCustomer : updateOwner} placeholder="+91 98765 43210" className={inputClass} />
            </Field>

            {/* Customer-only fields */}
            {role === 'customer' && (
              <>
                <Field label="Date of Birth" hint="Optional">
                  <input name="dob" type="date" value={customerData.dob} onChange={updateCustomer} className={inputClass} />
                </Field>
                <Field label="Home Address" hint="Optional">
                  <input name="address" type="text" value={customerData.address} onChange={updateCustomer} placeholder="123 Main St, City, State" className={inputClass} />
                </Field>
              </>
            )}

            {/* Owner-only fields */}
            {role === 'owner' && (
              <div className="pt-1 border-t border-stone-100 dark:border-stone-700">
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4">Property Details</p>
                <div className="space-y-5">
                  <Field label="Property / Homestay Name" required>
                    <input name="propertyName" type="text" required value={ownerData.propertyName} onChange={updateOwner} placeholder="Gautam Homestay" className={inputClass} />
                  </Field>
                  <Field label="Property Address" required>
                    <input name="propertyAddress" type="text" required value={ownerData.propertyAddress} onChange={updateOwner} placeholder="Village, District, State" className={inputClass} />
                  </Field>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Field label="Number of Rooms" required>
                      <input name="rooms" type="number" min={1} required value={ownerData.rooms} onChange={updateOwner} className={inputClass} />
                    </Field>
                    <Field label="GST Number" hint="Optional">
                      <input name="gst" type="text" value={ownerData.gst} onChange={updateOwner} placeholder="27AAPFU0939F1Z5" className={inputClass} />
                    </Field>
                  </div>
                </div>
              </div>
            )}

            {/* Password fields */}
            <div className="pt-1 border-t border-stone-100 dark:border-stone-700">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4">Set Password</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Password" required>
                  <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 6 characters" className={inputClass} />
                </Field>
                <Field label="Confirm Password" required>
                  <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repeat password" className={inputClass} />
                </Field>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
            >
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-stone-500 dark:text-stone-400 mt-6">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-amber-700 dark:text-amber-400 font-medium hover:text-amber-800 dark:hover:text-amber-300 transition-colors">
            Sign in
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

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterContent />
    </Suspense>
  );
}
