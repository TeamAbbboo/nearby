import { axiosWithCredentialInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';
import { IGetFamilyCodeRes, IPostCreateFamilyCodeReq } from '@/types/family';

/* 가족코드 조회 */
export const doGetFamilyCodeReq = async (): Promise<APIResponse<IGetFamilyCodeRes>> => {
  const { data } = await axiosWithCredentialInstance.get('/families');
  return data;
};

/* 가족코드 생성 */
export const doPostCreateFamilyCodeReq = async (): Promise<APIResponse<IPostCreateFamilyCodeReq>> => {
  const { data } = await axiosWithCredentialInstance.post('/families');
  return data;
};
