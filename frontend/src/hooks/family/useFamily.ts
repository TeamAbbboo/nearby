/* components */
import { doGetFamilyCodeReq, doPostCreateFamilyCodeReq } from '@/services/family/api';

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
      mutationKey: 'postCreateFamilyCode',
      mutationFn: async () => doPostCreateFamilyCodeReq(),
    });
  };

  return { useGetFamilyCode, useCreateFamilyCode };
};
