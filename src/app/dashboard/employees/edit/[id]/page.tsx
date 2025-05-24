'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import EmployeeForm from '@/components/EmployeeForm';
import { useEmployeesStore } from '@/store/employees'; // Zustand store
import { Employee, FormData } from '@/types/employee';
import { toast } from 'react-toastify';

export default function EditEmployeePage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Extract employee ID from URL (nextjs app router dynamic route)
  // Assumes URL like: /dashboard/employees/edit/<id>
  const id = pathname.split('/').pop();

  const { employees, updateEmployee } = useEmployeesStore();

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // Find employee from store (mocked data)
    const found = employees.find((emp) => emp.id === id);
    if (!found) {
      toast.error('Employee not found');
      router.push('/dashboard/employees');
      return;
    }
    setEmployee(found);
    setLoading(false);
  }, [id, employees, router]);

  if (loading || !employee) return <p>Loading...</p>;

  // Form submit handler
  const onSubmit = (data: FormData) => {
    updateEmployee(id, data);
    toast.success('Employee updated successfully');
    router.push('/dashboard/employees');
  };

  return (
    <div>
      <h1>Edit Employee</h1>
      <EmployeeForm defaultValues={employee} onSubmit={onSubmit} />
    </div>
  );
}
