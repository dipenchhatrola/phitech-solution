import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
});

api.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem('adminToken');
  const clientToken = localStorage.getItem('clientToken');
  
  if (adminToken && window.location.pathname.startsWith('/admin')) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  } else if (clientToken && !window.location.pathname.startsWith('/admin')) {
    config.headers.Authorization = `Bearer ${clientToken}`;
  }
  return config;
});

export default api;
