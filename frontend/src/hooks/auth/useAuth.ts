/* components */
import userStore from '@/stores/userStore';
import { doPostLoginReq, doPostSignupReq, doPatchEnrollFamilyReq } from '@/services/auth/api';
import { IPostSignupReq, IPatchEnrollFamilyReq } from '@/types/auth';

/* libraries */
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const { loginUser } = userStore();
  const navigate = useNavigate();

  const usePostLogin = () => {
    return useMutation({
      mutationFn: async () => doPostLoginReq(),
      onSuccess: res => {
        console.log('로그인이 완료되었습니다.');

        const {
          data: { userId, familyId, nickname, birthday, mood },
        } = res;

        userStore.setState({
          userId: userId,
          familyId: familyId,
          nickname: nickname,
          birthday: birthday,
          mood: mood,
        });

        // nickname이 존재하면, 바로 광장
        if (nickname) {
          loginUser({
            userId,
            familyId,
            nickname,
            birthday,
            mood,
          });

          window.location.replace(`${import.meta.env.BASE_URL}`);
        }
        // nickname이 없다면, 회원가입
        else {
          loginUser({
            userId: userId,
            familyId: 0,
            nickname: '',
            birthday: '',
            mood: '',
          });

          navigate('/register');
        }
      },
      onError: error => {
        console.log(error);
        console.log('카카오톡 서버가 불안정합니다.');
        navigate('/login');
      },
    });
  };

  const usePostSignup = () => {
    return useMutation({
      mutationFn: async ({ nickname, birthday }: IPostSignupReq) => doPostSignupReq({ nickname, birthday }),
    });
  };

  const useEnrollFamilyCode = () => {
    return useMutation({
      mutationFn: async ({ userId, familyCode }: IPatchEnrollFamilyReq) =>
        doPatchEnrollFamilyReq({ userId, familyCode }),
    });
  };

  return { usePostLogin, usePostSignup, useEnrollFamilyCode };
};
