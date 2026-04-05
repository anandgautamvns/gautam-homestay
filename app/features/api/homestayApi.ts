import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  type Amenity,
  type BookingConfirmation,
  type BookingRequest,
  type ContactInfo,
  type GalleryPhoto,
  type HomestayInfo,
  mockAmenities,
  mockContactInfo,
  mockGallery,
  mockHomestayInfo,
  mockReviews,
  mockRooms,
  mockStats,
  type Review,
  type Room,
  type Stat,
} from './mockData';



// ─── API Error type ─────────────────────────────────────────────────────────

export interface ApiError {
  message: string;
  status?: number;
}

// ─── Simulated network delay ────────────────────────────────────────────────

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Wrap any mock data in a simulated async response (200–400 ms). */
async function mockResponse<T>(data: T): Promise<{ data: T }> {
  await delay(Math.random() * 200 + 200);
  return { data };
}

/** Return a simulated error response. */
async function mockError(message: string, status = 500): Promise<{ error: ApiError }> {
  await delay(300);
  return { error: { message, status } };
}

// ─── RTK Query API ──────────────────────────────────────────────────────────

export const homestayApi = createApi({
  reducerPath: 'homestayApi',
  // fakeBaseQuery — every endpoint uses its own `queryFn` instead of a real URL
  baseQuery: fakeBaseQuery<ApiError>(),
  tagTypes: ['HomestayInfo', 'Rooms', 'Stats', 'Amenities', 'Gallery', 'Reviews', 'ContactInfo'],
  endpoints: (builder) => ({
    // ── Read queries ──────────────────────────────────────────────────────

    /** Fetch general homestay information (name, tagline, heading, etc.). */
    getHomestayInfo: builder.query<HomestayInfo, void>({
      queryFn: () => mockResponse(mockHomestayInfo),
      providesTags: ['HomestayInfo'],
    }),

    /** Fetch all available room listings. */
    getRooms: builder.query<Room[], void>({
      queryFn: () => mockResponse(mockRooms),
      providesTags: ['Rooms'],
    }),

    /** Fetch key statistics (years, guests, rooms, rating). */
    getStats: builder.query<Stat[], void>({
      queryFn: () => mockResponse(mockStats),
      providesTags: ['Stats'],
    }),

    /** Fetch all amenities. */
    getAmenities: builder.query<Amenity[], void>({
      queryFn: () => mockResponse(mockAmenities),
      providesTags: ['Amenities'],
    }),

    /** Fetch gallery photo metadata. */
    getGallery: builder.query<GalleryPhoto[], void>({
      queryFn: () => mockResponse(mockGallery),
      providesTags: ['Gallery'],
    }),

    /** Fetch guest reviews / testimonials. */
    getReviews: builder.query<Review[], void>({
      queryFn: () => mockResponse(mockReviews),
      providesTags: ['Reviews'],
    }),

    /** Fetch contact information (phone, email, address). */
    getContactInfo: builder.query<ContactInfo, void>({
      queryFn: () => mockResponse(mockContactInfo),
      providesTags: ['ContactInfo'],
    }),

    // ── Write mutations ───────────────────────────────────────────────────

    /**
     * Submit a booking request.
     * Returns a confirmation ID on success, or a validation error if required
     * fields are missing.
     */
    submitBooking: builder.mutation<BookingConfirmation, BookingRequest>({
      queryFn: async (req) => {
        if (
          !req.firstName ||
          !req.lastName ||
          !req.email ||
          !req.checkIn ||
          !req.checkOut ||
          !req.roomType
        ) {
          return mockError('Please fill in all required fields before submitting.', 422);
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.email)) {
          return mockError('Please enter a valid email address.', 422);
        }
        if (req.checkOut <= req.checkIn) {
          return mockError('Check-out date must be after check-in date.', 422);
        }
        await delay(800); // simulate server processing time
        const confirmation: BookingConfirmation = {
          confirmationId: `GH-${Date.now().toString().slice(-6)}`,
          message:
            'Your booking request has been received! We will confirm availability and contact you within a few hours.',
          room: req.roomType,
          checkIn: req.checkIn,
          checkOut: req.checkOut,
        };
        return { data: confirmation };
      },
    }),
  }),
});

// ─── Export typed hooks ──────────────────────────────────────────────────────

export const {
  useGetHomestayInfoQuery,
  useGetRoomsQuery,
  useGetStatsQuery,
  useGetAmenitiesQuery,
  useGetGalleryQuery,
  useGetReviewsQuery,
  useGetContactInfoQuery,
  useSubmitBookingMutation,
} = homestayApi;
