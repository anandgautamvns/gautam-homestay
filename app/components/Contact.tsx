const contactDetails = [
  {
    icon: "📞",
    label: "Phone / WhatsApp",
    value: "+91 98765 43210",
  },
  {
    icon: "✉️",
    label: "Email",
    value: "hello@gautamhomestay.com",
  },
  {
    icon: "📍",
    label: "Location",
    value: "Village Road, Mussoorie, Uttarakhand",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 bg-amber-50">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Info side */}
        <div>
          <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase">Get in Touch</span>
          <h2 className="text-4xl font-bold text-stone-800 mt-2 mb-4">Book Your Stay</h2>
          <p className="text-stone-500 leading-relaxed mb-8">
            Ready to experience Gautam Homestay? Send us a message with your preferred dates and
            room type and we&apos;ll get back to you within a few hours.
          </p>

          <div className="flex flex-col gap-4 text-stone-700">
            {contactDetails.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-xs text-stone-500 uppercase tracking-wide">{item.label}</p>
                  <p className="font-semibold">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form side */}
        <form className="bg-white rounded-2xl p-8 shadow-sm flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-stone-700">First Name</label>
              <input
                type="text"
                placeholder="Anand"
                className="border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-400 transition"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-stone-700">Last Name</label>
              <input
                type="text"
                placeholder="Gautam"
                className="border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-400 transition"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-stone-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-400 transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-stone-700">Check-in</label>
              <input
                type="date"
                className="border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-400 transition"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-stone-700">Check-out</label>
              <input
                type="date"
                className="border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-400 transition"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-stone-700">Room Type</label>
            <select className="border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-400 transition bg-white">
              <option value="">Select a room</option>
              <option>Standard Room — ₹1,200/night</option>
              <option>Deluxe Room — ₹1,800/night</option>
              <option>Family Suite — ₹2,800/night</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-stone-700">Message (optional)</label>
            <textarea
              rows={3}
              placeholder="Special requests, number of guests..."
              className="border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-400 transition resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 rounded-xl transition-colors text-base"
          >
            Send Booking Request
          </button>
        </form>
      </div>
    </section>
  );
}
