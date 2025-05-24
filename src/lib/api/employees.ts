
export type Employee = {
  id: string;
  name: string;
  designation: string;
  department: string;
  status: 'active' | 'inactive';
};

// Simulated Employee DB (in-memory array)
const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    designation: 'Frontend Developer',
    department: 'Engineering',
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
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
export const createEmployee = async (data: Omit<Employee, 'id'>): Promise<Employee> => {
  await new Promise((res) => setTimeout(res, 500));

  const newEmployee: Employee = {
    id: Date.now().toString(),
    ...data,
  };

  mockEmployees.push(newEmployee);
  return newEmployee;
};
