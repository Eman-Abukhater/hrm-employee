import { z } from "zod";

export const employeeSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email"),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .max(15, "Phone must be under 15 digits"),
  department: z.string().min(1, "Department is required"),
  role: z.string().min(1, "Role is required"),
  joinDate: z.string().min(1, "Join Date is required"),
  status: z.enum(["active", "inactive"]),
  profilePhoto: z.string().url().optional(), // Will store Cloudinary URL
});
