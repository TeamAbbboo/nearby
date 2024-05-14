/* components */
import {
  doPostLoginReq,
  doPatchSignupReq,
  doPatchEnrollFamilyReq,
  doGetUserInfoReq,
  doPatchModifyReq,
  doPostLogoutReq,
  doPatchWithdrawalUserReq,
  doPatchLeaveFamilyReq,
} from '@/services/auth/api';
import { ISignUpReq } from '@/types/auth';
import Toast from '@/components/@common/Toast/Toast';

/* libraries */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const usePostLogin = () => {
    return useMutation({
      mutationKey: ['postLogin'],
      mutationFn: async () => doPostLoginReq(),
    });
  };

  const usePatchSignup = () => {
    return useMutation({
      mutationKey: ['postSignup'],
      mutationFn: async ({ nickname, birthday }: ISignUpReq) => doPatchSignupReq({ nickname, birthday }),
    });
  };

  const useEnrollFamilyCode = () => {
    return useMutation({
      mutationKey: ['patchEnrollFamilyCode'],
      mutationFn: async (familyCode: string) => doPatchEnrollFamilyReq(familyCode),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      },
    });
  };

  const useGetUserInfo = () => {
    return useQuery({
      queryKey: ['userInfo'],
      queryFn: () => doGetUserInfoReq(),
    });
  };

  const useModifyNickname = () => {
    return useMutation({
      mutationKey: ['patchModifyNickname'],
      mutationFn: async (nickname: string) => doPatchModifyReq(nickname),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      },
    });
  };

  const useLogout = () => {
    return useMutation({
      mutationKey: ['postLogout'],
      mutationFn: async () => doPostLogoutReq(),
    });
  };

  const usePatchWithdrawalUser = () => {
    return useMutation({
      mutationKey: ['deleteUser'],
      mutationFn: async () => doPatchWithdrawalUserReq(),
      onSuccess: () => {
        localStorage.removeItem('user-store');
        localStorage.removeItem('ACCESS_TOKEN');
        window.location.replace('/login');
        Toast.success('회원 탈퇴 성공');
      },
      onError: () => {
        Toast.error('회원 탈퇴 실패');
      },
    });
  };

  const useLeaveFamily = () => {
    return useMutation({
      mutationKey: ['patchLeaveFamily'],
      mutationFn: async () => doPatchLeaveFamilyReq(),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['familyCode'] });
      },
    });
  };

  return {
    usePostLogin,
    usePatchSignup,
    useEnrollFamilyCode,
    useGetUserInfo,
    useModifyNickname,
    useLogout,
    usePatchWithdrawalUser,
    useLeaveFamily,
  };
};
