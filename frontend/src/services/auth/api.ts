import { axiosCommonInstance, axiosWithCredentialInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';
import { IPostLoginRes, IUserInfoReq } from '@/types/auth';

/* 로그인 */
export const doPostLoginReq = async (): Promise<APIResponse<IPostLoginRes>> => {
  const { data } = await axiosCommonInstance.post('/users/login');
  return data;
};

/* 회원 가입 */
export const doPostSignupReq = async ({ nickname, birthday }: IUserInfoReq): Promise<APIResponse<void>> => {
  const { data } = await axiosWithCredentialInstance.post('/users/signup', {
    nickname: nickname,
    birthday: birthday,
  });
  return data;
};

/* 가족 참여 */
export const doPatchEnrollFamilyReq = async (familyCode: string): Promise<APIResponse<void>> => {
  const { data } = await axiosWithCredentialInstance.patch('/users/family/enroll', {
    familyCode: familyCode,
  });
  return data;
};

/* 유저 정보 조회 */
export const doGetUserInfoReq = async (): Promise<APIResponse<IUserInfoReq>> => {
  const { data } = await axiosWithCredentialInstance.get('/users');
  return data;
};

/* 유저 정보 수정 */
export const doPatchModifyReq = async (nickname: string): Promise<APIResponse<void>> => {
  const { data } = await axiosWithCredentialInstance.patch('/users', {
    nickname: nickname,
  });
  return data;
};

/* 로그아웃 */
export const doPostLogoutReq = async (): Promise<APIResponse<void>> => {
  const { data } = await axiosWithCredentialInstance.post('/users/logout');
  return data;
};

/* 회원 탈퇴 */
export const doPatchWithdrawalUserReq = async (): Promise<APIResponse<void>> => {
  const { data } = await axiosWithCredentialInstance.patch('/users/withdrawal');
  return data;
};

/* 가족 떠나기 */
export const doPatchLeaveFamilyReq = async (): Promise<APIResponse<void>> => {
  const { data } = await axiosWithCredentialInstance.patch('/users/family/leave');
  return data;
};
