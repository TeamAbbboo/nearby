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

    // 재발급된 Access 토큰 저장
    localStorage.setItem('ACCESS_TOKEN', headers.authorization);

    // 다시 재요청
    const response = await axiosWithCredentialInstance(error.config!);

    return Promise.resolve(response);
  }

  return Promise.reject(error);
};

export default refresh;
