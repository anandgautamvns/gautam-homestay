'use client';
import { Provider } from 'react-redux';

import { AuthProvider } from '@/app/context/AuthContext';
import { store } from '@/app/store';

/**
 * Wraps the entire app in the Redux Provider (outermost) and the AuthProvider
 * (which reads/writes auth state via the Redux store).
 */
export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
}
