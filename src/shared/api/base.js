import axios from 'axios';
import { clearSession } from './session/clearSession';
import { ApiError } from './apiError';
import { getToken } from '@/entities/token';
import { checkShouldClearSession } from './session/checkShouldClearSession';

export const api = axios.create({
  baseURL: 'https://goit-nodejs-final-project.onrender.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (checkShouldClearSession(error.response)) {
      console.error('Session expired');
      clearSession();
    }

    const { status = 500, data } = error.response || {};
    const message = data?.message || data?.error || 'Server error';

    return Promise.reject(new ApiError(status, message));
  }
);
