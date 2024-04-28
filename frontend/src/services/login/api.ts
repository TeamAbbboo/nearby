import { axiosCommonInstance } from '@/apis/axiosInstance';
import { APIResponse } from '@/types/model';
import { ILoginRes } from '@/types/auth';

/* 카카오 로그인 */
export const doKakaoLoginReq = async (kakaoCode: string): Promise<APIResponse<ILoginRes>> => {
  try {
    const { data } = await axiosCommonInstance.post('/users/login', {
      kakaoId: kakaoCode,
    });

    return data;
  } catch (error) {
    console.log('KakaoLoginRedirectPage : ' + error);
    throw error;
  }
};
