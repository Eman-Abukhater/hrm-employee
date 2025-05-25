'use client';

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Avatar
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';

type FormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<FormValues>();
  const [error, setError] = useState('');
  const setRole = useAuthStore((state) => state.setRole);
  const setUserId = useAuthStore((state) => state.setUserId);

  const onSubmit = async (data: FormValues) => {
    setError('');
    const res = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password
    });

    if (res?.ok) {
      // Get session to access role
      const sessionRes = await fetch('/api/auth/session');
      const session = await sessionRes.json();
      const userRole = session?.user?.role;
      setRole(userRole); // Save to Zustand
      const userId = session?.user?.id;
      setRole(userRole);
      setUserId(userId);

      router.push('/dashboard'); // Redirect after login
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ mt: 8, p: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              autoComplete="email"
              autoFocus
              {...register('email')}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              {...register('password')}
            />

            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
