import { getReceivedMessageList, getSentMessageList } from '@/services/message/api';
import { useQuery } from '@tanstack/react-query';

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

  return {
    useGetReceivedMessageList,
    useGetSentMessageList,
  };
};
