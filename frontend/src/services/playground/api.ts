import { axiosCommonInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';
import { IFamilyInfoRes } from '@/types/playground';

export const getFamilyInfoList = async (): Promise<APIResponse<IFamilyInfoRes[]>> => {
  const { data } = await axiosCommonInstance.get(`/info`);
  console.log(data);
  return data;
};
