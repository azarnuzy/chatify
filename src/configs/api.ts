import axios from 'axios';

import { API_BASE_URL } from '@/lib/constant';

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL, // Replace with your actual API base URL
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to attach the token to Authorization header
api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage (or wherever you're storing it)
    const token = localStorage.getItem('token'); // Or use cookies/sessionStorage

    // If token exists, add it to Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle any error before request is sent
    return Promise.reject(error);
  }
);

// Optionally, you can add a response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // If the user is unauthorized, handle it here (e.g., redirect to login)
      localStorage.clear();
      console.error('Unauthorized, redirecting to login...');
      // Redirect or logout logic here
    }
    return Promise.reject(error);
  }
);

export default api;
