'use client';

import { Typography, Box, Button, Stack } from '@mui/material';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

export default function DashboardPage() {
  const role = useAuthStore((state) => state.role);
  const userId = useAuthStore((state) => state.userId); // assuming you store it

  if (!role) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box p={4}>
      {role === 'admin' && (
        <>
          <Typography variant="h4" gutterBottom>Welcome, Admin! 👑</Typography>
          <Stack spacing={2} mt={2}>
            <Link href="/employees">
              <Button variant="contained">Employee List</Button>
            </Link>
            <Link href="/employees/add">
              <Button variant="outlined">Add New Employee</Button>
            </Link>
          </Stack>
        </>
      )}

      {role === 'hr' && (
        <>
          <Typography variant="h4" gutterBottom>Welcome, HR Manager! 📋</Typography>
          <Stack spacing={2} mt={2}>
            <Link href="/employees">
              <Button variant="contained">Employee List</Button>
            </Link>
          </Stack>
        </>
      )}

      {role === 'employee' && (
        <>
          <Typography variant="h4" gutterBottom>Welcome, Employee! 👷‍♀️</Typography>
          <Stack spacing={2} mt={2}>
            <Link href={`/employees/${userId}`}>
              <Button variant="contained">View My Profile</Button>
            </Link>
          </Stack>
        </>
      )}

      {!['admin', 'hr', 'employee'].includes(role) && (
        <Typography variant="h6" color="error">Access denied.</Typography>
      )}
    </Box>
  );
}
