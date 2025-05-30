"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema } from "@/lib/zodSchemas";
import { z } from "zod";
import Image from "next/image";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Designation, departments } from "@/lib/departments";
import { useState } from "react";
import { useUploadImage } from "@/hooks/useUploadImage"; //Import custom hook

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
  const { uploadImage, isUploading } = useUploadImage(); //  use hook

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local preview
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    // Upload to Cloudinary
    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      setValue("profilePhoto", imageUrl); // 👈 Set the real URL
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
            label="Designation"
            fullWidth
            {...register("designation")}
            error={!!errors.designation}
            helperText={errors.designation?.message}
          >
            {Designation.map((role) => (
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
          <Button
            variant="outlined"
            component="label"
            fullWidth
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload Photo"}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>
          {preview && (
            <Box mt={1}>
              <Image src={preview} alt="Preview" width={100} height={100} />
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
