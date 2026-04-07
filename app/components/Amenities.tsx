'use client';
import { useTranslation } from 'react-i18next';

import { useGetAmenitiesQuery } from '@/app/features/api/homestayApi';

import SectionError from './ui/SectionError';

export default function Amenities() {
  const { t } = useTranslation();
  const { data: amenities, isLoading, isError, refetch } = useGetAmenitiesQuery();

  return (
    <section id="amenities" className="py-20 px-6 bg-stone-50 dark:bg-stone-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-amber-600 dark:text-amber-400 text-sm font-semibold tracking-widest uppercase">
            {t('amenities.eyebrow')}
          </span>
          <h2 className="text-4xl font-bold text-stone-800 dark:text-stone-100 mt-2">{t('amenities.heading')}</h2>
          <p className="text-stone-500 dark:text-stone-400 mt-3 max-w-xl mx-auto">
            {t('amenities.body')}
          </p>
        </div>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 flex flex-col gap-3">
                <div className="w-10 h-10 bg-stone-200 rounded-xl" />
                <div className="h-4 bg-stone-200 rounded-xl w-3/4" />
                <div className="h-3 bg-stone-100 rounded-xl w-full" />
                <div className="h-3 bg-stone-100 rounded-xl w-4/5" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <SectionError message={t('amenities.error')} onRetry={refetch} />
        )}

        {amenities && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {amenities.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-stone-800 rounded-2xl p-6 flex flex-col gap-3 hover:shadow-md transition-shadow"
              >
                <span className="text-3xl">{item.icon}</span>
                <h3 className="font-semibold text-stone-800 dark:text-stone-100">{item.title}</h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
