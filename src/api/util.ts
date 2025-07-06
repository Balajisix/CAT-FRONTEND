// api/util.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});

// auth
export const register = async (data: { username: string; email: string; password: string }) => api.post('/auth/register', data);
export const login = async (data: { email: string; password: string }) => api.post('/auth/login', data);

// admin side
export const imageUpload = async (formData: FormData) => api.post('/admin/upload-image', formData);
export const submitData = async (data: any) => api.post('/admin/vehicle-entry', data);