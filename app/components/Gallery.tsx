const photos = [
  { bg: "from-stone-400 to-stone-500", label: "Living Area", tall: false },
  { bg: "from-amber-400 to-amber-600", label: "Garden View", tall: true },
  { bg: "from-stone-500 to-stone-600", label: "Deluxe Room", tall: false },
  { bg: "from-green-700 to-green-800", label: "Mountain Trail", tall: false },
  { bg: "from-amber-700 to-amber-800", label: "Home Kitchen", tall: false },
  { bg: "from-stone-300 to-stone-400", label: "Terrace", tall: false },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase">Photos</span>
          <h2 className="text-4xl font-bold text-stone-800 mt-2">Gallery</h2>
          <p className="text-stone-500 mt-3">A glimpse into life at Gautam Homestay.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((item, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${item.bg} rounded-2xl flex items-end p-4 ${item.tall ? "row-span-2 min-h-[320px]" : "min-h-[150px]"}`}
            >
              <span className="text-white text-sm font-medium bg-black/30 px-3 py-1 rounded-full">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
