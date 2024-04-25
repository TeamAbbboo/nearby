import { getReceivedMessageList } from '@/services/message/api';
import { useQuery } from '@tanstack/react-query';

export const useMessage = () => {
  const useGetReceivedMessageList = () => {
    return useQuery({
      queryKey: ['interview', 'questionList'],
      queryFn: () => getReceivedMessageList(),
    });
  };

  return {
    useGetReceivedMessageList,
  };
};
