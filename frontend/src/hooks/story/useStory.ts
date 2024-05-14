import {
  postStoryRegister,
  getDayStoryReq,
  postStoryExpressionReq,
  patchKeepStoryReq,
  getStoryExpression,
  getSavedStoryReq,
} from '@/services/story/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IStoryExpressionReq } from '@/types/story';

export const useStory = () => {
  /* 24시간 이내 소식 */
  const useGetDayStory = ({
    year,
    month,
    day,
    isSaved,
  }: {
    year?: number;
    month?: number;
    day?: number;
    isSaved: boolean;
  }) => {
    return useQuery({
      queryKey: ['today', 'story', isSaved],
      queryFn: () => {
        if (!isSaved) {
          /* 24시 이내 스토리 조회 */
          return getDayStoryReq();
        } else {
          /* 보관된 스토리 조회 */
          if (year && month && day) {
            month += 1;
            return getSavedStoryReq({ year, month, day });
          }
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

  /* 소식 반응 조회 */
  const useGetStoryExpression = (storyId: number) => {
    return useQuery({
      queryKey: ['story', 'expression', storyId],
      queryFn: () => getStoryExpression(storyId),
      enabled: true,
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

  return { useGetDayStory, usePostStoryExpression, usePostStoryRegister, usePatchKeepStory, useGetStoryExpression };
};
