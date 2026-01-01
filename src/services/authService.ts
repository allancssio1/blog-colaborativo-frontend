
import api from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export const login = async (email: string, password: string) => {
  const response = await api.post<LoginResponse>('/auth/login', { email, password });
  return response.data;
};

export const register = async (name: string, email: string, password: string) => {
  const response = await api.post('/auth/register', { name, email, password });
  return response.data;
};

export const getProfile = async () => {
    // Assuming there might be a profile endpoint, otherwise use the stored user data
    // But the requirements say "show logged user info". 
    // Usually we might want to validate the token or get fresh user data.
    // IF the backend doesn't have /auth/me, we rely on login response.
    // For now, implemented as a placeholder if needed.
    return null; 
}
