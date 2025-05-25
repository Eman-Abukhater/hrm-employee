"use client";

import { Typography, Box, Button, Stack } from "@mui/material";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
export default function DashboardPage() {
  const role = useAuthStore((state) => state.role);
  const userId = useAuthStore((state) => state.userId); // assuming you store it
  // Mock employee department data
  const departmentData = [
    { department: "Engineering", count: 12 },
    { department: "HR", count: 5 },
    { department: "Sales", count: 8 },
    { department: "Marketing", count: 6 },
  ];
  if (!role) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box p={4}>
      {role === "admin" && (
        <>
          <Typography variant="h4" gutterBottom>
            Welcome, Admin! 👑
          </Typography>
          <Stack spacing={2} mt={2}>
            <Link href="/dashboard/employees">
              <Button variant="contained">Employee List</Button>
            </Link>
            <Link href="/dasboard/employees/add">
              <Button variant="outlined">Add New Employee</Button>
            </Link>
          </Stack>
        </>
      )}

      {role === "hr" && (
        <>
          <Typography variant="h4" gutterBottom>
            Welcome, HR Manager! 📋
          </Typography>
          <Stack spacing={2} mt={2}>
            <Link href="/dashboard/employees">
              <Button variant="contained">Employee List</Button>
            </Link>
          </Stack>

          {/*  Chart Section */}
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Employees by Department
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </>
      )}

      {role === "employee" && (
        <>
          <Typography variant="h4" gutterBottom>
            Welcome, Employee! 👷‍♀️
          </Typography>
          <Stack spacing={2} mt={2}>
            <Link href={`/dashboard/employees/${userId}`}>
              <Button variant="contained">View My Profile</Button>
            </Link>
          </Stack>
        </>
      )}

      {!["admin", "hr", "employee"].includes(role) && (
        <Typography variant="h6" color="error">
          Access denied.
        </Typography>
      )}
    </Box>
  );
}
