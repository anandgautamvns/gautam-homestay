'use client';
import { useGetGalleryQuery } from '@/app/features/api/homestayApi';

import SectionError from './ui/SectionError';

export default function Gallery() {
  const { data: photos, isLoading, isError, refetch } = useGetGalleryQuery();

  return (
    <section id="gallery" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase">
            Photos
          </span>
          <h2 className="text-4xl font-bold text-stone-800 mt-2">Gallery</h2>
          <p className="text-stone-500 mt-3">A glimpse into life at Gautam Homestay.</p>
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
          <SectionError
            message="Could not load gallery photos. Please try again."
            onRetry={refetch}
          />
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
