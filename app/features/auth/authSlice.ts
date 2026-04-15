import { createSlice } from '@reduxjs/toolkit';

import type { User } from '@/lib/types';
// eslint-disable-next-line no-duplicate-imports
import type { PayloadAction } from '@reduxjs/toolkit';

// Re-export from canonical location so existing import paths keep working
export type { CustomerData, OwnerData, User, UserRole } from '@/lib/types';

interface AuthState {
  user: User | null;
  isLoading: boolean; // true until /api/auth/me resolves on app startup
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    clearUser(state) {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
});

export const { setUser, clearUser, setLoading, setError, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
