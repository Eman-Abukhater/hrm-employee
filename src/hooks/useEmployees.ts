import { useQuery } from '@tanstack/react-query';
import { Employee } from '@/types/employee';
import { mockEmployees } from '@/lib/mockEmployees';

const LOCAL_STORAGE_KEY = 'mock-employees';

export const useEmployees = () => {
  return useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      // Simulate delay
      await new Promise(res => setTimeout(res, 500));
      return mockEmployees;
    }
  });
};
export const addEmployee = (employee: Employee) => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  const existing = stored ? JSON.parse(stored) : [];

  const updated = [...existing, { ...employee, id: crypto.randomUUID() }];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
};
