import axios, {AxiosInstance, AxiosRequestConfig, AxiosError} from 'axios';
import {getToken} from './token';


const BACKEND_URL = 'http://localhost:4000/api';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {

  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{error: string}>) => {
      throw error;
    }
  );
  return api;
};
