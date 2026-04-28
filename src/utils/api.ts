import axios from 'axios';

const backendBase = process.env.REACT_APP_BACKEND_URL;
const normalizedBase = backendBase
  ? backendBase.endsWith("/") ? backendBase : `${backendBase}/`
  : "";

const api = axios.create({
  baseURL: `${normalizedBase}api`,
});
console.log("process.env.REACT_APP_BACKEND_URL", process.env.REACT_APP_BACKEND_URL);
api.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem('adminToken');
  const clientToken = localStorage.getItem('clientToken');

  // If we are on an admin route, prioritize the admin token
  if (window.location.pathname.startsWith('/admin')) {
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
  } else {
    // For all other routes (including dashboard), use the client token if available
    if (clientToken) {
      config.headers.Authorization = `Bearer ${clientToken}`;
    }
  }
  return config;
});

export default api;
