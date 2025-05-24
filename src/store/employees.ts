import { create } from 'zustand';
import { Employee, FormData } from '@/types/employee';
import { v4 as uuidv4 } from 'uuid';

type EmployeesState = {
  employees: Employee[];
  setEmployees: (emps: Employee[]) => void;
  addEmployee: (data: FormData) => void;
  updateEmployee: (id: string, data: FormData) => void;
  deleteEmployee: (id: string) => void;
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
        role: 'Developer',
        joinDate: '2023-01-01',
        status: 'active',
        profilePhoto: '',
    },
    {
      id: '2',
      fullName: 'Jane Smith',
      designation: 'HR Manager',  
      email: 'jane@example.com',
      phone: '0987654321',
      department: 'Human Resources',
      role: 'HR Manager',
      joinDate: '2022-05-15',
      status: 'inactive',
      profilePhoto: '',
    },
  ],
  setEmployees: (emps) => set({ employees: emps }),

  addEmployee: (data) => {
    const newEmployee: Employee = {
      id: uuidv4(),
      ...data,
    };
    set((state) => ({ employees: [...state.employees, newEmployee] }));
  },

  updateEmployee: (id, data) => {
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === id ? { ...emp, ...data } : emp
      ),
    }));
  },

  deleteEmployee: (id) => {
    set((state) => ({
      employees: state.employees.filter((emp) => emp.id !== id),
    }));
  },
}));
