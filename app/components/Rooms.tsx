const rooms = [
  {
    name: "Standard Room",
    price: "₹1,200",
    desc: "Comfortable single or double occupancy with garden view, attached bathroom and essential amenities.",
    features: ["Garden View", "Wi-Fi", "Hot Water", "TV"],
    bg: "bg-stone-100",
    highlight: false,
  },
  {
    name: "Deluxe Room",
    price: "₹1,800",
    desc: "Spacious room with mountain-facing window, premium bedding, and a private balcony to unwind.",
    features: ["Mountain View", "Balcony", "Wi-Fi", "Breakfast Included"],
    bg: "bg-amber-50",
    highlight: true,
  },
  {
    name: "Family Suite",
    price: "₹2,800",
    desc: "A large suite ideal for families with a living area, two bedrooms and a kitchenette.",
    features: ["2 Bedrooms", "Kitchenette", "Living Area", "All Meals"],
    bg: "bg-stone-100",
    highlight: false,
  },
];

export default function Rooms() {
  return (
    <section id="rooms" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase">Accommodation</span>
          <h2 className="text-4xl font-bold text-stone-800 mt-2">Our Rooms</h2>
          <p className="text-stone-500 mt-3 max-w-xl mx-auto">
            Each room is thoughtfully furnished to give you the comfort of home with the charm of a mountain retreat.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div
              key={room.name}
              className={`${room.bg} rounded-2xl p-8 flex flex-col gap-4 ${room.highlight ? "ring-2 ring-amber-500 relative" : ""}`}
            >
              {room.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <div className="w-full h-44 rounded-xl bg-gradient-to-br from-stone-300 to-stone-400 flex items-center justify-center">
                <svg className="w-16 h-16 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
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
                  <li key={f} className="bg-white text-stone-600 text-xs px-3 py-1 rounded-full border border-stone-200">
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-2 w-full text-center bg-stone-800 hover:bg-stone-900 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
              >
                Book This Room
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
