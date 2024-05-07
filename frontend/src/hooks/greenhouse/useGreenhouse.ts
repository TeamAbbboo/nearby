import { getCurrentLevelReq } from '@/services/greenhouse/api';
import userStore from '@/stores/userStore';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGreenhouse = () => {
  const { familyId } = userStore();

  /* 현재 레벨, 경험치 */
  const useGetCurrentLevel = () => {
    return useQuery({
      queryKey: ['currentLevel', familyId],
      queryFn: () => getCurrentLevelReq(),
    });
  };


  return { useGetCurrentLevel };
};
