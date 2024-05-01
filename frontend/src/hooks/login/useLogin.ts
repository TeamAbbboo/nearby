/* components */
import userStore from '@/stores/userStore';
import { doPostLoginReq } from '@/services/login/api';

/* libraries */
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
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

        // nickname이 존재하면, 바로 광장
        if (nickname) {
          loginUser({
            userId,
            familyId,
            nickname,
            birthday,
            mood,
          });

          navigate('/');
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
      onError: () => {
        console.log('카카오톡 서버가 불안정합니다.');
        navigate('/login');
      },
    });
  };

  return { usePostLogin };
};
