import { create } from 'zustand';

interface AuthState {
  role: 'admin' | 'hr' | 'employee' | null;
  setRole: (role: AuthState['role']) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  role: null,
  setRole: (role) => set({ role })
}));
