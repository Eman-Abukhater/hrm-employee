// src/store/authStore.ts
import { create } from 'zustand';

interface AuthState {
  role: 'admin' | 'hr' | 'employee' | null;
  userId: string | null;
  setRole: (role: AuthState['role']) => void;
  setUserId: (id: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  role: null,
  userId: null,
  setRole: (role) => set({ role }),
  setUserId: (id) => set({ userId: id }),
}));
