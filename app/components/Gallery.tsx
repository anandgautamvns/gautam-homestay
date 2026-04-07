'use client';
import { useTranslation } from 'react-i18next';

import { useGetGalleryQuery } from '@/app/features/api/homestayApi';

import SectionError from './ui/SectionError';

export default function Gallery() {
  const { t } = useTranslation();
  const { data: photos, isLoading, isError, refetch } = useGetGalleryQuery();

  return (
    <section id="gallery" className="py-20 px-6 bg-white dark:bg-stone-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-amber-600 dark:text-amber-400 text-sm font-semibold tracking-widest uppercase">
            {t('gallery.eyebrow')}
          </span>
          <h2 className="text-4xl font-bold text-stone-800 dark:text-stone-100 mt-2">{t('gallery.heading')}</h2>
          <p className="text-stone-500 dark:text-stone-400 mt-3">{t('gallery.body')}</p>
        </div>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`bg-stone-200 rounded-2xl ${i === 1 ? 'row-span-2 min-h-[320px]' : 'min-h-[150px]'}`}
              />
            ))}
          </div>
        )}

        {isError && (
          <SectionError message={t('gallery.error')} onRetry={refetch} />
        )}

        {photos && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((item) => (
              <div
                key={item.id}
                className={`bg-gradient-to-br ${item.bg} rounded-2xl flex items-end p-4 ${item.tall ? 'row-span-2 min-h-[320px]' : 'min-h-[150px]'}`}
              >
                <span className="text-white text-sm font-medium bg-black/30 px-3 py-1 rounded-full">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
