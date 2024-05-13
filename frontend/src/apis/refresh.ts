/* components */
import { axiosWithCredentialInstance } from './axiosInstance';
import Toast from '@/components/@common/Toast/Toast';

/* libraries */
import { AxiosError } from 'axios';

const refresh = async (error: AxiosError) => {
  // refresh 토큰이 만료되었을 경우 -> 로그아웃 처리
  if (error.response?.status === 401) {
    localStorage.removeItem('ACCESS_TOKEN');
    window.location.replace('/login');
    Toast.success('로그아웃');
  }

  // access 토큰이 만료되었을 경우 -> 재발급 요청
  else if (error.response?.status === 403) {
    const { headers } = await axiosWithCredentialInstance.post('/users/reissue');
    localStorage.setItem('ACCESS_TOKEN', headers.authorization);
    return Promise.resolve();
  }

  return Promise.reject(error);
};

export default refresh;
