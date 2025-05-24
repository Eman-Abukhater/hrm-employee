export type Employee = {
    id: string;
    name: string;
    designation: string;
    department: string;
    status: 'active' | 'inactive';
  };
  
  export const fetchEmployees = async (): Promise<Employee[]> => {
    await new Promise((res) => setTimeout(res, 500));
    return [
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
  };
  