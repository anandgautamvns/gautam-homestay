'use client';
import { useTranslation } from 'react-i18next';

interface SectionErrorProps {
  message?: string;
  onRetry?: () => void;
  /** Use `dark` variant on dark-background sections (e.g. stone-800). */
  variant?: 'light' | 'dark';
}

/** Error state shown when an RTK Query request fails. */
export default function SectionError({
  message = 'Something went wrong. Please try again.',
  onRetry,
  variant = 'light',
}: SectionErrorProps) {
  const { t } = useTranslation();
  const isDark = variant === 'dark';

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 py-16 text-center ${isDark ? 'text-stone-300' : 'text-stone-500'}`}
      role="alert"
    >
      <span className="text-4xl" aria-hidden="true">
        ⚠️
      </span>
      <p className={`text-sm font-medium ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className={`text-sm font-semibold px-5 py-2 rounded-full border transition-colors ${
            isDark
              ? 'border-stone-500 text-stone-200 hover:border-amber-400 hover:text-amber-400'
              : 'border-stone-300 text-stone-700 hover:border-amber-500 hover:text-amber-700'
          }`}
        >
          {t('common.retry')}
        </button>
      )}
    </div>
  );
}
