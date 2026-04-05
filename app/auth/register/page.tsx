'use client';
import { type ChangeEvent, type FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  type CustomerData,
  type OwnerData,
  useAuth,
  type UserRole,
} from '@/app/context/AuthContext';

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

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [role, setRole] = useState<UserRole>('customer');
  const [customerData, setCustomerData] = useState<CustomerData>(initialCustomer);
  const [ownerData, setOwnerData] = useState<OwnerData>(initialOwner);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const updateCustomer = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomerData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateOwner = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = e.target.name === 'rooms' ? Number(e.target.value) : e.target.value;
    setOwnerData((prev) => ({ ...prev, [e.target.name]: val }));
  };

  const handleSubmit = async (e: FormEvent) => {
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

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="text-2xl font-bold text-stone-800 tracking-tight hover:text-amber-700 transition-colors"
          >
            Gautam Homestay
          </Link>
          <p className="text-stone-500 text-sm mt-1">Create your account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
          <h1 className="text-xl font-semibold text-stone-800 mb-6">Register</h1>

          {/* Role Tabs */}
          <div className="flex rounded-xl bg-stone-100 p-1 mb-6">
            {(['customer', 'owner'] as UserRole[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setRole(r);
                  setError('');
                }}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                  role === r
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                {r === 'customer' ? 'Guest / Customer' : 'Property Owner'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* ── Shared fields ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Full Name" required>
                <input
                  name="name"
                  type="text"
                  required
                  value={role === 'customer' ? customerData.name : ownerData.name}
                  onChange={role === 'customer' ? updateCustomer : updateOwner}
                  placeholder="Anita Sharma"
                  className={inputClass}
                />
              </Field>
              <Field label="Email Address" required>
                <input
                  name="email"
                  type="email"
                  required
                  value={role === 'customer' ? customerData.email : ownerData.email}
                  onChange={role === 'customer' ? updateCustomer : updateOwner}
                  placeholder="anita@example.com"
                  className={inputClass}
                />
              </Field>
            </div>

            <Field label="Phone Number" required>
              <input
                name="phone"
                type="tel"
                required
                value={role === 'customer' ? customerData.phone : ownerData.phone}
                onChange={role === 'customer' ? updateCustomer : updateOwner}
                placeholder="+91 98765 43210"
                className={inputClass}
              />
            </Field>

            {/* ── Customer-only fields ── */}
            {role === 'customer' && (
              <>
                <Field label="Date of Birth" hint="Optional">
                  <input
                    name="dob"
                    type="date"
                    value={customerData.dob}
                    onChange={updateCustomer}
                    className={inputClass}
                  />
                </Field>
                <Field label="Home Address" hint="Optional">
                  <input
                    name="address"
                    type="text"
                    value={customerData.address}
                    onChange={updateCustomer}
                    placeholder="123 Main St, City, State"
                    className={inputClass}
                  />
                </Field>
              </>
            )}

            {/* ── Owner-only fields ── */}
            {role === 'owner' && (
              <>
                <div className="pt-1 border-t border-stone-100">
                  <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4">
                    Property Details
                  </p>
                  <div className="space-y-5">
                    <Field label="Property / Homestay Name" required>
                      <input
                        name="propertyName"
                        type="text"
                        required
                        value={ownerData.propertyName}
                        onChange={updateOwner}
                        placeholder="Gautam Homestay"
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Property Address" required>
                      <input
                        name="propertyAddress"
                        type="text"
                        required
                        value={ownerData.propertyAddress}
                        onChange={updateOwner}
                        placeholder="Village, District, State"
                        className={inputClass}
                      />
                    </Field>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Field label="Number of Rooms" required>
                        <input
                          name="rooms"
                          type="number"
                          min={1}
                          required
                          value={ownerData.rooms}
                          onChange={updateOwner}
                          className={inputClass}
                        />
                      </Field>
                      <Field label="GST Number" hint="Optional">
                        <input
                          name="gst"
                          type="text"
                          value={ownerData.gst}
                          onChange={updateOwner}
                          placeholder="27AAPFU0939F1Z5"
                          className={inputClass}
                        />
                      </Field>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ── Password fields ── */}
            <div className="pt-1 border-t border-stone-100">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4">
                Set Password
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Password" required>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className={inputClass}
                  />
                </Field>
                <Field label="Confirm Password" required>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className={inputClass}
                  />
                </Field>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
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

        <p className="text-center text-sm text-stone-500 mt-6">
          Already have an account?{' '}
          <Link
            href="/auth/login"
            className="text-amber-700 font-medium hover:text-amber-800 transition-colors"
          >
            Sign in
          </Link>
        </p>

        <p className="text-center mt-3">
          <Link href="/" className="text-xs text-stone-400 hover:text-stone-600 transition-colors">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputClass =
  'w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition';

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
      <label className="block text-sm font-medium text-stone-700 mb-1.5">
        {label}
        {required && <span className="text-amber-600 ml-0.5">*</span>}
        {hint && <span className="text-stone-400 font-normal ml-1">({hint})</span>}
      </label>
      {children}
    </div>
  );
}
