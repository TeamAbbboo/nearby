import { axiosWithCredentialInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';
import { IGetCurrentLevelRes } from '@/types/greenhouse';

/*현재 레벨, 경험치 */
export const getCurrentLevelReq = async (): Promise<APIResponse<IGetCurrentLevelRes>> => {
  const { data } = await axiosWithCredentialInstance.get('/exp/level');
  console.log(data);
  return data;
};

/* 레벨업 */
export const patchLevelUpReq = async (level: number): Promise<APIResponse<void>> => {
  const { data } = await axiosWithCredentialInstance.patch('/exp/level', {
    level: level,
  });
  return data;
};
