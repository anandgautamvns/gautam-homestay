const reviews = [
  {
    name: "Priya Sharma",
    location: "Delhi",
    review:
      "The warmth of the hosts made us feel completely at home. The food was absolutely delicious. Will definitely visit again!",
    rating: 5,
  },
  {
    name: "Rahul Mehta",
    location: "Mumbai",
    review:
      "Perfect getaway from the city. The mountain view from our balcony was breathtaking. Highly recommend the Deluxe Room.",
    rating: 5,
  },
  {
    name: "Anjali Verma",
    location: "Bangalore",
    review:
      "Clean rooms, great food, and the host arranged a local trek for us. Amazing value for money!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-6 bg-stone-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Guest Reviews</span>
          <h2 className="text-4xl font-bold text-white mt-2">What Our Guests Say</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((t) => (
            <div key={t.name} className="bg-stone-700 rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex text-amber-400 text-sm">
                {"★".repeat(t.rating)}
              </div>
              <p className="text-stone-200 leading-relaxed italic">"{t.review}"</p>
              <div className="mt-auto pt-4 border-t border-stone-600">
                <p className="text-white font-semibold">{t.name}</p>
                <p className="text-stone-400 text-sm">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
