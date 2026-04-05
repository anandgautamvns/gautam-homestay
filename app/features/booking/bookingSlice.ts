import { createSlice } from '@reduxjs/toolkit';

import type { BookingConfirmation } from '@/app/features/api/mockData';
import type { PayloadAction } from '@reduxjs/toolkit';

interface BookingState {
  /** The last successful booking confirmation — shown in the UI after submission. */
  lastConfirmation: BookingConfirmation | null;
}

const initialState: BookingState = {
  lastConfirmation: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setConfirmation(state, action: PayloadAction<BookingConfirmation>) {
      state.lastConfirmation = action.payload;
    },
    clearConfirmation(state) {
      state.lastConfirmation = null;
    },
  },
});

export const { setConfirmation, clearConfirmation } = bookingSlice.actions;
export default bookingSlice.reducer;
