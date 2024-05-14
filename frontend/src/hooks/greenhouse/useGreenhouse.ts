import { getCurrentLevelReq, getExpHistoryList, patchLevelUpReq, getMonthlyStoryReq } from '@/services/greenhouse/api';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { IMonthlyStoryReq } from '@/types/greenhouse';

export const useGreenhouse = () => {
  /* 현재 레벨, 경험치 */
  const useGetCurrentLevel = () => {
    return useQuery({
      queryKey: ['currentLevel'],
      queryFn: () => getCurrentLevelReq(),
    });
  };

  /* 레벨업 */
  const usePatchLevelUp = () => {
    const { refetch: refetchCurrentLevel } = useGetCurrentLevel();

    return useMutation({
      mutationFn: (level: number) => patchLevelUpReq(level),
      mutationKey: ['levelUP'],
      onSuccess: async () => {
        //레벨업 성공 후 현재 레벨 데이터 다시 가져오기
        await refetchCurrentLevel();
        console.log('레벨업에 성공하였습니다.');
      },
    });
  };

  /* 경험치 내역 조회 */
  const useGetExpHistoryList = (size: number) => {
    return useInfiniteQuery({
      queryKey: ['exp', 'list', size],
      queryFn: ({ pageParam }) => {
        return getExpHistoryList({ page: pageParam - 1, size });
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        // 마지막 페이지면
        if (lastPage.data.histories.last) return;

        return nextPage;
      },
    });
  };

  /* 월별 소식 조회 */
  const useGetMonthlyStoryList = (props: IMonthlyStoryReq) => {
    // console.log('useGetMonthlyStoryList props:', props);
    return useQuery({
      queryKey: ['stories', props],
      queryFn: () => getMonthlyStoryReq(props),
      select: data => data.data,
    });
  };

  return { useGetCurrentLevel, usePatchLevelUp, useGetExpHistoryList, useGetMonthlyStoryList };
};
