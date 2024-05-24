import { axiosCommonInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';
import { IFamilyInfoRes } from '@/types/playground';

// 가족 조회 API
export const getFamilyInfoList = async (): Promise<APIResponse<IFamilyInfoRes[]>> => {
  const { data } = await axiosCommonInstance.get(`/families/info`);
  return data;
};

// 꾸욱 누르기 API
export const postPokeNotifications = async (receiverId: number): Promise<APIResponse<string>> => {
  const { data } = await axiosCommonInstance.post(`/notifications/poke`, {
    receiverId: receiverId,
  });
  return data;
};
