import { getDayStoryReq, postStoryExpressionReq } from '@/services/story/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IStoryExpressionReq } from '@/types/story';

export const useStory = () => {
  /* 24시간 이내 소식 */
  const useGetDayStory = (isSaved: boolean) => {
    return useQuery({
      queryKey: ['today', 'story'],
      queryFn: () => {
        if (!isSaved) {
          console.log('24시 이내 스토리 조회');
          return getDayStoryReq();
        } else {
          /* 보관된 스토리 조회 api로 변경 예정 */
          console.log('보관된 스토리 조회');
          return getDayStoryReq();
        }
      },
      enabled: isSaved !== undefined,
    });
  };

  const usePostStoryExpression = () => {
    return useMutation({
      mutationKey: ['story', 'expression'],
      mutationFn: async (req: IStoryExpressionReq) => postStoryExpressionReq(req),
    });
  };

  return { useGetDayStory, usePostStoryExpression };
};
