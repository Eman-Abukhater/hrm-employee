export type Employee = {
  id?: string;
  fullName: string;
  email: string;
  phone?: string; //  optional
  designation: string;
  department: string;
  role: string;
  joinDate?: string; //  optional
  status: 'active' | 'inactive';
  profilePhoto?: string;
};

export type FormData = Omit<Employee, 'id'>;

