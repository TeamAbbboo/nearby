import { getReceivedMessageList, getSentMessageList, postSendMessage } from '@/services/message/api';
import { IMessageSendReq } from '@/types/message';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';

export const useMessage = () => {
  const useGetReceivedMessageList = ({ page, size }: { page: number; size: number }) => {
    return useInfiniteQuery({
      queryKey: ['message', 'list', 'received', page, size],
      queryFn: () => {
        return getReceivedMessageList({ page, size });
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        // 마지막 페이지면
        if (lastPage.data.last) return;

        return nextPage;
      },
    });
  };

  const useGetSentMessageList = ({ page, size }: { page: number; size: number }) => {
    return useInfiniteQuery({
      queryKey: ['message', 'list', 'sent', page, size],
      queryFn: () => {
        return getSentMessageList({ page, size });
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        // 마지막 페이지면
        if (lastPage.data.last) return;

        return nextPage;
      },
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
