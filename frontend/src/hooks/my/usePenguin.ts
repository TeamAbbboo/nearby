import { patchPenguinDecoration, patchPenguinMood } from '@/services/my/api';
import userStore from '@/stores/userStore';
import { IUserInfoReq } from '@/types/auth';
import { APIResponse, decoType, moodType } from '@/types/model';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePenguin = () => {
  const { patchDecoration, patchMood } = userStore();
  const queryClient = useQueryClient();

  const usePatchPenguinDecoration = () => {
    return useMutation({
      mutationKey: ['penguin', 'decoration'],
      mutationFn: (decoration: decoType) => patchPenguinDecoration(decoration),
      onMutate: async (decoration: decoType) => {
        // 사용자 데이터에 대한 모든 퀴리요청을 취소하여 이전 서버 데이터가 낙관적 업데이트를 덮어쓰지 않도록.
        await queryClient.cancelQueries({ queryKey: ['userInfo'] });

        // 이전 데이터
        const previousUserInfo = queryClient.getQueriesData({ queryKey: ['userInfo'] });

        // 새로운 값으로 낙관적 업데이트
        patchDecoration(decoration);
        queryClient.setQueryData(['userInfo'], (old: APIResponse<IUserInfoReq>) => {
          return {
            ...old,
            data: {
              ...old.data,
              decoration,
            },
          };
        });

        return { previousUserInfo };
      },
      onError: (error, _, context) => {
        // 에러 발생 시 이전데이터로 롤백
        queryClient.setQueryData(['userInfo'], context?.previousUserInfo);
        console.log(error);
      },
      onSettled: () => {
        // 결과에 상관없이 실행
        queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      },
    });
  };

  const usePatchPenguinMood = () => {
    return useMutation({
      mutationKey: ['penguin', 'mood'],
      mutationFn: (mood: moodType) => patchPenguinMood(mood),
      onMutate: async (mood: moodType) => {
        // userInfo에 대한 모든 퀴리요청을 취소
        // 이전 서버 데이터가 낙관적 업데이트를 덮어쓰지 않도록.
        await queryClient.cancelQueries({ queryKey: ['userInfo'] });

        // 이전 데이터의 snapshot
        const previousUserInfo = queryClient.getQueriesData({ queryKey: ['userInfo'] });

        // 새로운 값으로 캐시 업데이트 (낙관적 업데이트)
        patchMood(mood);
        queryClient.setQueryData(['userInfo'], (old: APIResponse<IUserInfoReq>) => {
          return {
            ...old,
            data: {
              ...old.data,
              mood,
            },
          };
        });

        //  snapshot 값이 있는 컨텍스트 객체 반환
        return { previousUserInfo };
      },
      onError: (error, _, context) => {
        // 에러 발생 시 이전데이터로 롤백
        queryClient.setQueryData(['userInfo'], context?.previousUserInfo);
        console.log(error);
      },
      onSettled: () => {
        // 결과에 상관없이 실행
        queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      },
    });
  };

  return {
    usePatchPenguinDecoration,
    usePatchPenguinMood,
  };
};
