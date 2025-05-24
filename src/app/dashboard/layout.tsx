// app/dashboard/layout.tsx
'use client';

import { Box, Typography, AppBar, Toolbar, Button } from '@mui/material';
import { signOut } from 'next-auth/react';
import { useAuthStore } from '@/store/authStore';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const role = useAuthStore((state) => state.role);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            HRM Dashboard
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Role: {role || '...'}
          </Typography>
          <Button color="inherit" onClick={() => signOut({ callbackUrl: '/login' })}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box p={3}>{children}</Box>
    </>
  );
}
