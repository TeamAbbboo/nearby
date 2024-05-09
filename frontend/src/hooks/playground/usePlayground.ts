import { getFamilyInfoList } from '@/services/playground/api';
import { useQuery } from '@tanstack/react-query';

export const usePlayground = () => {
  const useGetFamilyInfoList = () => {
    return useQuery({
      queryKey: ['family', 'info'],
      queryFn: () => getFamilyInfoList(),
    });
  };

  return {
    useGetFamilyInfoList,
  };
};
