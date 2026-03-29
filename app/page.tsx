import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Rooms from "./components/Rooms";
import Amenities from "./components/Amenities";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <Hero />
      <Stats />
      <Rooms />
      <Amenities />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
