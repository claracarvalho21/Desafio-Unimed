import axios from 'axios';
import { API_URL } from '../config/env';

console.log('API_URL:', API_URL);

export const api = axios.create({
  baseURL: API_URL,
});