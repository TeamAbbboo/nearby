/* libraries */
import axios from 'axios';

/* components */
import setAuthorization from '@/apis/setAuthorization';
import refresh from '@/apis/refresh';

const axiosRequestConfig = {
  baseURL: import.meta.env.VITE_NODE_ENV === 'development' ? '' : import.meta.env.VITE_BASE_URL,
};

const axiosWithCredentialConfig = {
  baseURL: import.meta.env.VITE_NODE_ENV === 'development' ? '' : import.meta.env.VITE_BASE_URL,
  withCredentials: true,
};

/* refresh 토큰 담지 않은 요청 */
export const axiosCommonInstance = axios.create(axiosRequestConfig);

/* Access 재발급 요청 */
export const axiosWithCredentialInstance = axios.create(axiosWithCredentialConfig);

/* 인터셉터 실행 */
/** 모든 axios 요청 전에 토큰 정보를 헤더에 추가 */
axiosCommonInstance.interceptors.request.use(setAuthorization);
axiosWithCredentialInstance.interceptors.request.use(setAuthorization);

/* 토큰 만료시 재발급 요청 실행 */
axiosWithCredentialInstance.interceptors.response.use(null, refresh);
