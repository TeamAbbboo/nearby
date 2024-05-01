import { axiosCommonInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';
import { IPostLoginRes, IPostSignupReq } from '@/types/auth';

/* 로그인 */
export const doPostLoginReq = async (): Promise<APIResponse<IPostLoginRes>> => {
  const { data } = await axiosCommonInstance.post('/users/login');
  return data;
};

/* 회원 가입 */
export const doPostSignupReq = async ({ nickname, birthday }: IPostSignupReq): Promise<APIResponse<void>> => {
  const { data } = await axiosCommonInstance.post('/users/signup', {
    nickname: nickname,
    birthday: birthday,
  });
  return data;
};
