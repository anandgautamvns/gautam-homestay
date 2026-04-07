'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useTranslation } from 'react-i18next';

import { useAuth } from '@/app/context/AuthContext';

import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white/90 dark:bg-stone-900/90 backdrop-blur border-b border-stone-200 dark:border-stone-700">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          {/* LEFT: Brand */}
          <div className="flex items-center flex-1 md:flex-none">
            <Link href="/" className="text-lg md:text-xl font-bold text-stone-800 dark:text-stone-100 tracking-tight">
              {t('nav.brand')}
            </Link>
          </div>

          {/* CENTER: Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600 dark:text-stone-400 mx-auto">
            <Link href="/#rooms" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              {t('nav.rooms')}
            </Link>
            <Link href="/#amenities" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              {t('nav.amenities')}
            </Link>
            <Link href="/#gallery" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              {t('nav.gallery')}
            </Link>
            <Link href="/#contact" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              {t('nav.contact')}
            </Link>
          </nav>

          {/* RIGHT: Auth + controls */}
          <div className="flex items-center gap-3 md:gap-4 ml-4">
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="hidden sm:flex items-center gap-2 text-sm font-medium text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                >
                  <span className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 flex items-center justify-center font-semibold text-xs uppercase">
                    {user?.data?.name?.charAt(0) ?? 'U'}
                  </span>
                  <span className="hidden md:inline">{user?.data?.name?.split(' ')[0]}</span>
                  <span className="hidden md:inline text-xs text-amber-600 dark:text-amber-400 font-normal capitalize">
                    ({user?.role})
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="hidden sm:inline text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 transition-colors border border-stone-300 dark:border-stone-600 px-3 py-1.5 rounded-full hover:border-stone-400 dark:hover:border-stone-400"
                >
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="hidden sm:inline text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  href="/auth/register"
                  className="hidden sm:inline bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
                >
                  {t('nav.register')}
                </Link>
              </>
            )}

            {/* Language & Theme always visible at the far right */}
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((s) => !s)}
              className="md:hidden ml-1 inline-flex items-center justify-center p-2 rounded-md text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE: expandable menu flows under header */}
      <div className={`md:hidden pt-16 ${mobileOpen ? 'block' : 'hidden'}`}>
        <div className="bg-white/95 dark:bg-stone-900/95 border-b border-stone-200 dark:border-stone-700">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3">
            <nav className="flex flex-col gap-2 text-sm font-medium text-stone-700 dark:text-stone-300">
              <Link href="/#rooms" onClick={() => setMobileOpen(false)} className="py-2 px-2 rounded hover:bg-stone-100 dark:hover:bg-stone-800">
                {t('nav.rooms')}
              </Link>
              <Link href="/#amenities" onClick={() => setMobileOpen(false)} className="py-2 px-2 rounded hover:bg-stone-100 dark:hover:bg-stone-800">
                {t('nav.amenities')}
              </Link>
              <Link href="/#gallery" onClick={() => setMobileOpen(false)} className="py-2 px-2 rounded hover:bg-stone-100 dark:hover:bg-stone-800">
                {t('nav.gallery')}
              </Link>
              <Link href="/#contact" onClick={() => setMobileOpen(false)} className="py-2 px-2 rounded hover:bg-stone-100 dark:hover:bg-stone-800">
                {t('nav.contact')}
              </Link>
            </nav>

            <div className="border-t border-stone-200 dark:border-stone-700 pt-3 flex flex-col gap-2">
              {user ? (
                <>
                  <Link href="/profile" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 flex items-center justify-center font-semibold text-xs uppercase">
                      {user?.data?.name?.charAt(0) ?? 'U'}
                    </span>
                    <div className="text-sm">
                      <div className="font-medium text-stone-900 dark:text-stone-100">{user?.data?.name}</div>
                      <div className="text-xs text-amber-600 dark:text-amber-400">({user?.role})</div>
                    </div>
                  </Link>
                  <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="text-left text-sm text-stone-600 dark:text-stone-300">
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="text-sm text-stone-700 dark:text-stone-300">
                    {t('nav.login')}
                  </Link>
                  <Link href="/auth/register" onClick={() => setMobileOpen(false)} className="text-sm bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded-full inline-block w-max">
                    {t('nav.register')}
                  </Link>
                </>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}