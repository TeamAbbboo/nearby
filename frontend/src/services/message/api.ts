import { axiosCommonInstance } from '@/apis/axiosInstance';
import { IMessageSendReq, IReceivedMessageListRes } from '@/types/message';
import { APIResponse } from '@/types/model';

export const getReceivedMessageList = async (): Promise<APIResponse<IReceivedMessageListRes>> => {
  const { data } = await axiosCommonInstance.get(`/messages/received`);
  console.log(data);
  return data;
};

export const getSentMessageList = async (): Promise<APIResponse<IReceivedMessageListRes>> => {
  const { data } = await axiosCommonInstance.get(`/messages/sent`);
  console.log(data);
  return data;
};

export const postSendMessage = async (req: IMessageSendReq): Promise<APIResponse<string>> => {
  const { data } = await axiosCommonInstance.post(`/messages`, req);
  console.log(data);
  return data;
};
