'use client';

import { useRouter } from 'next/navigation';
import EmployeeForm from '@/components/EmployeeForm';
import { useMutation } from '@tanstack/react-query';
import { createEmployee } from '@/lib/api/employees';
import { FormData } from '@/types/employee';
import { toast } from 'react-toastify';

export default function AddEmployeePage() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: FormData) => createEmployee(data),
    onSuccess: () => {
      toast.success('Employee created successfully!');
      router.push('/dashboard/employees');
    },
    onError: () => {
      toast.error('Something went wrong. Please try again.');
    },
  });

  return (
    <div>
      <EmployeeForm onSubmit={mutation.mutate} />
    </div>
  );
}
