export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <span className="text-white font-semibold text-base">Gautam Homestay</span>
        <p>© {new Date().getFullYear()} Gautam Homestay. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#rooms" className="hover:text-white transition-colors">
            Rooms
          </a>
          <a href="#amenities" className="hover:text-white transition-colors">
            Amenities
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
