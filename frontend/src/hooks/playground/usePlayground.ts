import Toast from '@/components/@common/Toast/Toast';
import { getFamilyInfoList, postPokeNotifications } from '@/services/playground/api';
import { useMutation, useQuery } from '@tanstack/react-query';

export const usePlayground = () => {
  const useGetFamilyInfoList = () => {
    return useQuery({
      queryKey: ['family', 'info'],
      queryFn: () => getFamilyInfoList(),
    });
  };

  const usePokeNotifications = () => {
    return useMutation({
      mutationKey: ['poke', 'notification'],
      mutationFn: (receiverId: number) => postPokeNotifications(receiverId),
      onSuccess: () => {
        Toast.success('상대방을 꾸욱 눌렀습니다');
      },
    });
  };

  return {
    useGetFamilyInfoList,
    usePokeNotifications,
  };
};
