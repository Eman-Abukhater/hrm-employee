"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema } from "@/lib/zodSchemas";
import { Employee } from "@/types/employee";
import { z } from "zod";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { roles, departments } from "@/lib/departments";
import { useState } from "react";

type FormData = z.infer<typeof employeeSchema>;

type Props = {
  defaultValues?: FormData;
  onSubmit: (data: FormData) => void;
  isEditing?: boolean;
};

export default function EmployeeForm({
  defaultValues,
  onSubmit,
  isEditing = false,
}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues,
  });

  const [preview, setPreview] = useState(defaultValues?.profilePhoto || "");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
      // We'll use the real upload in next step
      setValue("profilePhoto", "TEMP_URL_TO_BE_REPLACED");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography variant="h5" mb={2}>
        {isEditing ? "Edit" : "Add"} Employee
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Full Name"
            fullWidth
            {...register("fullName")}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Email"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Phone"
            fullWidth
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Department"
            fullWidth
            {...register("department")}
            error={!!errors.department}
            helperText={errors.department?.message}
          >
            {departments.map((dept) => (
              <MenuItem key={dept} value={dept}>
                {dept}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Role"
            fullWidth
            {...register("role")}
            error={!!errors.role}
            helperText={errors.role?.message}
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Join Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            {...register("joinDate")}
            error={!!errors.joinDate}
            helperText={errors.joinDate?.message}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Status"
            fullWidth
            {...register("status")}
            error={!!errors.status}
            helperText={errors.status?.message}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} md={6}>
          <Button variant="outlined" component="label" fullWidth>
            Upload Photo
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>
          {preview && (
            <Box mt={1}>
              <img src={preview} alt="Preview" width={100} height={100} />
            </Box>
          )}
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" fullWidth>
            {isEditing ? "Update" : "Create"} Employee
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
