/* components */
import {
  doPostLoginReq,
  doPostSignupReq,
  doPatchEnrollFamilyReq,
  doGetUserInfoReq,
  doPatchModifyReq,
  doPatchLogoutReq,
  doDeleteUserReq,
  doPatchLeaveFamilyReq,
} from '@/services/auth/api';
import { IUserInfoReq } from '@/types/auth';

/* libraries */
import { useMutation, useQuery } from '@tanstack/react-query';

export const useAuth = () => {
  const usePostLogin = () => {
    return useMutation({
      mutationFn: async () => doPostLoginReq(),
    });
  };

  const usePostSignup = () => {
    return useMutation({
      mutationFn: async ({ nickname, birthday }: IUserInfoReq) => doPostSignupReq({ nickname, birthday }),
    });
  };

  const useEnrollFamilyCode = () => {
    return useMutation({
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
      mutationFn: async (nickname: string) => doPatchModifyReq(nickname),
    });
  };

  const useLogout = () => {
    return useMutation({
      mutationFn: async () => doPatchLogoutReq(),
    });
  };

  const useDeleteUser = () => {
    return useMutation({
      mutationFn: async () => doDeleteUserReq(),
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
      mutationFn: async () => doPatchLeaveFamilyReq(),
    });
  };

  return {
    usePostLogin,
    usePostSignup,
    useEnrollFamilyCode,
    useGetUserInfo,
    useModifyNickname,
    useLogout,
    useDeleteUser,
    useLeaveFamily,
  };
};
