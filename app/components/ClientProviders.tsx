'use client';
import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux';

import { AuthProvider } from '@/app/context/AuthContext';
import '@/app/i18n/config'; // initialise i18next before any component renders
import { store } from '@/app/store';

/**
 * Wraps the entire app in the Redux Provider (outermost) and the AuthProvider
 * (which reads/writes auth state via the Redux store).
 */
export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}
