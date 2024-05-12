import { axiosCommonInstance } from '@/apis/axiosInstance';
import { IMessageSendReq, IReceivedMessageListRes, ISentMessageListRes } from '@/types/message';
import { APIResponse } from '@/types/model';

// 받은 메시지 조회 API
export const getReceivedMessageList = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}): Promise<APIResponse<IReceivedMessageListRes>> => {
  const { data } = await axiosCommonInstance.get(`/messages/received`, {
    params: {
      page,
      size,
    },
  });
  console.log(data);
  return data;
};

// 보낸 메시지 조회 API
export const getSentMessageList = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}): Promise<APIResponse<ISentMessageListRes>> => {
  const { data } = await axiosCommonInstance.get(`/messages/sent`, {
    params: {
      page,
      size,
    },
  });
  console.log(data);
  return data;
};

export const postSendMessage = async (req: IMessageSendReq): Promise<APIResponse<string>> => {
  const { data } = await axiosCommonInstance.post(`/messages`, req);
  console.log(data);
  return data;
};
