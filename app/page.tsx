export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ── Navbar ── */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold text-stone-800 tracking-tight">
            Gautam Homestay
          </span>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <a href="#rooms" className="hover:text-stone-900 transition-colors">Rooms</a>
            <a href="#amenities" className="hover:text-stone-900 transition-colors">Amenities</a>
            <a href="#gallery" className="hover:text-stone-900 transition-colors">Gallery</a>
            <a href="#contact" className="hover:text-stone-900 transition-colors">Contact</a>
          </nav>
          <a
            href="#contact"
            className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            Book Now
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-900">
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800/80 to-amber-900/40" />

        {/* background pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <span className="inline-block bg-amber-600/20 text-amber-300 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 border border-amber-500/30">
            Welcome to Gautam Homestay
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            A Home Away <br />
            <span className="text-amber-400">From Home</span>
          </h1>
          <p className="text-stone-300 text-lg md:text-xl leading-relaxed mb-10">
            Nestled in the heart of nature — experience warm hospitality,
            home-cooked meals, and peaceful surroundings that rejuvenate your soul.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#rooms"
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-4 rounded-full transition-colors text-base"
            >
              Explore Rooms
            </a>
            <a
              href="#contact"
              className="border border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-full transition-colors text-base backdrop-blur-sm"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-400 text-xs">
          <span>Scroll to explore</span>
          <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── About Strip ── */}
      <section className="bg-amber-50 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "10+", label: "Years of Hospitality" },
            { number: "500+", label: "Happy Guests" },
            { number: "8", label: "Cozy Rooms" },
            { number: "4.9★", label: "Average Rating" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-amber-700">{stat.number}</p>
              <p className="text-stone-600 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Rooms ── */}
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
            {[
              {
                name: "Standard Room",
                price: "₹1,200",
                desc: "Comfortable single or double occupancy with garden view, attached bathroom and essential amenities.",
                features: ["Garden View", "Wi-Fi", "Hot Water", "TV"],
                bg: "bg-stone-100",
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
              },
            ].map((room) => (
              <div
                key={room.name}
                className={`${room.bg} rounded-2xl p-8 flex flex-col gap-4 ${room.highlight ? "ring-2 ring-amber-500 relative" : ""}`}
              >
                {room.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                {/* Room illustration placeholder */}
                <div className="w-full h-44 rounded-xl bg-gradient-to-br from-stone-300 to-stone-400 flex items-center justify-center">
                  <svg className="w-16 h-16 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-stone-800">{room.name}</h3>
                    <span className="text-amber-700 font-bold">{room.price}<span className="text-stone-500 font-normal text-sm">/night</span></span>
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

      {/* ── Amenities ── */}
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
            {[
              { icon: "🍽️", title: "Home-Cooked Meals", desc: "Fresh, local meals prepared with love every day." },
              { icon: "📶", title: "Free Wi-Fi", desc: "High-speed internet throughout the property." },
              { icon: "🚿", title: "Hot Water", desc: "24/7 hot water supply in all rooms." },
              { icon: "🌿", title: "Garden & Terrace", desc: "Lush garden and terrace with panoramic views." },
              { icon: "🅿️", title: "Free Parking", desc: "Ample secured parking for guests." },
              { icon: "🧺", title: "Laundry Service", desc: "Same-day laundry available on request." },
              { icon: "🗺️", title: "Local Tours", desc: "Guided tours to nearby attractions." },
              { icon: "☕", title: "Evening Tea", desc: "Complimentary evening tea & snacks daily." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 flex flex-col gap-3 hover:shadow-md transition-shadow">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="font-semibold text-stone-800">{item.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section id="gallery" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase">Photos</span>
            <h2 className="text-4xl font-bold text-stone-800 mt-2">Gallery</h2>
            <p className="text-stone-500 mt-3">A glimpse into life at Gautam Homestay.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { bg: "from-stone-400 to-stone-500", label: "Living Area" },
              { bg: "from-amber-400 to-amber-600", label: "Garden View", tall: true },
              { bg: "from-stone-500 to-stone-600", label: "Deluxe Room" },
              { bg: "from-green-700 to-green-800", label: "Mountain Trail" },
              { bg: "from-amber-700 to-amber-800", label: "Home Kitchen" },
              { bg: "from-stone-300 to-stone-400", label: "Terrace" },
            ].map((item, i) => (
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

      {/* ── Testimonials ── */}
      <section className="py-20 px-6 bg-stone-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Guest Reviews</span>
            <h2 className="text-4xl font-bold text-white mt-2">What Our Guests Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Priya Sharma",
                location: "Delhi",
                review: "The warmth of the hosts made us feel completely at home. The food was absolutely delicious. Will definitely visit again!",
                rating: 5,
              },
              {
                name: "Rahul Mehta",
                location: "Mumbai",
                review: "Perfect getaway from the city. The mountain view from our balcony was breathtaking. Highly recommend the Deluxe Room.",
                rating: 5,
              },
              {
                name: "Anjali Verma",
                location: "Bangalore",
                review: "Clean rooms, great food, and the host arranged a local trek for us. Amazing value for money!",
                rating: 5,
              },
            ].map((t) => (
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

      {/* ── Contact / Booking ── */}
      <section id="contact" className="py-20 px-6 bg-amber-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase">Get in Touch</span>
            <h2 className="text-4xl font-bold text-stone-800 mt-2 mb-4">Book Your Stay</h2>
            <p className="text-stone-500 leading-relaxed mb-8">
              Ready to experience Gautam Homestay? Send us a message with your preferred dates and room type and we'll get back to you within a few hours.
            </p>

            <div className="flex flex-col gap-4 text-stone-700">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="text-xs text-stone-500 uppercase tracking-wide">Phone / WhatsApp</p>
                  <p className="font-semibold">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">✉️</span>
                <div>
                  <p className="text-xs text-stone-500 uppercase tracking-wide">Email</p>
                  <p className="font-semibold">hello@gautamhomestay.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="text-xs text-stone-500 uppercase tracking-wide">Location</p>
                  <p className="font-semibold">Village Road, Mussoorie, Uttarakhand</p>
                </div>
              </div>
            </div>
          </div>

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

      {/* ── Footer ── */}
      <footer className="bg-stone-900 text-stone-400 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <span className="text-white font-semibold text-base">Gautam Homestay</span>
          <p>© {new Date().getFullYear()} Gautam Homestay. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#rooms" className="hover:text-white transition-colors">Rooms</a>
            <a href="#amenities" className="hover:text-white transition-colors">Amenities</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
