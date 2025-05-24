// app/layout.tsx
'use client';

import { ReactNode } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

// Importing global styles
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' },
  },
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
          <ToastContainer />
        </ThemeProvider>
        </SessionProvider>
      </QueryClientProvider>
      </body>
    </html>
  );
}
