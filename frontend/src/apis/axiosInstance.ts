import axios from 'axios';
import setAuthorization from './setAuthorization';

const axiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
};

export const axiosCommonInstance = axios.create(axiosRequestConfig);

axiosCommonInstance.interceptors.request.use(setAuthorization);
