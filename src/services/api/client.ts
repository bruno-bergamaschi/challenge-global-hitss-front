import { env } from '@/helpers/env';
import axios, { AxiosError } from 'axios';

export const api = axios.create({
  baseURL: env.API_URL,
  responseType: 'json',
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const apiError = error.response?.data as any;

    return Promise.reject(
      apiError ?? {
        message: 'Erro inesperado',
        code: 'unknown-error',
      },
    );
  },
);
