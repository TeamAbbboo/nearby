/* components */
import { axiosWithCredentialInstance } from './axiosInstance';

/* libraries */
import { AxiosError } from 'axios';

const refresh = async (error: AxiosError) => {
  // refresh 토큰이 만료되었을 경우 -> 로그아웃 처리
  if (error.response?.status === 401) {
    localStorage.removeItem('ACCESS_TOKEN');
    window.location.replace('/login');
    alert('로그아웃!!');
  }

  // access 토큰이 만료되었을 경우 -> 재발급 요청
  else if (error.response?.status === 403) {
    const { headers } = await axiosWithCredentialInstance.patch('/users/reissue');
    localStorage.setItem('ACCESS_TOKEN', headers.authorization.split('Bearer ')[1]);
  }

  return Promise.reject(error);
};

export default refresh;
