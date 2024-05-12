import {
  getReceivedMessageList,
  getSentMessageList,
  getUnreadMessage,
  patchUnreadMessage,
  postSendMessage,
} from '@/services/message/api';
import { IMessageSendReq } from '@/types/message';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useMessage = () => {
  const queryClient = useQueryClient();

  const useGetReceivedMessageList = (size: number) => {
    return useInfiniteQuery({
      queryKey: ['message', 'list', 'received', size],
      queryFn: ({ pageParam }) => {
        return getReceivedMessageList({ page: pageParam - 1, size });
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

  const useGetSentMessageList = (size: number) => {
    return useInfiniteQuery({
      queryKey: ['message', 'list', 'sent', size],
      queryFn: ({ pageParam }) => {
        return getSentMessageList({ page: pageParam - 1, size });
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

  const useGetUnreadMessage = () => {
    return useQuery({
      queryKey: ['message', 'unread'],
      queryFn: () => getUnreadMessage(),
    });
  };

  const usePatchUnreadMessage = () => {
    return useMutation({
      mutationKey: ['message', 'unread', 'read'],
      mutationFn: (messageId: number) => patchUnreadMessage(messageId),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['message', 'unread'] }),
    });
  };

  return {
    useGetReceivedMessageList,
    useGetSentMessageList,
    usePostSendMessage,
    useGetUnreadMessage,
    usePatchUnreadMessage,
  };
};
