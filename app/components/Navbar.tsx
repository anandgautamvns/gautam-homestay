export default function Navbar() {
  return (
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
  );
}
