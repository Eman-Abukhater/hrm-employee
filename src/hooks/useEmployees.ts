import { useQuery } from '@tanstack/react-query';
import { fetchEmployees } from '@/lib/api/employees';

export const useEmployees = () => {
  return useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
  });
};
