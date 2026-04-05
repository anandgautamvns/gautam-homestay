/** Animated placeholder shown while a section's data is loading. */
export default function SectionSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="animate-pulse" aria-busy="true" aria-label="Loading…">
      <div className="flex flex-col gap-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-6 bg-stone-200 rounded-xl w-full" />
        ))}
      </div>
    </div>
  );
}
