import { postStoryRegister, getDayStoryReq, postStoryExpressionReq, patchKeepStoryReq } from '@/services/story/api';
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

  /* 소식 반응 등록 */
  const usePostStoryExpression = () => {
    return useMutation({
      mutationKey: ['story', 'expression'],
      mutationFn: async (req: IStoryExpressionReq) => postStoryExpressionReq(req),
    });
  };

  /* 소식 보관 */
  const usePatchKeepStory = () => {
    return useMutation({
      mutationKey: ['story', 'keep'],
      mutationFn: (storyId: number) => patchKeepStoryReq(storyId),
    });
  };

  const usePostStoryRegister = () => {
    return useMutation({
      mutationKey: ['story', 'register'],
      mutationFn: (req: FormData) => postStoryRegister(req),
    });
  };

  return { useGetDayStory, usePostStoryExpression, usePostStoryRegister, usePatchKeepStory };
};
