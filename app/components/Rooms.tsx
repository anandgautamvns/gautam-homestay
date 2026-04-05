'use client';
import Link from 'next/link';

import { useGetRoomsQuery } from '@/app/features/api/homestayApi';

import SectionError from './ui/SectionError';

export default function Rooms() {
  const { data: rooms, isLoading, isError, refetch } = useGetRoomsQuery();

  return (
    <section id="rooms" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase">
            Accommodation
          </span>
          <h2 className="text-4xl font-bold text-stone-800 mt-2">Our Rooms</h2>
          <p className="text-stone-500 mt-3 max-w-xl mx-auto">
            Each room is thoughtfully furnished to give you the comfort of home with the charm of a
            mountain retreat.
          </p>
        </div>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid md:grid-cols-3 gap-8 animate-pulse">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-stone-100 rounded-2xl p-8 flex flex-col gap-4">
                <div className="w-full h-44 rounded-xl bg-stone-200" />
                <div className="h-5 bg-stone-200 rounded-xl w-2/3" />
                <div className="h-4 bg-stone-200 rounded-xl w-full" />
                <div className="h-4 bg-stone-200 rounded-xl w-4/5" />
                <div className="flex gap-2 mt-auto">
                  {Array.from({ length: 3 }).map((__, j) => (
                    <div key={j} className="h-6 w-20 bg-stone-200 rounded-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <SectionError
            message="Could not load room listings. Please try again."
            onRetry={refetch}
          />
        )}

        {rooms && (
          <div className="grid md:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <div
                key={room.id}
                className={`${room.highlight ? 'bg-amber-50 ring-2 ring-amber-500' : 'bg-stone-100'} rounded-2xl p-8 flex flex-col gap-4 relative`}
              >
                {room.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}

                <div className="w-full h-44 rounded-xl bg-gradient-to-br from-stone-300 to-stone-400 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-stone-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-stone-800">{room.name}</h3>
                    <span className="text-amber-700 font-bold">
                      {room.price}
                      <span className="text-stone-500 font-normal text-sm">/night</span>
                    </span>
                  </div>
                  <p className="text-stone-500 text-sm mt-2 leading-relaxed">{room.desc}</p>
                </div>

                <ul className="flex flex-wrap gap-2 mt-auto">
                  {room.features.map((f) => (
                    <li
                      key={f}
                      className="bg-white text-stone-600 text-xs px-3 py-1 rounded-full border border-stone-200"
                    >
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/#contact"
                  className="mt-2 w-full text-center bg-stone-800 hover:bg-stone-900 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
                >
                  Book This Room
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
