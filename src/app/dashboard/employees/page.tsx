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
  IconButton,
  Tooltip,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import { useEmployees } from '@/hooks/useEmployees';
import { useEmployeeFilterStore } from '@/store/employeeFilterStore';
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEmployee } from '@/lib/api/employees';
import { toast } from 'react-toastify';
export default function EmployeeListPage() {
  const { data, isLoading } = useEmployees();
  const { search, department, setSearch, setDepartment } = useEmployeeFilterStore();
  const role = useAuthStore((state) => state.role);
  const router = useRouter();
  const queryClient = useQueryClient();

const deleteMutation = useMutation({
  mutationFn: deleteEmployee,
  onSuccess: () => {
    toast.success('Employee deleted');
    queryClient.invalidateQueries({ queryKey: ['employees'] });
  },
  onError: () => {
    toast.error('Failed to delete employee');
  },
});
const handleDelete = (employee: any) => {
  if (confirm(`Are you sure you want to delete ${employee.fullName}?`)) {
    deleteMutation.mutate(employee.id);
  }
};

  useEffect(() => {
    if (role !== 'admin' && role !== 'hr') {
      router.push('/login');
    }
  }, [role, router])

  if (role !== 'admin' && role !== 'hr') {
    router.push('/login'); 
  }
  
  // === Handler functions ===
  const handleView = (employee: any) => {
    console.log('View', employee);
    // You can navigate to a detail page here
  };

  const handleEdit = (employee: any) => {
    console.log('Edit', employee);
    // Open a modal or navigate to an edit form
  };


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
      sortable: false,
      renderCell: (params: any) => (
        <Box display="flex" gap={1}>
          {/* View Button - Everyone */}
          <Tooltip title="View">
            <IconButton color="primary" onClick={() => handleView(params.row)}>
              <Visibility />
            </IconButton>
          </Tooltip>

          {/* Edit Button - Admin and HR */}
          {(role === 'admin' || role === 'hr') && (
            <Tooltip title="Edit">
              <IconButton color="info" onClick={() => handleEdit(params.row)}>
                <Edit />
              </IconButton>
            </Tooltip>
          )}

          {/* Delete Button - Admin only */}
          {role === 'admin' && (
            <Tooltip title="Delete">
              <IconButton color="error" onClick={() => handleDelete(params.row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      ),
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
