import { env } from '@/helpers/env';
import axios from 'axios';

export const api = axios.create({
  baseURL: env.API_URL,
});
