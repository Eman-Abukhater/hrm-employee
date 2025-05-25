'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, Typography, Tabs, Tab, Paper } from '@mui/material';
import { useEmployees } from '@/hooks/useEmployees';
import type { Employee } from '@/types/employee';

export default function EmployeeProfilePage() {
  const params = useParams();
  const employeeId = params?.id as string;

  const { data: employees, isLoading } = useEmployees();
  const [tabIndex, setTabIndex] = useState(0);
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    if (employees) {
      const found = employees.find(emp => emp.id === employeeId);
      setEmployee(found || null);
    }
  }, [employees, employeeId]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  if (isLoading || !employee) {
    return <Typography p={4}>Loading employee profile...</Typography>;
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        {employee.fullName}'s Profile
      </Typography>

      <Paper elevation={3} sx={{ mt: 3 }}>
        <Tabs value={tabIndex} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
          <Tab label="Personal Info" />
          <Tab label="Work Info" />
          <Tab label="Documents" />
          <Tab label="Leave Summary" />
        </Tabs>

        <Box p={3}>
          {tabIndex === 0 && (
            <>
              <Typography variant="h6">Full Name:</Typography>
              <Typography>{employee.fullName}</Typography>
              <Typography variant="h6">Status:</Typography>
              <Typography>{employee.status}</Typography>
            </>
          )}

          {tabIndex === 1 && (
            <>
              <Typography variant="h6">Designation:</Typography>
              <Typography>{employee.designation}</Typography>
              <Typography variant="h6">Department:</Typography>
              <Typography>{employee.department}</Typography>
            </>
          )}

          {tabIndex === 2 && <Typography>No documents uploaded yet.</Typography>}

          {tabIndex === 3 && <Typography>No leave records available yet.</Typography>}
        </Box>
      </Paper>
    </Box>
  );
}
