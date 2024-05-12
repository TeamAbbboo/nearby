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
import { IUserInfoReq } from '@/types/auth';

/* libraries */
import { useMutation, useQuery } from '@tanstack/react-query';

export const useAuth = () => {
  const usePostLogin = () => {
    return useMutation({
      mutationKey: ['postLogin'],
      mutationFn: async () => doPostLoginReq(),
    });
  };

  const usePatchSignup = () => {
    return useMutation({
      mutationKey: ['postSignup'],
      mutationFn: async ({ nickname, birthday }: IUserInfoReq) => doPatchSignupReq({ nickname, birthday }),
    });
  };

  const useEnrollFamilyCode = () => {
    return useMutation({
      mutationKey: ['patchEnrollFamilyCode'],
      mutationFn: async (familyCode: string) => doPatchEnrollFamilyReq(familyCode),
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
        localStorage.setItem('user-store', '');
        window.location.replace('/login');
        alert('회원 탈퇴에 성공했습니다.');
      },
      onError: () => {
        alert('회원 탈퇴 실패했습니다.');
      },
    });
  };

  const useLeaveFamily = () => {
    return useMutation({
      mutationKey: ['patchLeaveFamily'],
      mutationFn: async () => doPatchLeaveFamilyReq(),
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
