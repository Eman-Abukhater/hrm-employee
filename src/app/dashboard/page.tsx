'use client';

import { Typography } from '@mui/material';
import { useAuthStore } from '@/store/authStore';

export default function DashboardPage() {
  const role = useAuthStore((state) => state.role);

  if (!role) {
    return <Typography>Loading...</Typography>;
  }

  if (role === 'admin') {
    return <Typography variant="h4">Welcome, Admin! 👑</Typography>;
  }

  if (role === 'hr') {
    return <Typography variant="h4">Welcome, HR Manager! 📋</Typography>;
  }

  if (role === 'employee') {
    return <Typography variant="h4">Welcome, Employee! 👷‍♀️</Typography>;
  }

  return <Typography variant="h6">Access denied.</Typography>;
}
