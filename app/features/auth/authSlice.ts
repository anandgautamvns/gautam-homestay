import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

// ─── Types (exported so other modules can import) ──────────────────────────

export type UserRole = 'customer' | 'owner';

export interface CustomerData {
  name: string;
  email: string;
  phone: string;
  dob?: string;
  address?: string;
}

export interface OwnerData {
  name: string;
  email: string;
  phone: string;
  propertyName: string;
  propertyAddress: string;
  rooms: number;
  gst?: string;
}

export interface User {
  id: string;
  role: UserRole;
  data: CustomerData | OwnerData;
}

interface StoredUser extends User {
  password: string;
}

// ─── State ─────────────────────────────────────────────────────────────────

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: true, // true until localStorage is hydrated
  error: null,
};

// ─── Helpers ───────────────────────────────────────────────────────────────

const getStoredUsers = (): StoredUser[] => {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem('gh_users');
  return raw ? (JSON.parse(raw) as StoredUser[]) : [];
};

const saveStoredUsers = (users: StoredUser[]) => {
  localStorage.setItem('gh_users', JSON.stringify(users));
};

// ─── Async Thunks ──────────────────────────────────────────────────────────

/** Hydrate user session from localStorage on app startup. */
export const hydrateAuth = createAsyncThunk('auth/hydrate', async () => {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('gh_session');
  return raw ? (JSON.parse(raw) as User) : null;
});

/** Authenticate an existing user. */
export const loginUser = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string; role: UserRole }, { rejectWithValue }) => {
    const users = getStoredUsers();
    const match = users.find(
      (u) =>
        u.data.email === payload.email &&
        u.role === payload.role &&
        u.password === payload.password,
    );
    if (!match) return rejectWithValue('Invalid email, password, or account type.');
    const session: User = { id: match.id, role: match.role, data: match.data };
    localStorage.setItem('gh_session', JSON.stringify(session));
    return session;
  },
);

/** Register a new user account. */
export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    payload: { role: UserRole; data: CustomerData | OwnerData; password: string },
    { rejectWithValue },
  ) => {
    const users = getStoredUsers();
    const exists = users.find(
      (u) => u.data.email === payload.data.email && u.role === payload.role,
    );
    if (exists) return rejectWithValue('An account with this email already exists for this role.');

    const newUser: StoredUser = {
      id: `${Date.now()}`,
      role: payload.role,
      data: payload.data,
      password: payload.password,
    };
    saveStoredUsers([...users, newUser]);
    const session: User = { id: newUser.id, role: newUser.role, data: newUser.data };
    localStorage.setItem('gh_session', JSON.stringify(session));
    return session;
  },
);

// ─── Slice ─────────────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = null;
      state.error = null;
      if (typeof window !== 'undefined') localStorage.removeItem('gh_session');
    },
    updateProfile(state, action: PayloadAction<CustomerData | OwnerData>) {
      if (!state.user) return;
      const updatedUser: User = { ...state.user, data: action.payload };
      state.user = updatedUser;
      const users = getStoredUsers();
      saveStoredUsers(
        users.map((u) => (u.id === updatedUser.id ? { ...u, data: action.payload } : u)),
      );
      localStorage.setItem('gh_session', JSON.stringify(updatedUser));
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // hydrateAuth
      .addCase(hydrateAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(hydrateAuth.rejected, (state) => {
        state.isLoading = false;
      })
      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logoutUser, updateProfile, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
