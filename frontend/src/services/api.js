import axios from 'axios';

// Axios instance with base configuration
const api = axios.create({
  baseURL: '/api', // Proxied via Vite dev server proxy to http://127.0.0.1:8000/api
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
