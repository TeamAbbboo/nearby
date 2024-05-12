import { axiosWithCredentialInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';
import { IGetCurrentLevelRes, IExpHistoryListRes } from '@/types/greenhouse';

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

/* 경험치 내역 조회 */
export const getExpHistoryList = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}): Promise<APIResponse<IExpHistoryListRes>> => {
  const { data } = await axiosWithCredentialInstance.get('/exp', {
    params: {
      page,
      size,
    },
  });
  console.log('경험치 내역:', data);
  return data;
};
