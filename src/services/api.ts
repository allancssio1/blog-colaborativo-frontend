import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear local storage and let the AuthContext handle the redirect if needed
      // We avoid window.location.href here to allow React Router to handle it if possible,
      // but standard practice often forces a reload or event dispatch.
      // For now, we'll just clear the token. The UI should react to failed requests.
      if (localStorage.getItem('token')) {
          localStorage.removeItem('token');
          window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
