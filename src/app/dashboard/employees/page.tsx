"use client";

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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import { useEmployees } from "@/hooks/useEmployees";
import { useEmployeeFilterStore } from "@/store/employeeFilterStore";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEmployee } from "@/lib/api/employees";
import { toast } from "react-toastify";
import { updateEmployee } from "@/lib/api/employees";
import { Employee } from "@/types/employee";

export default function EmployeeListPage() {
  const { data, isLoading } = useEmployees();
  const { search, department, setSearch, setDepartment } =
    useEmployeeFilterStore();
  const role = useAuthStore((state) => state.role);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const updateMutation = useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      toast.success("Employee updated successfully");
      setEditOpen(false);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: () => {
      toast.error("Failed to update employee");
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      toast.success("Employee deleted");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: () => {
      toast.error("Failed to delete employee");

    },
  });
  const handleDelete = (employee: Employee) => {
    deleteMutation.mutate(employee.id!);
  };

  useEffect(() => {
    if (role !== "admin" && role !== "hr") {
      router.push("/login");
    }
  }, [role, router]);

  if (role !== "admin" && role !== "hr") {
    router.push("/login");
  }

  const handleView = (employee: Employee) => {
    setSelectedEmployee(employee);
    setViewOpen(true);
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setEditOpen(true);
  };

  const filteredData = data?.filter((emp) => {
    const matchesSearch =
      emp.fullName.toLowerCase().includes(search.toLowerCase()) ||
      emp.designation.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment = department ? emp.department === department : true;
    return matchesSearch && matchesDepartment;
  });
  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedEmployee(null);
  };
  
  const handleViewClose = () => {
    setViewOpen(false);
    setSelectedEmployee(null);
  };
  

  const columns = [
    { field: "fullName", headerName: "Name", flex: 1 },
    { field: "designation", headerName: "Designation", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params: GridRenderCellParams<Employee>) => (
        <Chip
          label={params.value}
          color={params.value === "active" ? "success" : "default"}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params: GridRenderCellParams<Employee>) => (
        <Box display="flex" gap={1}>
          {/* View Button - Everyone */}
          <Tooltip title="View">
            <IconButton color="primary" onClick={() => handleView(params.row)}>
              <Visibility />
            </IconButton>
          </Tooltip>

          {/* Edit Button - Admin and HR */}
          {(role === "admin" || role === "hr") && (
            <Tooltip title="Edit">
              <IconButton color="info" onClick={() => handleEdit(params.row)}>
                <Edit />
              </IconButton>
            </Tooltip>
          )}

          {/* Delete Button - Admin only */}
          {role === "admin" && (
            <Tooltip title="Delete">
              <IconButton
                color="error"
                onClick={() => handleDelete(params.row)}
              >
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
      {/* View Dialog */}
      <Dialog
        open={viewOpen}
        onClose={handleViewClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>View Employee</DialogTitle>
        <DialogContent dividers>
          {selectedEmployee && (
            <Box>
              <Typography>
                <strong>Name:</strong> {selectedEmployee.fullName}
              </Typography>
              <Typography>
                <strong>Designation:</strong> {selectedEmployee.designation}
              </Typography>
              <Typography>
                <strong>Department:</strong> {selectedEmployee.department}
              </Typography>
              <Typography>
                <strong>Status:</strong> {selectedEmployee.status}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editOpen}
        onClose={handleEditClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent dividers>
          {selectedEmployee && (
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Full Name"
                value={selectedEmployee.fullName}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    fullName: e.target.value,
                  })
                }
              />
              <TextField
                label="Designation"
                value={selectedEmployee.designation}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    designation: e.target.value,
                  })
                }
              />
              <TextField
                label="Department"
                value={selectedEmployee.department}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    department: e.target.value,
                  })
                }
              />

              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={selectedEmployee.status}
                  label="Status"
                  onChange={(e) =>
                    setSelectedEmployee({
                      ...selectedEmployee,
                      status: e.target.value,
                    })
                  }
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (selectedEmployee) {
                updateMutation.mutate(selectedEmployee);
              }
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
