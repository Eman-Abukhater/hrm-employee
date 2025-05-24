import { create } from 'zustand';

type FilterState = {
  search: string;
  department: string;
  setSearch: (val: string) => void;
  setDepartment: (val: string) => void;
};

export const useEmployeeFilterStore = create<FilterState>((set) => ({
  search: '',
  department: '',
  setSearch: (val) => set({ search: val }),
  setDepartment: (val) => set({ department: val }),
}));
