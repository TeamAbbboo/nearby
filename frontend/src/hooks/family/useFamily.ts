/* components */
import { doGetFamilyCodeReq, doPostCreateFamilyCodeReq } from '@/services/family/api';
import userStore from '@/stores/userStore';

/* libraries */
import { useQuery, useMutation } from '@tanstack/react-query';

export const useFamily = () => {
  const useGetFamilyCode = () => {
    return useQuery({
      queryKey: ['familyCode'],
      queryFn: () => doGetFamilyCodeReq(),
    });
  };

  const useCreateFamilyCode = () => {
    return useMutation({
      mutationFn: async () => doPostCreateFamilyCodeReq(),
      onSuccess: async ({ data }) => {
        console.log('가족코드 생성이 성공하였습니다.');
        userStore.setState({
          familyId: data.familyId,
        });
        localStorage.setItem('FAMILY_CODE', data.familyCode);
      },
      onError: () => {
        console.log('가족코드 생성이 실패했습니다.');
      },
    });
  };

  return { useGetFamilyCode, useCreateFamilyCode };
};