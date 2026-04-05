'use client';
import { startTransition, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { type CustomerData, type OwnerData, useAuth } from '@/app/context/AuthContext';

export default function ProfilePage() {
  const { user, isLoading, updateProfile, logout } = useAuth();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<CustomerData | OwnerData | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) router.replace('/auth/login');
  }, [isLoading, user, router]);

  useEffect(() => {
    startTransition(() => {
      if (user) setFormData(structuredClone(user.data));
    });
  }, [user]);

  if (isLoading || !user || !formData) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isCustomer = user.role === 'customer';
  const customer = formData as CustomerData;
  const owner = formData as OwnerData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.name === 'rooms' ? Number(e.target.value) : e.target.value;
    setFormData((prev) => (prev ? { ...prev, [e.target.name]: val } : prev));
  };

  const handleSave = () => {
    if (formData) {
      updateProfile(formData);
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Top bar */}
      <div className="bg-white border-b border-stone-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold text-stone-800 hover:text-amber-700 transition-colors"
          >
            Gautam Homestay
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm text-stone-500 hover:text-stone-800 border border-stone-300 hover:border-stone-400 px-4 py-2 rounded-full transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
        {/* Profile header card */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-2xl font-bold uppercase shrink-0">
            {user.data.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-semibold text-stone-900 truncate">{user.data.name}</h1>
              <span
                className={`text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${
                  isCustomer ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                }`}
              >
                {isCustomer ? 'Guest' : 'Property Owner'}
              </span>
            </div>
            <p className="text-sm text-stone-500 mt-0.5">{user.data.email}</p>
          </div>
          <button
            onClick={() => {
              setEditing((v) => !v);
              setSaved(false);
            }}
            className="text-sm font-medium text-amber-700 hover:text-amber-800 border border-amber-200 hover:border-amber-400 px-4 py-2 rounded-xl transition-colors shrink-0"
          >
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3">
            Profile updated successfully.
          </div>
        )}

        {/* Personal Information */}
        <Section title="Personal Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <EditableField
              label="Full Name"
              name="name"
              value={isCustomer ? customer.name : owner.name}
              editing={editing}
              onChange={handleChange}
            />
            <EditableField
              label="Email Address"
              name="email"
              value={isCustomer ? customer.email : owner.email}
              type="email"
              editing={editing}
              onChange={handleChange}
            />
            <EditableField
              label="Phone Number"
              name="phone"
              value={isCustomer ? customer.phone : owner.phone}
              type="tel"
              editing={editing}
              onChange={handleChange}
            />
            {isCustomer && (
              <>
                <EditableField
                  label="Date of Birth"
                  name="dob"
                  value={customer.dob ?? ''}
                  type="date"
                  editing={editing}
                  onChange={handleChange}
                  optional
                />
                <div className="md:col-span-2">
                  <EditableField
                    label="Home Address"
                    name="address"
                    value={customer.address ?? ''}
                    editing={editing}
                    onChange={handleChange}
                    optional
                  />
                </div>
              </>
            )}
          </div>
        </Section>

        {/* Owner: Property Details */}
        {!isCustomer && (
          <Section title="Property Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <EditableField
                label="Property / Homestay Name"
                name="propertyName"
                value={owner.propertyName}
                editing={editing}
                onChange={handleChange}
              />
              <EditableField
                label="Number of Rooms"
                name="rooms"
                value={String(owner.rooms)}
                type="number"
                editing={editing}
                onChange={handleChange}
              />
              <div className="md:col-span-2">
                <EditableField
                  label="Property Address"
                  name="propertyAddress"
                  value={owner.propertyAddress}
                  editing={editing}
                  onChange={handleChange}
                />
              </div>
              <div className="md:col-span-2">
                <EditableField
                  label="GST Number"
                  name="gst"
                  value={owner.gst ?? ''}
                  editing={editing}
                  onChange={handleChange}
                  optional
                />
              </div>
            </div>
          </Section>
        )}

        {/* Save button */}
        {editing && (
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
            >
              Save Changes
            </button>
          </div>
        )}

        {/* Account */}
        <Section title="Account">
          <div className="flex items-center justify-between py-1">
            <div>
              <p className="text-sm font-medium text-stone-700">Account ID</p>
              <p className="text-xs text-stone-400 mt-0.5 font-mono">{user.id}</p>
            </div>
          </div>
          <div className="border-t border-stone-100 pt-4 mt-2">
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
            >
              Sign out of this account
            </button>
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6">
      <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-wider mb-5">
        {title}
      </h2>
      {children}
    </div>
  );
}

function EditableField({
  label,
  name,
  value,
  type = 'text',
  editing,
  onChange,
  optional,
}: {
  label: string;
  name: string;
  value: string;
  type?: string;
  editing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  optional?: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1.5">
        {label}
        {optional && <span className="ml-1 normal-case text-stone-300">(optional)</span>}
      </p>
      {editing ? (
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
        />
      ) : (
        <p className="text-sm text-stone-800">
          {value || <span className="text-stone-400 italic">Not provided</span>}
        </p>
      )}
    </div>
  );
}
