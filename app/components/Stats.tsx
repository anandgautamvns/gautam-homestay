const stats = [
  { number: "10+", label: "Years of Hospitality" },
  { number: "500+", label: "Happy Guests" },
  { number: "8", label: "Cozy Rooms" },
  { number: "4.9★", label: "Average Rating" },
];

export default function Stats() {
  return (
    <section className="bg-amber-50 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-3xl font-bold text-amber-700">{stat.number}</p>
            <p className="text-stone-600 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
