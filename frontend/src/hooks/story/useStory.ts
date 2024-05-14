import {
  postStoryRegister,
  getDayStoryReq,
  postStoryExpressionReq,
  patchKeepStoryReq,
  getStoryExpression,
} from '@/services/story/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IStoryExpressionReq } from '@/types/story';
import Toast from '@/components/@common/Toast/Toast';

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
      onSuccess: () => {
        Toast.success('소식이 성공적으로 등록되었습니다');
      },
      onError: () => {
        Toast.error('소식 등록에 실패했습니다 다시 확인해주세요');
      },
    });
  };

  return { useGetDayStory, usePostStoryExpression, usePostStoryRegister, usePatchKeepStory, useGetStoryExpression };
};
