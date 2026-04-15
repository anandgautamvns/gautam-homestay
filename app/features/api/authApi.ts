import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { clearUser, setUser } from '@/app/features/auth/authSlice';

import type { CustomerData, OwnerData, User, UserRole } from '@/lib/types';

interface LoginPayload {
  email: string;
  password: string;
  role: UserRole;
}

interface RegisterPayload {
  role: UserRole;
  data: CustomerData | OwnerData;
  password: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/auth',
    credentials: 'include', // send the httpOnly JWT cookie automatically
  }),
  endpoints: (builder) => ({
    /** Fetch the currently-authenticated user (used to hydrate state on load). */
    getMe: builder.query<User, void>({
      query: () => '/me',
    }),

    login: builder.mutation<User, LoginPayload>({
      query: (body) => ({ url: '/login', method: 'POST', body }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch {
          /* errors handled in AuthContext */
        }
      },
    }),

    register: builder.mutation<User, RegisterPayload>({
      // Flatten { role, data, password } → { role, password, ...data }
      query: ({ role, data, password }) => ({
        url: '/register',
        method: 'POST',
        body: { role, password, ...data },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch {
          /* errors handled in AuthContext */
        }
      },
    }),

    logout: builder.mutation<{ ok: boolean }, void>({
      query: () => ({ url: '/logout', method: 'POST' }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearUser());
        } catch {
          /* errors handled in AuthContext */
        }
      },
    }),

    updateProfile: builder.mutation<User, CustomerData | OwnerData>({
      query: (body) => ({ url: '/profile', method: 'PATCH', body }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch {
          /* errors handled in AuthContext */
        }
      },
    }),
  }),
});

export const {
  useGetMeQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
} = authApi;
