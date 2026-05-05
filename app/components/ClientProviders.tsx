'use client';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux';

import { AuthProvider } from '@/app/context/AuthContext';
import { store } from '@/app/store';

import '@/app/i18n/config'; // initialise i18next before any component renders

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}
