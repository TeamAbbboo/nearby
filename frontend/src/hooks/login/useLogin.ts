/* components */
import { doPostKakaoLoginReq } from '@/services/login/api';
import { IPostKakaoLoginReq } from '@/types/auth';

/* libraries */
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  /* 카카오 로그인 */
  const usePostKakaoLogin = () => {
    return useMutation({
      mutationFn: ({ kakaoId }: IPostKakaoLoginReq) => doPostKakaoLoginReq({ kakaoId }),
    });
  };

  return { usePostKakaoLogin };
};
