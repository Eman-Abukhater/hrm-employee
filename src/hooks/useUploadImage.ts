'use client';

import { useState } from 'react';

export const useUploadImage = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'employee_upload'); 
    formData.append('folder', 'employees')
    setIsUploading(true);
    setError(null);

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dbjueuler/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.secure_url) {
        return data.secure_url;
      } else {
        setError('Upload failed');
        return null;
      }
    } catch (err) {
      setError('Upload failed');
      console.error('Upload error:', err);
      return null;
    } finally {
        setIsUploading(false);
    }
  };

  return { uploadImage, isUploading, error };
};
