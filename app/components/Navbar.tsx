'use client';
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

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 dark:bg-stone-900/90 backdrop-blur border-b border-stone-200 dark:border-stone-700">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-stone-800 dark:text-stone-100 tracking-tight">
          {t('nav.brand')}
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600 dark:text-stone-400">
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

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          {user ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2 text-sm font-medium text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              >
                <span className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 flex items-center justify-center font-semibold text-xs uppercase">
                  {user.data.name.charAt(0)}
                </span>
                <span className="hidden md:inline">{user.data.name.split(' ')[0]}</span>
                <span className="hidden md:inline text-xs text-amber-600 dark:text-amber-400 font-normal capitalize">
                  ({user.role})
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 transition-colors border border-stone-300 dark:border-stone-600 px-4 py-2 rounded-full hover:border-stone-400 dark:hover:border-stone-400"
              >
                {t('nav.logout')}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              >
                {t('nav.login')}
              </Link>
              <Link
                href="/auth/register"
                className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
              >
                {t('nav.register')}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
