import { getReceivedMessageList, getSentMessageList, postSendMessage } from '@/services/message/api';
import { IMessageSendReq } from '@/types/message';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useMessage = () => {
  const useGetReceivedMessageList = () => {
    return useQuery({
      queryKey: ['message', 'list', 'received'],
      queryFn: () => getReceivedMessageList(),
    });
  };

  const useGetSentMessageList = () => {
    return useQuery({
      queryKey: ['message', 'list', 'sent'],
      queryFn: () => getSentMessageList(),
    });
  };

  const usePostSendMessage = () => {
    return useMutation({
      mutationKey: ['message', 'send'],
      mutationFn: (req: IMessageSendReq) => postSendMessage(req),
    });
  };

  return {
    useGetReceivedMessageList,
    useGetSentMessageList,
    usePostSendMessage,
  };
};
