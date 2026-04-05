'use client';
import { useGetReviewsQuery } from '@/app/features/api/homestayApi';

import SectionError from './ui/SectionError';

export default function Testimonials() {
  const { data: reviews, isLoading, isError, refetch } = useGetReviewsQuery();

  return (
    <section className="py-20 px-6 bg-stone-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">
            Guest Reviews
          </span>
          <h2 className="text-4xl font-bold text-white mt-2">What Our Guests Say</h2>
        </div>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid md:grid-cols-3 gap-6 animate-pulse">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-stone-700 rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((__, j) => (
                    <div key={j} className="w-4 h-4 bg-stone-600 rounded" />
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="h-3 bg-stone-600 rounded-xl w-full" />
                  <div className="h-3 bg-stone-600 rounded-xl w-4/5" />
                  <div className="h-3 bg-stone-600 rounded-xl w-3/5" />
                </div>
                <div className="pt-4 border-t border-stone-600 flex flex-col gap-1">
                  <div className="h-4 bg-stone-600 rounded-xl w-1/3" />
                  <div className="h-3 bg-stone-600 rounded-xl w-1/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <SectionError
            message="Could not load guest reviews. Please try again."
            onRetry={refetch}
            variant="dark"
          />
        )}

        {reviews && (
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((t) => (
              <div key={t.id} className="bg-stone-700 rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex text-amber-400 text-sm">{'★'.repeat(t.rating)}</div>
                <p className="text-stone-200 leading-relaxed italic">&ldquo;{t.review}&rdquo;</p>
                <div className="mt-auto pt-4 border-t border-stone-600">
                  <p className="text-white font-semibold">{t.name}</p>
                  <p className="text-stone-400 text-sm">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
