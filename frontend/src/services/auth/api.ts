import { axiosCommonInstance, axiosWithCredentialInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';
import {
  IPostLoginRes,
  IPostSignupReq,
  IPatchEnrollFamilyReq,
  IGetUserInfoRes,
  IPatchModifyNicknameReq,
} from '@/types/auth';

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
export const doPatchEnrollFamilyReq = async ({
  userId,
  familyCode,
}: IPatchEnrollFamilyReq): Promise<APIResponse<void>> => {
  const { data } = await axiosCommonInstance.patch('/users/family/enroll', {
    userId: userId,
    familyCode: familyCode,
  });
  return data;
};

/* 유저 정보 조회 */
export const doGetUserInfoReq = async (): Promise<APIResponse<IGetUserInfoRes>> => {
  const { data } = await axiosCommonInstance.get('/users');
  return data;
};

/* 유저 정보 수정 */
export const doPatchModifyReq = async ({ nickname }: IPatchModifyNicknameReq): Promise<APIResponse<void>> => {
  const { data } = await axiosCommonInstance.patch('/users', {
    nickname: nickname,
  });
  return data;
};

/* 로그아웃 */
export const doPatchLogoutReq = async (): Promise<APIResponse<void>> => {
  const { data } = await axiosWithCredentialInstance.patch('/users/logout');
  return data;
};

/* 회원 탈퇴 */
export const doDeleteUserReq = async (): Promise<APIResponse<void>> => {
  const { data } = await axiosCommonInstance.delete('/users');
  return data;
};

/* 가족 떠나기 */
export const doPatchLeaveFamilyReq = async (): Promise<APIResponse<void>> => {
  const { data } = await axiosCommonInstance.patch('/users/family/leave');
  return data;
};
