import { axiosCommonInstance } from '@/apis/axiosInstance';
import { IReceivedMessageListRes } from '@/types/message';
import { APIResponse } from '@/types/model';

export const getReceivedMessageList = async (): Promise<APIResponse<IReceivedMessageListRes>> => {
  const { data } = await axiosCommonInstance.get(`/messages/received`);
  return data;
};
