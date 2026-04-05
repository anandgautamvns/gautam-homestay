'use client';
import { useGetStatsQuery } from '@/app/features/api/homestayApi';

import SectionError from './ui/SectionError';

export default function Stats() {
  const { data: stats, isLoading, isError, refetch } = useGetStatsQuery();

  return (
    <section className="bg-amber-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2 animate-pulse">
                <div className="h-9 w-20 bg-amber-200 rounded-xl" />
                <div className="h-4 w-28 bg-stone-200 rounded-xl" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <SectionError message="Could not load statistics. Please try again." onRetry={refetch} />
        )}

        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.id}>
                <p className="text-3xl font-bold text-amber-700">{stat.number}</p>
                <p className="text-stone-600 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
