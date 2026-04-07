import Amenities from './components/Amenities';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Rooms from './components/Rooms';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950 font-sans">
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
