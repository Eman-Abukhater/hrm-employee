'use client';

import { useParams } from 'next/navigation';
import { useEmployees } from '@/hooks/useEmployees';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import { useState } from 'react';

export default function EmployeeProfilePage() {
  const { id } = useParams();
  const { data: employees, isLoading } = useEmployees();
  const [tabIndex, setTabIndex] = useState(0);

  if (isLoading || !employees) {
    return <Typography p={4}>Loading employee profile...</Typography>;
  }

  const employee = employees.find(emp => emp.id === id);

  if (!employee) {
    return <Typography p={4}>Employee not found.</Typography>;
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>{employee.fullName} Profile</Typography>
      <Typography variant="subtitle1" color="textSecondary">{employee.designation} - {employee.department}</Typography>

      <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)} sx={{ mt: 3 }}>
        <Tab label="Personal Info" />
        <Tab label="Work Info" />
        <Tab label="Documents" />
        <Tab label="Leave Summary" />
      </Tabs>

      {tabIndex === 0 && (
        <Box mt={2}>
          <Typography>Email: {employee.email}</Typography>
          <Typography>Status: {employee.status}</Typography>
        </Box>
      )}

      {tabIndex === 1 && (
        <Box mt={2}>
          <Typography>Designation: {employee.designation}</Typography>
          <Typography>Department: {employee.department}</Typography>
        </Box>
      )}

      {tabIndex === 2 && (
        <Box mt={2}>
          <Typography>Documents: (Mock Placeholder)</Typography>
        </Box>
      )}

      {tabIndex === 3 && (
        <Box mt={2}>
          <Typography>Leave Summary: (Mock Placeholder)</Typography>
        </Box>
      )}
    </Box>
  );
}
