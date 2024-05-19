/* components */
import { getReceivedNotiList, getUnreadNoti } from '@/services/notification/api';

/* libraries */
import { useQuery, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

export const useNotification = () => {
  const queryClient = useQueryClient();

  const useGetNotiList = (size: number) => {
    return useInfiniteQuery({
      queryKey: ['notification', 'list', 'received', size],
      queryFn: ({ pageParam }) => {
        return getReceivedNotiList({ page: pageParam - 1, size });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notification', 'unread'] });
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

  const useGetUnreadNoti = () => {
    return useQuery({
      queryKey: ['notification', 'unread'],
      queryFn: () => getUnreadNoti(),
    });
  };

  return {
    useGetNotiList,
    useGetUnreadNoti,
  };
};
