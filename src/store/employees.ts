import { create } from 'zustand';
import { Employee } from '@/types/employee';
import { v4 as uuidv4 } from 'uuid';

type EmployeesState = {
  employees: Employee[];
  addEmployee: (data: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, data: Omit<Employee, 'id'>) => void;
  getEmployeeById: (id: string) => Employee | undefined;
};

export const useEmployeesStore = create<EmployeesState>((set, get) => ({
  employees: [
    {
      id: '1',
      fullName: 'John Doe',
      designation: 'Frontend Developer',
      email: 'john@example.com',
      phone: '1234567890',
      department: 'Engineering',
      role: 'Employee',
      joinDate: '2023-01-01',
      status: 'active',
      profilePhoto: '',
    },
    {
      id: '2',
      fullName: 'Jane Smith',
      designation: 'HR Manager',
      email: 'jane@example.com',
      phone: '9876543210',
      department: 'Human Resources',
      role: 'HR',
      joinDate: '2022-06-15',
      status: 'inactive',
      profilePhoto: '',
    },
  ],

  addEmployee: (data) =>
    set((state) => ({
      employees: [...state.employees, { ...data, id: uuidv4() }],
    })),

  updateEmployee: (id, updatedData) =>
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === id ? { ...emp, ...updatedData } : emp
      ),
    })),

  getEmployeeById: (id) => get().employees.find((emp) => emp.id === id),
}));
