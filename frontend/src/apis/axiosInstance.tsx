import axios from 'axios';

const axiosRequestConfig = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const axiosCommonInstance = axios.create(axiosRequestConfig);
