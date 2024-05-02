import { axiosCommonInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';
import { IPostCreateFamilyCodeReq } from '@/types/family';

/* 가족코드 생성 */
export const doPostCreateFamilyCodeReq = async (): Promise<APIResponse<IPostCreateFamilyCodeReq>> => {
  const { data } = await axiosCommonInstance.post('/families/create');
  return data;
};
