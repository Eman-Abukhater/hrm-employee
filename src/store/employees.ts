import { create } from 'zustand';
import { Employee } from '@/types/employee';
import { v4 as uuidv4 } from 'uuid';

type EmployeesState = {
  employees: Employee[];
  addEmployee: (data: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, data: Omit<Employee, 'id'>) => void;
  getEmployeeById: (id: string) => Employee | undefined;
};

const LOCAL_KEY = 'employee_data';

const loadInitialEmployees = (): Employee[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(LOCAL_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const useEmployeesStore = create<EmployeesState>((set, get) => ({
  employees: loadInitialEmployees(),

  addEmployee: (data) => {
    const newEmployee = { ...data, id: uuidv4() };
    console.log("ADDING EMPLOYEE:", newEmployee); // ✅ Add this
    const updated = [...get().employees, newEmployee];
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
    set({ employees: updated });
  },
  

  updateEmployee: (id, updatedData) => {
    const updated = get().employees.map((emp) =>
      emp.id === id ? { ...emp, ...updatedData } : emp
    );
    localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
    set({ employees: updated });
  },

  getEmployeeById: (id) => get().employees.find((emp) => emp.id === id),
}));
