import { getCurrentLevelReq, patchLevelUpReq } from '@/services/greenhouse/api';
import { useMutation, useQuery } from '@tanstack/react-query';

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
  return { useGetCurrentLevel, usePatchLevelUp };
};
