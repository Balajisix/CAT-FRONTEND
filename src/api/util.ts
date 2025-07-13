import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});

// auth
export const register = async (data: { username: string; email: string; password: string }) => api.post('/auth/register', data);
export const login = async (data: { email: string; password: string }) => api.post('/auth/login', data);

// Vehicle registration endpoints
export const registerVehiclePreview = async (formData: FormData) => api.post('/admin/register-vehicle/preview', formData);
export const registerVehicle = async (data: any) => api.post('/admin/register-vehicle', data);

// Vehicle check endpoints
export const checkVehicle = async (formData: FormData) => api.post('/admin/check-vehicle', formData);

// Dashboard and statistics endpoints
export const getAuthorizedVehicles = async () => api.get('/admin/authorized-vehicles');
export const getVehicleStatistics = async () => api.get('/admin/vehicle-stats');
export const getRecentMovements = async () => api.get('/admin/recent-movements');
export const getVehicleMovements = async (period: string) => api.get(`/admin/vehicle-movements/${period}`);