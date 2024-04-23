import userStore from '@/stores/userStore';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoLoginRedircet = () => {
  /* 인가 코드 쿼리 스트링 조회 */
  const queryParams = new URLSearchParams(location.search);
  const kakaocode = queryParams.get('code');

  /* 이동할 navigate 객체 생성 */
  const navigate = useNavigate();

  /* 사용자 객체 생성 */
  const { loginUser } = userStore();

  /* kakaocode로 서버에 POST */
  useEffect(() => {
    // 카카오 코드 존재하면
    if (kakaocode) {
      // 회원가입이면 familyId가 존재 X
      // 단순 로그인이라면 familyId가 존재 O
      axios
        .post(`${import.meta.env.VITE_BASE_URL}auth/login/kakao`, { authorizationCode: kakaocode })
        .then(res => {
          const { id, nickname, accessToken, refreshToken } = res.data.data;
          const userId = Number(id);

          if (nickname) {
            loginUser({
              nickname,
              accessToken,
              refreshToken,
            });

            navigate('/');
          } else {
            loginUser({ accessToken: accessToken, area: [], nickname: '', refreshToken: refreshToken, userId: userId });
            navigate('/signup');
          }
        })
        .catch(error => {
          console.log('로그인 에러', error);

          // 임시로 회원가입 로직
          setTimeout(() => {
            navigate('/register');
          }, 1500);
        });
    }
    // 카카오 코드 존재하지 않으면
    else {
      // 따로 처리할 필요??
    }
  });

  return (
    // 카카오 로딩중
    <div className="w-full h-screen flex flex-col justify-center items-center relative">
      <div role="status">
        <svg
          aria-hidden="true"
          className="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default KakaoLoginRedircet;
