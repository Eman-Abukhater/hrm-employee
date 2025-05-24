export type Employee = {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    department: string;
    role: string;
    joinDate: string;
    status: "active" | "inactive";
    profilePhoto?: string;
  };
  