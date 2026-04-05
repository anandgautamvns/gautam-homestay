import { configureStore } from '@reduxjs/toolkit';

import { homestayApi } from '@/app/features/api/homestayApi';
import authReducer from '@/app/features/auth/authSlice';
import bookingReducer from '@/app/features/booking/bookingSlice';

export const store = configureStore({
  reducer: {
    // RTK Query cache for all homestay data
    [homestayApi.reducerPath]: homestayApi.reducer,
    // Auth state (user session, loading, error)
    auth: authReducer,
    // Booking confirmation state
    booking: bookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    // RTK Query middleware handles cache, invalidation, and polling
    getDefaultMiddleware().concat(homestayApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
