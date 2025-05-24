export type Employee = {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  designation: string; 
  department: string;
  role: string;
  joinDate: string;
  status: 'active' | 'inactive';
  profilePhoto?: string;
};
export type FormData = Omit<Employee, 'id'>;

