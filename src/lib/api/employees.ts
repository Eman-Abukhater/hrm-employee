
export type Employee = {
  id: string;
  fullName: string; 
  designation: string;
  department: string;
  status: 'active' | 'inactive';
};


// Simulated Employee DB (in-memory array)
const mockEmployees: Employee[] = [
  {
    id: '1',
    fullName: 'John Doe', 
    designation: 'Frontend Developer',
    department: 'Engineering',
    status: 'active',
  },
  {
    id: '2',
    fullName: 'Jane Smith', 
    designation: 'HR Manager',
    department: 'Human Resources',
    status: 'inactive',
  },
];


// GET employees
export const fetchEmployees = async (): Promise<Employee[]> => {
  await new Promise((res) => setTimeout(res, 500));
  return mockEmployees;
};

// POST employee (mocked)
const LOCAL_STORAGE_KEY = 'mock-employees';

export const createEmployee = async (data: Omit<Employee, 'id'>): Promise<Employee> => {
  await new Promise((res) => setTimeout(res, 500));

  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  const existing = stored ? JSON.parse(stored) : [];

  const newEmployee: Employee = {
    id: crypto.randomUUID(),
    ...data,
  };

  const updated = [...existing, newEmployee];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));

  return newEmployee;
};

