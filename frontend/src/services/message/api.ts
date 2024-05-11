import { axiosCommonInstance } from '@/apis/axiosInstance';
import { IMessageSendReq, IReceivedMessageItem, IReceivedMessageListRes, ISentMessageListRes } from '@/types/message';
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

// 메시지 전송 API
export const postSendMessage = async (req: IMessageSendReq): Promise<APIResponse<string>> => {
  const { data } = await axiosCommonInstance.post(`/messages`, req);
  console.log(data);
  return data;
};

// 안 읽은 메시지 조회 API
export const getUnreadMessage = async (): Promise<APIResponse<IReceivedMessageItem | null>> => {
  const { data } = await axiosCommonInstance.get(`/messages/unread`);
  console.log(data);
  return data;
};

// 메시지 읽음 처리 API
export const patchUnreadMessage = async (messageId: number): Promise<APIResponse<string>> => {
  const { data } = await axiosCommonInstance.patch(`/messages`, {
    messageId,
  });
  console.log(data);
  return data;
};
