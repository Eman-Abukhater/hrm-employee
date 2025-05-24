'use client';

import {
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
  CircularProgress,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEmployees } from '@/hooks/useEmployees';
import { useEmployeeFilterStore } from '@/store/employeeFilterStore';

export default function EmployeeListPage() {
  const { data, isLoading } = useEmployees();
  const { search, department, setSearch, setDepartment } = useEmployeeFilterStore();

  const filteredData = data?.filter((emp) => {
    const matchesSearch =
  emp.fullName.toLowerCase().includes(search.toLowerCase()) ||
  emp.designation.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment = department ? emp.department === department : true;
    return matchesSearch && matchesDepartment;
  });

  const columns = [
    { field: 'fullName', headerName: 'Name', flex: 1 },
    { field: 'designation', headerName: 'Designation', flex: 1 },
    { field: 'department', headerName: 'Department', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params: any) => (
        <Chip
          label={params.value}
          color={params.value === 'active' ? 'success' : 'default'}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: () => <Chip label="Edit" color="primary" />,
    },
  ];
  
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Employees
      </Typography>

      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Search by name/designation"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FormControl>
          <InputLabel>Department</InputLabel>
          <Select
            value={department}
            label="Department"
            onChange={(e) => setDepartment(e.target.value)}
            sx={{ width: 200 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Engineering">Engineering</MenuItem>
            <MenuItem value="Human Resources">Human Resources</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <DataGrid
          autoHeight
          rows={filteredData || []}
          columns={columns}
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5, page: 0 } },
          }}
          getRowId={(row) => row.id}
        />
      )}
    </Box>
  );
}