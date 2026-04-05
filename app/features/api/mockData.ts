// ─── Type Definitions ──────────────────────────────────────────────────────

export interface HomestayInfo {
  name: string;
  tagline: string;
  heading: string;
  subtitle: string;
  checkInTime: string;
  checkOutTime: string;
}

export interface Room {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  desc: string;
  features: string[];
  highlight: boolean;
}

export interface Stat {
  id: number;
  number: string;
  label: string;
}

export interface Amenity {
  id: number;
  icon: string;
  title: string;
  desc: string;
}

export interface GalleryPhoto {
  id: number;
  bg: string;
  label: string;
  tall: boolean;
}

export interface Review {
  id: number;
  name: string;
  location: string;
  review: string;
  rating: number;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
}

export interface BookingRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  message: string;
}

export interface BookingConfirmation {
  confirmationId: string;
  message: string;
  room: string;
  checkIn: string;
  checkOut: string;
}

// ─── Mock Data ─────────────────────────────────────────────────────────────

export const mockHomestayInfo: HomestayInfo = {
  name: 'Gautam Homestay',
  tagline: 'Welcome to Gautam Homestay',
  heading: 'A Home Away From Home',
  subtitle:
    'Nestled in the heart of nature — experience warm hospitality, home-cooked meals, and peaceful surroundings that rejuvenate your soul.',
  checkInTime: '12:00 PM',
  checkOutTime: '11:00 AM',
};

export const mockRooms: Room[] = [
  {
    id: 1,
    name: 'Standard Room',
    price: '₹1,200',
    priceNum: 1200,
    desc: 'Comfortable single or double occupancy with garden view and all essential amenities for a relaxing stay.',
    features: ['Garden View', 'Wi-Fi', 'Hot Water', 'TV'],
    highlight: false,
  },
  {
    id: 2,
    name: 'Deluxe Room',
    price: '₹1,800',
    priceNum: 1800,
    desc: 'Spacious room with mountain-facing window, private balcony, and complimentary breakfast every morning.',
    features: ['Mountain View', 'Balcony', 'Wi-Fi', 'Breakfast Included'],
    highlight: true,
  },
  {
    id: 3,
    name: 'Family Suite',
    price: '₹2,800',
    priceNum: 2800,
    desc: 'A large suite ideal for families — two bedrooms, a kitchenette, and a cozy living area for bonding.',
    features: ['2 Bedrooms', 'Kitchenette', 'Living Area', 'All Meals'],
    highlight: false,
  },
];

export const mockStats: Stat[] = [
  { id: 1, number: '10+', label: 'Years of Hospitality' },
  { id: 2, number: '500+', label: 'Happy Guests' },
  { id: 3, number: '8', label: 'Cozy Rooms' },
  { id: 4, number: '4.9★', label: 'Average Rating' },
];

export const mockAmenities: Amenity[] = [
  {
    id: 1,
    icon: '🍽️',
    title: 'Home-Cooked Meals',
    desc: 'Fresh, local meals prepared with love every day.',
  },
  { id: 2, icon: '📶', title: 'Free Wi-Fi', desc: 'High-speed internet throughout the property.' },
  { id: 3, icon: '🚿', title: 'Hot Water', desc: '24/7 hot water supply in all rooms.' },
  {
    id: 4,
    icon: '🌿',
    title: 'Garden & Terrace',
    desc: 'Lush garden and terrace with panoramic views.',
  },
  { id: 5, icon: '🅿️', title: 'Free Parking', desc: 'Ample secured parking for guests.' },
  { id: 6, icon: '🧺', title: 'Laundry Service', desc: 'Same-day laundry available on request.' },
  {
    id: 7,
    icon: '🗺️',
    title: 'Local Tours',
    desc: 'Guided tours to nearby attractions arranged by us.',
  },
  { id: 8, icon: '☕', title: 'Evening Tea', desc: 'Complimentary evening tea & snacks daily.' },
];

export const mockGallery: GalleryPhoto[] = [
  { id: 1, bg: 'from-stone-400 to-stone-500', label: 'Living Area', tall: false },
  { id: 2, bg: 'from-amber-400 to-amber-600', label: 'Garden View', tall: true },
  { id: 3, bg: 'from-stone-500 to-stone-600', label: 'Deluxe Room', tall: false },
  { id: 4, bg: 'from-green-700 to-green-800', label: 'Mountain Trail', tall: false },
  { id: 5, bg: 'from-amber-700 to-amber-800', label: 'Home Kitchen', tall: false },
  { id: 6, bg: 'from-stone-300 to-stone-400', label: 'Terrace', tall: false },
];

export const mockReviews: Review[] = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Delhi',
    review:
      'The warmth of the hosts made us feel completely at home. The food was absolutely delicious. Will definitely visit again!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Rahul Mehta',
    location: 'Mumbai',
    review:
      'Perfect getaway from the city. The mountain view from our balcony was breathtaking. Highly recommend the Deluxe Room.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Anjali Verma',
    location: 'Bangalore',
    review:
      'Clean rooms, great food, and the host arranged a local trek for us. Amazing value for money!',
    rating: 5,
  },
];

export const mockContactInfo: ContactInfo = {
  phone: '+91 8542073022',
  whatsapp: '+91 8542073022',
  email: 'hello@gautamhomestay.com',
  address: 'Village and Post - Bhaithauli, Ayar Bazzar, Varanasi, Uttar Pradesh, India',
};
