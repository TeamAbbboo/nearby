import { axiosCommonInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';
import { IPostLoginRes } from '@/types/auth';

/* 로그인 */
export const doPostLoginReq = async (): Promise<APIResponse<IPostLoginRes>> => {
  const { data } = await axiosCommonInstance.post('/users/login');
  return data;
};
