import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});

export const register = async (data: { username: string; email: string; password: string }) => api.post('/auth/register', data);
export const login = async (data: { email: string; password: string }) => api.post('/auth/login', data);