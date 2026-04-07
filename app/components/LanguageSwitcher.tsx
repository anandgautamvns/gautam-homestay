'use client';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';

  return (
    <button
      onClick={() => i18n.changeLanguage(isHindi ? 'en' : 'hi')}
      aria-label="Switch language"
      className="text-xs font-semibold px-3 py-1.5 rounded-full border border-stone-300 dark:border-stone-600 text-stone-600 dark:text-stone-400 hover:border-amber-500 hover:text-amber-700 dark:hover:border-amber-400 dark:hover:text-amber-400 transition-colors tracking-wide"
    >
      {isHindi ? 'EN' : 'हिं'}
    </button>
  );
}
