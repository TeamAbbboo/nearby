import { axiosCommonInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';
import { IPostLoginRes, IPostSignupReq, IPostEnrollFamilyReq } from '@/types/auth';

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

/* 가족 참여 */
export const doPostEnrollFamilyReq = async ({
  userId,
  familyCode,
}: IPostEnrollFamilyReq): Promise<APIResponse<void>> => {
  const { data } = await axiosCommonInstance.post('/users/family/enroll', {
    userId: userId,
    familyCode: familyCode,
  });
  return data;
};
