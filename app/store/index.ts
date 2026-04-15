import { configureStore } from '@reduxjs/toolkit';

import { authApi } from '@/app/features/api/authApi';
import { homestayApi } from '@/app/features/api/homestayApi';
import authReducer from '@/app/features/auth/authSlice';
import bookingReducer from '@/app/features/booking/bookingSlice';

export const store = configureStore({
  reducer: {
    [homestayApi.reducerPath]: homestayApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    booking: bookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(homestayApi.middleware).concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
