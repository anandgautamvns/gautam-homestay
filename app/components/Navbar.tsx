'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/app/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-stone-800 tracking-tight">
          Gautam Homestay
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <Link href="/#rooms" className="hover:text-stone-900 transition-colors">
            Rooms
          </Link>
          <Link href="/#amenities" className="hover:text-stone-900 transition-colors">
            Amenities
          </Link>
          <Link href="/#gallery" className="hover:text-stone-900 transition-colors">
            Gallery
          </Link>
          <Link href="/#contact" className="hover:text-stone-900 transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2 text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors"
              >
                <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-semibold text-xs uppercase">
                  {user.data.name.charAt(0)}
                </span>
                <span className="hidden md:inline">{user.data.name.split(' ')[0]}</span>
                <span className="hidden md:inline text-xs text-amber-600 font-normal capitalize">
                  ({user.role})
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors border border-stone-300 px-4 py-2 rounded-full hover:border-stone-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
