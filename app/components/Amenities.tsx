const amenities = [
  { icon: "🍽️", title: "Home-Cooked Meals", desc: "Fresh, local meals prepared with love every day." },
  { icon: "📶", title: "Free Wi-Fi", desc: "High-speed internet throughout the property." },
  { icon: "🚿", title: "Hot Water", desc: "24/7 hot water supply in all rooms." },
  { icon: "🌿", title: "Garden & Terrace", desc: "Lush garden and terrace with panoramic views." },
  { icon: "🅿️", title: "Free Parking", desc: "Ample secured parking for guests." },
  { icon: "🧺", title: "Laundry Service", desc: "Same-day laundry available on request." },
  { icon: "🗺️", title: "Local Tours", desc: "Guided tours to nearby attractions." },
  { icon: "☕", title: "Evening Tea", desc: "Complimentary evening tea & snacks daily." },
];

export default function Amenities() {
  return (
    <section id="amenities" className="py-20 px-6 bg-stone-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase">What We Offer</span>
          <h2 className="text-4xl font-bold text-stone-800 mt-2">Amenities</h2>
          <p className="text-stone-500 mt-3 max-w-xl mx-auto">
            Everything you need for a comfortable and memorable stay.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {amenities.map((item) => (
            <div key={item.title} className="bg-white rounded-2xl p-6 flex flex-col gap-3 hover:shadow-md transition-shadow">
              <span className="text-3xl">{item.icon}</span>
              <h3 className="font-semibold text-stone-800">{item.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
